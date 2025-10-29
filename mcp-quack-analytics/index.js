#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env.local' });

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

// Create MCP server
const server = new Server(
  {
    name: 'quack-analytics',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_waitlist_stats',
        description: 'Get waitlist signup statistics from PostHog',
        inputSchema: {
          type: 'object',
          properties: {
            period: {
              type: 'string',
              description: 'Time period: today, week, month, all',
              enum: ['today', 'week', 'month', 'all'],
            },
          },
          required: ['period'],
        },
      },
      {
        name: 'get_conversion_funnel',
        description: 'Get conversion funnel data (visit -> signup -> discord)',
        inputSchema: {
          type: 'object',
          properties: {
            period: {
              type: 'string',
              description: 'Time period in days',
            },
          },
        },
      },
      {
        name: 'get_traffic_sources',
        description: 'Get traffic sources and referrers from PostHog',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'send_newsletter',
        description: 'Send newsletter campaign via Brevo',
        inputSchema: {
          type: 'object',
          properties: {
            subject: {
              type: 'string',
              description: 'Email subject line',
            },
            content: {
              type: 'string',
              description: 'HTML content of the email',
            },
            testEmail: {
              type: 'string',
              description: 'Send test to this email instead of all subscribers',
            },
          },
          required: ['subject', 'content'],
        },
      },
      {
        name: 'get_subscriber_count',
        description: 'Get total number of waitlist subscribers from Brevo',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_waitlist_stats': {
        const { period } = args;

        // Calculate date range
        const now = new Date();
        let startDate;

        switch (period) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          default:
            startDate = new Date('2025-01-01');
        }

        // Query PostHog API
        const response = await fetch(
          `https://app.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/insights/trend/`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${POSTHOG_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              events: [{ id: 'waitlist_signup', type: 'events' }],
              date_from: startDate.toISOString(),
              date_to: new Date().toISOString(),
            }),
          }
        );

        const data = await response.json();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'get_conversion_funnel': {
        const { period = '30' } = args;

        const response = await fetch(
          `https://app.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/insights/funnel/`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${POSTHOG_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              events: [
                { id: '$pageview', type: 'events', name: 'Page View' },
                { id: 'waitlist_signup', type: 'events', name: 'Waitlist Signup' },
                { id: '$autocapture', type: 'events', name: 'Discord Click',
                  properties: [{ key: '$event_type', value: 'click' }] },
              ],
              funnel_window_days: parseInt(period),
            }),
          }
        );

        const data = await response.json();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'get_traffic_sources': {
        const response = await fetch(
          `https://app.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/insights/trend/`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${POSTHOG_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              events: [{ id: '$pageview', type: 'events' }],
              breakdown: '$referring_domain',
              date_from: '-30d',
            }),
          }
        );

        const data = await response.json();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'send_newsletter': {
        const { subject, content, testEmail } = args;

        const emailData = {
          name: `Quack Newsletter - ${new Date().toISOString()}`,
          subject,
          htmlContent: content,
          sender: {
            name: 'Quack Team',
            email: 'hello@quack.build',
          },
        };

        if (testEmail) {
          // Send test email
          emailData.emailTo = [testEmail];
        } else {
          // Send to list
          emailData.recipients = {
            listIds: [parseInt(BREVO_LIST_ID)],
          };
        }

        const response = await fetch(
          'https://api.brevo.com/v3/smtp/email',
          {
            method: 'POST',
            headers: {
              'api-key': BREVO_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          }
        );

        const result = await response.json();

        return {
          content: [
            {
              type: 'text',
              text: `Newsletter ${testEmail ? 'test ' : ''}sent successfully!\n${JSON.stringify(result, null, 2)}`,
            },
          ],
        };
      }

      case 'get_subscriber_count': {
        const response = await fetch(
          `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}`,
          {
            headers: {
              'api-key': BREVO_API_KEY,
            },
          }
        );

        const data = await response.json();

        return {
          content: [
            {
              type: 'text',
              text: `Total Subscribers: ${data.totalSubscribers}\nTotal Blacklisted: ${data.totalBlacklisted}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Quack Analytics MCP server running on stdio');
}

main().catch(console.error);
