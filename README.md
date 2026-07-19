# Design system builder

Pick fonts, colors, and component styling; it generates an agent-readable design system prompt with tokens and components. Tokens in, agent-ready prompt out.

I built this because design intent gets lost the moment you hand work to a coding agent. A design system that lives in Figma is invisible to the agent touching your files. So the builder turns your choices into a megaprompt: a spec an agent can actually read and build from. I describe intent, it touches the files.

## How it works

1. Choose colors: pre-built themes or custom
2. Pick typography: a primary font for body/UI, a display font for headings, and a scale
3. Configure components: menu layout, card styles, input variants, logo
4. Preview the result live in the phone mock
5. Generate the megaprompt and paste it into your agent (I use Claude)

The generated spec covers design tokens (color, typography, spacing, radius, shadows, animation), component definitions, and light/dark themes.

## Provenance (built vs directed)

I designed the flow, the token schema, and the megaprompt format, then directed the agent build and reworked what fell short. The commit history shows it honestly: the first stretch is Lovable's gpt-engineer bot (where I scaffolded v1), everything after is me directing Claude Code. I don't fully qualify as a full-stack engineer, but I have a very high bar for quality - I'll get the agent to build it and learn whatever it is on the job.

## Decisions and trade-offs

- **The prompt is the export format.** Most design system tools export code. Exported code rots the moment you touch it. A spec the agent regenerates from doesn't. That call shaped everything else.
- **Two builds live in this repo.** `expo-app/` is the current version (Expo + NativeWind + Zustand, targeting React Native for web, iOS, and Android). `tamagui builder/` is the earlier Tamagui-based web version, archived in place because the token architecture docs still reference it and the test suites there document what parity meant.
- **Rebuilt instead of patched.** The Tamagui version reached visual parity and then I moved the whole thing to Expo + NativeWind anyway (see the migration docs in `docs/`). Slower, but the token system came out cleaner the second time.
- **It never shipped.** No public release. That lesson changed how I build: the next project wasn't an app at all, just the core logic packaged so real people could test it the same week.

## Running it

The current app is in `expo-app/`:

```bash
cd expo-app
npm install
npm start        # expo; press w for web, or open on a device
```

The archived Tamagui version still runs too:

```bash
cd "tamagui builder"
npm install --legacy-peer-deps
npm run dev
```

## Docs

`docs/` has the real writeups: token system architecture, the Tamagui migration plan, color naming conventions, and the testing setup. Start with [docs/README.md](./docs/README.md).
