# Agent Mike - Quick Start Guide

*Get up and running with your AI agent team in under 5 minutes*

## What is Agent Mike?

Agent Mike is your sarcastic Italian project manager who coordinates a team of specialized AI agents. Think of it as having a boutique consulting firm of AI experts, but with personality (and the occasional duck reference).

**The Team:**
- 🎭 **Mike** - Project Manager (sarcastic, gets things done)
- 🎯 **Scott** - HR Manager (enthusiastic talent scout)
- 🎨 **Elena** - Animation Architect (GSAP perfectionist)
- 📚 **Alexandra** - Documentation Specialist (that's me!)

## Quick Setup (2 Minutes)

### Prerequisites
- Claude Code (you're probably already using it)
- Basic familiarity with AI agents
- A project that needs some specialized expertise

### Step 1: Clone or Navigate
```bash
# If you're setting up Agent Mike
git clone [your-repo] agent-mike
cd agent-mike

# If you're in an existing project
cd /path/to/your/project
```

### Step 2: Access Your Team
Your agents are located in `.claude/agents/`:
- `mike-project-manager.md` - The boss
- `scott-hr-manager.md` - The recruiter
- `elena-animation-architect.md` - Animation expert
- `alexandra-docs-whisperer.md` - Documentation expert (hi!)

### Step 3: Start a Conversation
Talk to Mike first - he's the project manager:

```
"Hey Mike, I need to add smooth animations to my landing page"
```

Mike will coordinate with Elena (animation expert) and get you sorted.

## Your First Project (3 Minutes)

Let's say you want to improve your website's user experience:

### 1. Brief Mike
```
"Mike, I have a business website that needs professional animations
and better documentation. What's the plan?"
```

### 2. Mike Coordinates the Team
Mike will:
- Assess your needs (with his characteristic sarcasm)
- Delegate to Elena for animations
- Have Alexandra (me) handle documentation
- Keep everyone on track

### 3. Get Specialized Help
Each agent works in their expertise:
- **Elena** creates smooth GSAP animations
- **Alexandra** writes clear guides and documentation
- **Scott** can hire new specialists if needed

## AI Tool Integration

### With Claude Code (Recommended)
```bash
# Access agents directly
claude chat --agent=mike-project-manager
claude chat --agent=elena-animation-architect
```

### With Cursor
1. Open the agent files in Cursor
2. Use `@filename` to reference specific agents
3. Example: `@mike-project-manager help me plan this animation feature`

### With GitHub Copilot
1. Reference agent files in comments
2. Example: `// Using Elena's animation architecture approach`

## Common First Questions

**Q: Which agent should I talk to first?**
A: Always start with Mike. He's the project manager and will coordinate everything.

**Q: Can I talk to specialists directly?**
A: Absolutely! But Mike prefers to be in the loop for project coordination.

**Q: What if I need a specialist that doesn't exist yet?**
A: Ask Scott! He's the HR manager and loves recruiting new talent.

**Q: How do I know what each agent is good at?**
A: Check the `agents.md` file for the complete team roster and specialties.

## Next Steps

Now that you're set up, here's what to explore:

1. **[BMAD-METHOD Guide](./bmad-method.md)** - The methodology behind the madness
2. **[Agent Personalities](./agent-personalities.md)** - Understanding your team
3. **[Advanced Workflows](./advanced-workflows.md)** - Complex project patterns

## Pro Tips

- **Be specific with requests** - "Add animations" vs "Create smooth hover effects for navigation buttons"
- **Include context** - Mention your tech stack, timeline, and constraints
- **Use Mike's sarcasm** - He responds well to direct, no-nonsense communication
- **Let specialists specialize** - Don't ask Elena about documentation or Alexandra about animations

## Troubleshooting

**Agent not responding as expected?**
- Check you're addressing the right specialist
- Include more context about your project
- Ask Mike to coordinate if multiple agents are needed

**Need a new type of specialist?**
- Ask Scott to recruit someone
- Describe the exact expertise you need
- Be patient - Scott loves finding the perfect person for the job

---

*Ready to build something amazing with your AI agent team? Start with Mike - he's waiting for your next project brief!*

**Time to first value: ~2 minutes**
**Time to project coordination: ~5 minutes**
**Time to specialized expertise: Immediate**