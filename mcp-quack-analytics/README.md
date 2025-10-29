# Quack Analytics MCP Server

MCP server for Quack waitlist analytics and newsletter automation.

## Features

- 📊 Get waitlist signup statistics from PostHog
- 🔄 Query conversion funnels
- 📈 Analyze traffic sources
- 📧 Send newsletters via Brevo
- 👥 Get subscriber counts

## Installation

```bash
cd mcp-quack-analytics
npm install
```

## Configuration

Add to your `.env.local`:

```env
# PostHog
POSTHOG_API_KEY=your_personal_api_key
POSTHOG_PROJECT_ID=your_project_id

# Brevo
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=2
```

## Adding to Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "quack-analytics": {
      "command": "node",
      "args": ["/path/to/quackagency-website/mcp-quack-analytics/index.js"]
    }
  }
}
```

## Available Tools

### get_waitlist_stats
Get waitlist signup statistics.
```
Args: { period: 'today' | 'week' | 'month' | 'all' }
```

### get_conversion_funnel
Get conversion funnel data.
```
Args: { period: '7' | '30' | '90' }
```

### get_traffic_sources
Get traffic sources and referrers.

### send_newsletter
Send newsletter campaign.
```
Args: {
  subject: string,
  content: string (HTML),
  testEmail?: string (optional, for testing)
}
```

### get_subscriber_count
Get total number of subscribers.

## Usage Examples

In Claude Code, you can ask:

```
"How many people signed up for the waitlist this week?"
→ Uses get_waitlist_stats with period='week'

"What's our conversion rate from visit to signup?"
→ Uses get_conversion_funnel

"Generate and send a welcome newsletter to new subscribers"
→ Generates content + uses send_newsletter

"Where is our traffic coming from?"
→ Uses get_traffic_sources
```

## Development

```bash
npm start
```

## Testing

Test the MCP server directly:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node index.js
```
