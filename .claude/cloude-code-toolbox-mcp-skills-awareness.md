# Cloude Code ToolBox — MCP & Skills awareness

_Generated: 2026-07-30T18:48:43.834Z_

## How to use this report

- **Saved copy:** This file is **`.claude/cloude-code-toolbox-mcp-skills-awareness.md`** — refreshed whenever the toolbox runs an MCP & Skills scan (including on workspace open when auto-scan is enabled). It is meant for **Claude Code workspace context** together with `CLAUDE.md` (which gets a shorter replaceable summary when auto-merge is on).
- **MCP:** Lists **configured** servers from Claude Code config (`~/.claude.json` for user scope, `.mcp.json` for project scope). Use `/mcp` in the Claude Code panel to connect servers for your session.
- **Skills:** **On-disk** folders with `SKILL.md`. Claude Code does not auto-load them; attach `SKILL.md` or paths in chat when useful.
- **Task routing:** When the user’s request matches a server’s purpose (e.g. Confluence → Confluence/Atlassian MCP), prefer that **server id** from the tables below.

---

## MCP — workspace

Workspace `mcp.json` _(folder: subhajit store)_

- **c:\Users\subha\OneDrive\Desktop\subhajit store\.mcp.json** — _File missing_

_No active workspace servers in mcp.json._

## MCP — user profile

- **C:\Users\subha\.claude.json** — _File exists — no servers defined_

_No active user-scoped servers in mcp.json._

## Skills (local `SKILL.md` folders)

### Project-scoped

_None found (or no workspace open)._

### User-scoped

- **caveman** — `C:\Users\subha\.agents\skills\caveman`
  - >

- **caveman-commit** — `C:\Users\subha\.agents\skills\caveman-commit`
  - >

- **caveman-compress** — `C:\Users\subha\.agents\skills\caveman-compress`
  - >

- **caveman-review** — `C:\Users\subha\.agents\skills\caveman-review`
  - >

- **compress** — `C:\Users\subha\.agents\skills\compress`
  - >

- **find-skills** — `C:\Users\subha\.agents\skills\find-skills`
  - Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used w

- **higgsfield-generate** — `C:\Users\subha\.agents\skills\higgsfield-generate`
  - |

- **higgsfield-marketplace-cards** — `C:\Users\subha\.agents\skills\higgsfield-marketplace-cards`
  - |

- **higgsfield-product-photoshoot** — `C:\Users\subha\.agents\skills\higgsfield-product-photoshoot`
  - |

- **higgsfield-soul-id** — `C:\Users\subha\.agents\skills\higgsfield-soul-id`
  - |

- **semantic-css** — `C:\Users\subha\.agents\skills\semantic-css`
  - Skill for building beautiful, accessible web interfaces with semantic CSS. Provides design tokens for colors, typography, spacing, and effects with a 6-theme system. Use this skill when styling web applications with scal

---

## Suggested next steps

- **MCP:** Use this extension’s hub **MCP** tab, or `claude mcp list` in the terminal. In Claude Code, use `/mcp` to connect servers for the session.
- **Edit config:** Open `~/.claude.json` (user MCP) or `<workspace>/.mcp.json` (project MCP) via the extension commands.
- **Refresh this report:** run **Intelligence — scan MCP & Skills awareness** again after changing MCP config or adding skills.

_Report from Cloude Code ToolBox extension._
