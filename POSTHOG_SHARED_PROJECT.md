# 🦆 PostHog Shared Project Setup

You're using the **SAME PostHog project** for both alekdob.com and quack.build.

---

## 🎯 **Why This is Smart**

### **Benefits:**
- ✅ **Shared 1M events/month free tier** (both sites combined)
- ✅ **No additional cost** until you exceed 1M events total
- ✅ **Unified dashboard** - see all your projects in one place
- ✅ **Easy filtering** - PostHog auto-tracks `$host` property
- ✅ **Cross-site analytics** - see users who visit both sites

### **Cost Comparison:**

**Option 1: Shared Project (Current Setup)**
- alekdob.com: 50k events/month
- quack.build: 30k events/month
- **Total: 80k events/month** → **$0/month** ✅

**Option 2: Separate Projects**
- alekdob.com: 50k events/month → $0
- quack.build: 30k events/month → $0
- **Risk:** If ONE site spikes, you hit 1M faster
- **Harder to manage:** 2 dashboards, 2 configurations

---

## 📊 **How to Filter Data**

### **In PostHog Dashboard:**

#### **View Only Quack Data:**
1. Go to Insights → New Insight
2. Add filter: `$host = quack.build`
3. OR filter: `site = quack` (from super properties)

#### **View Only alekdob.com Data:**
1. Add filter: `$host = alekdob.com`
2. OR filter: `site = alekdob` (if you set it)

#### **Compare Both Sites:**
1. Create insight
2. Breakdown by: `$host`
3. See side-by-side comparison

---

## 🔧 **Technical Setup**

### **Quack Website (Next.js)**

```typescript
// src/providers/PostHogProvider.tsx
posthog.init('phc_WHQ2o7BZyIOaqFsVAN6J6LnsBCP8FXfuBg6ViJuiKRP', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
  loaded: (posthog) => {
    // Set super properties to identify this site
    posthog.register({
      site: 'quack',
      project: 'quack-website'
    })
  }
})
```

**Super Properties** are sent with EVERY event automatically:
- `site: 'quack'`
- `project: 'quack-website'`

### **alekdob.com (Nuxt)**

You can add similar super properties if you want:

```typescript
// In your PostHog plugin
posthog.register({
  site: 'alekdob',
  project: 'personal-website'
})
```

---

## 📈 **Creating Quack-Specific Dashboards**

### **Step 1: Create Dashboard**
1. Go to PostHog → Dashboards → New Dashboard
2. Name it "Quack Website Analytics"

### **Step 2: Add Filtered Insights**

**Total Signups (Quack Only)**
- Event: `waitlist_signup`
- Filter: `site = quack`
- Type: Total count

**Signups Trend (Quack Only)**
- Event: `waitlist_signup`
- Filter: `$host = quack.build`
- Type: Trend (Daily)

**Conversion Funnel (Quack Only)**
- Step 1: `$pageview` + Filter `site = quack`
- Step 2: `waitlist_signup`
- Step 3: Click on Discord button

**Traffic Sources (Quack Only)**
- Event: `$pageview`
- Filter: `site = quack`
- Breakdown: `$referring_domain`

---

## 🎨 **Example Queries**

### **Count waitlist signups for Quack this week:**
```javascript
Events: waitlist_signup
Filters:
  - site = quack
Date range: Last 7 days
```

### **Compare pageviews between sites:**
```javascript
Events: $pageview
Breakdown by: $host
Date range: Last 30 days
```

### **Get conversion rate for Quack only:**
```javascript
Funnel:
  1. $pageview (filter: site=quack)
  2. waitlist_signup
  3. $autocapture (Discord button click)
```

---

## 🤖 **MCP Server Integration**

The MCP server needs your PostHog **Personal API Key** (different from project key).

### **Get Personal API Key:**
1. Go to PostHog → Settings (gear icon)
2. Click "Personal API Keys"
3. Click "Create personal API key"
4. Name it "Quack MCP Server"
5. Copy the key (starts with `phx_`)

### **Get Project ID:**
1. Go to Project Settings
2. Copy the Project ID (number like `12345`)

### **Add to .env.local:**
```env
# For MCP Server
POSTHOG_API_KEY=phx_YOUR_PERSONAL_API_KEY_HERE
POSTHOG_PROJECT_ID=YOUR_PROJECT_ID_HERE
```

---

## 📊 **Event Tracking Examples**

### **Automatically Tracked (No Code):**
- ✅ `$pageview` - Every page view (with `$host: quack.build`)
- ✅ `$pageleave` - User leaves page
- ✅ `$autocapture` - Button clicks (optional)

### **Custom Events (Quack):**
```typescript
// Waitlist signup
posthog.capture('waitlist_signup', {
  email: user.email,
  source: 'hero_cta',
  // site: 'quack' is already added via super properties
})

// Discord button click
posthog.capture('discord_click', {
  location: 'bottom_cta'
})

// Download button (future)
posthog.capture('download_click', {
  platform: 'macos',
  version: '0.1.0'
})
```

### **User Identification:**
```typescript
// When user signs up for waitlist
posthog.identify(email, {
  email,
  signup_source: 'quack.build',
  signup_date: new Date().toISOString()
})
```

---

## 🔐 **Privacy & GDPR**

### **Current Setup:**
- `person_profiles: 'identified_only'`
  - Anonymous users = NO profile created
  - Identified users (waitlist) = Profile created
  - **GDPR friendly** ✅

### **Data Retention:**
- PostHog keeps events for **90 days** on free tier
- After 90 days, old events are deleted
- User profiles persist until deleted

### **User Opt-Out:**
```typescript
// If user wants to opt-out
posthog.opt_out_capturing()

// Check if user opted out
if (posthog.has_opted_out_capturing()) {
  // Don't show analytics-dependent features
}
```

---

## 💰 **Cost Monitoring**

### **Check Current Usage:**
1. Go to PostHog → Settings → Billing
2. See "Product Analytics" usage
3. Monitor events/month

### **Alert Setup (Recommended):**
Set up alert when you hit **800k events** (80% of free tier):
1. PostHog → Settings → Notifications
2. Create alert for usage

### **If You Hit 1M Events:**

**Estimated costs:**
- 1M-2M events: ~$50-100/month (with volume discount)
- 2M-3M events: ~$150-200/month

**At that point:**
- Quack is successful = revenue coming in
- $100/month is cheap for 2M events
- Alternative: Migrate one site to Plausible/Umami (free)

---

## 🎯 **Pro Tips**

### **1. Use Event Properties for Segmentation:**
```typescript
posthog.capture('waitlist_signup', {
  plan: 'free',           // or 'pro' in future
  referrer: document.referrer,
  utm_source: params.get('utm_source'),
  device_type: isMobile ? 'mobile' : 'desktop'
})
```

### **2. Create Cohorts:**
- "Quack Early Adopters" = Users who signed up in first month
- "HN Visitors" = Filter by `$referring_domain` contains `ycombinator`
- "Power Users" = Users who visited 5+ times

### **3. Use Feature Flags (Free!):**
```typescript
// A/B test different CTAs
if (posthog.isFeatureEnabled('new-cta')) {
  // Show new CTA design
} else {
  // Show old CTA design
}
```

### **4. Session Recordings:**
Enable to watch real user sessions:
- See where users get stuck
- Identify UX issues
- Watch conversion paths

---

## 🚀 **Next Steps**

### **Immediate:**
1. ✅ PostHog configured for quack.build
2. ⏳ Add env vars to Vercel
3. ⏳ Deploy to production
4. ⏳ Test waitlist form tracking

### **This Week:**
1. Create "Quack Website Analytics" dashboard
2. Setup conversion funnels
3. Enable session recordings
4. Install MCP server locally

### **Ongoing:**
1. Monitor conversion rates weekly
2. Watch session recordings for UX insights
3. A/B test different CTAs
4. Segment power users for early access

---

## ❓ **FAQ**

### **Q: Will alekdob.com data be affected?**
A: No! Data is separate thanks to `$host` property. Just filter by domain.

### **Q: What if I want separate projects later?**
A: You can always create a new project and migrate. PostHog has export tools.

### **Q: How do I know which site generated an event?**
A: Every event has `$host` property (quack.build or alekdob.com) + `site` super property.

### **Q: Can I use the same MCP server for both sites?**
A: Yes! Just add filters in your queries:
```typescript
// Get stats for quack only
fetch(posthog_api, {
  filters: { site: 'quack' }
})
```

### **Q: What happens if I delete one site?**
A: Just stop sending events from that site. Historical data stays for 90 days then auto-deletes.

---

## 🦆 **Summary**

**You're using 1 PostHog project for 2 sites:**
- alekdob.com (existing)
- quack.build (new)

**Benefits:**
- Shared 1M events free tier
- No additional cost
- Easy data segmentation
- Cross-site analytics

**Filtering:**
- `$host = quack.build` → Quack data only
- `site = quack` → Quack data only (super property)

**Cost:**
- $0/month until you exceed 1M events combined
- If successful, ~$100-200/month for 2M events

**Worth it?**
- Session recordings alone are worth $100/month
- When Quack is successful, this is pocket change
- Free tier is VERY generous for startup phase

🎉 **You're all set!**
