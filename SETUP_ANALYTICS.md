# 🦆 Quack Analytics & Newsletter Setup Guide

Complete setup guide for PostHog analytics, Brevo newsletter, and AI automation with Claude Code.

## 🎯 Stack Overview

- **PostHog**: Analytics, tracking, conversion funnels, session recordings
- **Brevo**: Email marketing, waitlist management, automation
- **MCP Server**: AI-powered analytics and newsletter automation via Claude Code

---

## 📊 Step 1: PostHog Setup (5 minutes)

### 1.1 Create PostHog Account

1. Go to [https://posthog.com](https://posthog.com)
2. Click "Sign up for free"
3. Create account (email + password)

### 1.2 Create Project

1. After signup, create a new project called "Quack Website"
2. Select "Web" as platform
3. Copy your **Project API Key** (starts with `phc_`)

### 1.3 Get Personal API Key

1. Go to Settings → Personal API Keys
2. Click "Create personal API key"
3. Name it "MCP Server"
4. Copy the key (starts with `phx_`)

### 1.4 Get Project ID

1. Go to Project Settings
2. Copy your **Project ID** (usually a number like `12345`)

### 1.5 Add to .env.local

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_PROJECT_API_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# For MCP Server
POSTHOG_API_KEY=phx_YOUR_PERSONAL_API_KEY_HERE
POSTHOG_PROJECT_ID=YOUR_PROJECT_ID_HERE
```

---

## 📧 Step 2: Brevo Setup (5 minutes)

### 2.1 Create Brevo Account

1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Click "Sign up free"
3. Complete registration

### 2.2 Create Contact List

1. Go to Contacts → Lists
2. Click "Create a list"
3. Name it "Quack Waitlist"
4. Note the List ID (usually `2` for first list)

### 2.3 Get API Key

1. Go to Settings → API Keys
2. Click "Generate a new API key"
3. Name it "Quack Website"
4. Copy the key (starts with `xkeysib-`)

### 2.4 Create Email Template (Optional)

1. Go to Campaigns → Email templates
2. Create a welcome email template
3. Use variables: `{{ contact.EMAIL }}`, `{{ contact.SOURCE }}`

### 2.5 Add to .env.local

```env
# Brevo Email Marketing
BREVO_API_KEY=xkeysib_YOUR_API_KEY_HERE
BREVO_LIST_ID=2
```

---

## 🔧 Step 3: Deploy to Vercel

### 3.1 Add Environment Variables to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following variables:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
BREVO_API_KEY=xkeysib_...
BREVO_LIST_ID=2
```

### 3.2 Redeploy

```bash
git add .
git commit -m "Add analytics and newsletter integration"
git push
```

Vercel will automatically redeploy with the new environment variables.

---

## 🤖 Step 4: MCP Server Setup (Claude Code Integration)

### 4.1 Install MCP Dependencies

```bash
cd mcp-quack-analytics
npm install
```

### 4.2 Add to Claude Desktop Config

Edit your `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "quack-analytics": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/Desktop/Dev/Personal/quackagency-website/mcp-quack-analytics/index.js"]
    }
  }
}
```

### 4.3 Restart Claude Desktop

Quit and reopen Claude Desktop to load the MCP server.

### 4.4 Test MCP Server

In Claude Code, ask:

```
"How many people are on the waitlist?"
```

Claude should use the `get_subscriber_count` tool.

---

## 📈 Step 5: Setup PostHog Dashboard

### 5.1 Create Insights

1. Go to PostHog → Insights → New Insight
2. Create these insights:

**Total Signups**
- Event: `waitlist_signup`
- Type: Total count
- Save as "Total Waitlist Signups"

**Signups Over Time**
- Event: `waitlist_signup`
- Type: Trend
- Interval: Day
- Save as "Daily Signups"

**Conversion Funnel**
- Step 1: `$pageview` (Page View)
- Step 2: `waitlist_signup` (Waitlist Signup)
- Step 3: Click event on Discord button
- Save as "Visit → Signup → Discord Funnel"

**Traffic Sources**
- Event: `$pageview`
- Breakdown: `$referring_domain`
- Save as "Traffic Sources"

### 5.2 Create Dashboard

1. Go to Dashboards → New Dashboard
2. Name it "Quack Website Analytics"
3. Add all the insights you created

---

## 🎬 Step 6: Usage Examples

### Claude Code Commands

Once MCP is setup, you can ask Claude:

**Analytics Queries:**
```
"How many people signed up this week?"
"What's our conversion rate from visit to signup?"
"Where is most of our traffic coming from?"
"Show me signup trends for the past month"
```

**Newsletter Actions:**
```
"Generate a welcome email for new subscribers"
"Send a test newsletter to my@email.com"
"Create a launch announcement newsletter"
```

**Automated Reports:**
```
"Create a weekly analytics report"
"Compare this week's signups to last week"
"Analyze which traffic sources convert best"
```

---

## 📊 PostHog Features You Get

### ✅ Auto-Tracked

- Page views
- Button clicks
- Form submissions
- Navigation
- User sessions

### ✅ Custom Events We Track

- `waitlist_signup` - When user joins waitlist
- `waitlist_signup_failed` - When signup fails
- User identification with email

### ✅ Available Features

- **Session Recordings**: Watch real user sessions
- **Heatmaps**: See where users click
- **Funnels**: Track conversion paths
- **Cohorts**: Segment users
- **Feature Flags**: A/B testing
- **Surveys**: Get feedback

---

## 📧 Brevo Features You Get

### ✅ Email Marketing

- 9,000 emails/month (free)
- 100,000 contacts
- Email templates
- Automation workflows

### ✅ Automation Examples

**Welcome Email:**
1. Trigger: Contact added to list
2. Action: Send welcome email
3. Delay: Immediate

**Engagement Series:**
1. Day 0: Welcome + Discord invite
2. Day 3: Product highlights
3. Day 7: Early access announcement

### ✅ Transactional Emails

Use for:
- Signup confirmations
- Download links
- Beta access codes

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Rotate API keys** if exposed
3. **Use Vercel env vars** for production
4. **Keep MCP server** on local machine only

---

## 🐛 Troubleshooting

### PostHog not tracking

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_POSTHOG_KEY` is correct
3. Check PostHog dashboard → Live events
4. Disable ad blockers

### Brevo API errors

1. Verify API key is active
2. Check list ID is correct
3. Ensure contact email is valid
4. Check Brevo dashboard → Logs

### MCP Server not working

1. Verify all env vars in `.env.local`
2. Check MCP server logs
3. Restart Claude Desktop
4. Test with: `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node index.js`

---

## 📚 Next Steps

### Immediate

1. ✅ Test waitlist form on localhost
2. ✅ Send test email via Brevo
3. ✅ Verify PostHog tracking
4. ✅ Deploy to Vercel

### Week 1

1. Setup email automations in Brevo
2. Create PostHog dashboard
3. Test MCP server commands
4. Send first newsletter

### Ongoing

1. Monitor conversion rates
2. A/B test CTAs
3. Analyze traffic sources
4. Segment power users

---

## 💡 Pro Tips

1. **Session Recordings**: Enable in PostHog to watch users navigate your site
2. **Cohorts**: Create segments like "Signed up from HN" or "Discord members"
3. **Feature Flags**: A/B test different waitlist CTAs
4. **Automation**: Use MCP to auto-generate weekly reports
5. **Webhooks**: Connect PostHog → Discord for real-time notifications

---

## 🦆 You're All Set!

Your analytics and newsletter stack is ready. Go forth and quack! 🎉

Questions? Ask Claude via MCP:
```
"Explain how the PostHog integration works"
"Show me example newsletter content"
"What analytics should I monitor daily?"
```
