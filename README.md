# DLM UI

Creative UI generation in a flash. Generate stunning, high-fidelity UI components using AI.

## Features

- **AI-Powered UI Generation**: Generate 3 unique design variations for any UI component
- **Creative Style Directions**: Each generation uses unique physical/material metaphors
- **Project Persistence**: All projects are automatically saved to Vercel Blob storage
- **Project Management**: Browse, load, and delete saved projects
- **Download Options**: Download individual components as HTML or full projects as ZIP
- **Live Preview**: See your generated components in real-time with interactive preview
- **Variations**: Generate alternative design variations for any component

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: Google Gemini API
- **Storage**: Vercel Blob Storage
- **Styling**: Custom CSS with modern effects

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key
- Vercel account (for blob storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dlmmedia/dlm-ui.git
   cd dlm-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link to Vercel and set up blob storage:
   ```bash
   npx vercel link
   npx vercel blob store add dlm-ui-store
   # Follow prompts to link the store to your project
   npx vercel env pull .env.local
   ```

4. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `BLOB_READ_WRITE_TOKEN` | Auto-added by Vercel when you link blob storage |

## Project Structure

```
dlm-ui/
├── app/
│   ├── api/
│   │   └── projects/
│   │       └── route.ts    # Blob CRUD operations
│   ├── components/
│   │   ├── ArtifactCard.tsx
│   │   ├── DottedGlowBackground.tsx
│   │   ├── Icons.tsx
│   │   └── SideDrawer.tsx
│   ├── constants.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx            # Main app component
│   ├── types.ts
│   └── utils.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Usage

1. **Generate UI**: Type a description in the input field and press Enter
2. **View Components**: Click on any card to focus and interact with it
3. **Get Variations**: Click "Variations" to generate alternative designs
4. **View Code**: Click "Source" to see the generated HTML
5. **Download**: Click "Download" to save the component as HTML
6. **Save Project**: Projects auto-save, or click "Save" manually
7. **Browse Projects**: Click "My Projects" to see all saved projects

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dlmmedia/dlm-ui)

Make sure to:
1. Add `GEMINI_API_KEY` to your Vercel environment variables
2. Create a blob store and link it to your project

## License

Apache-2.0
