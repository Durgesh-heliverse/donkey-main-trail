# The Legendary Donkey Trail

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=oe8f87xo
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-01
SANITY_API_READ_TOKEN=sk1FSj2AAug4DeUgAKwWuhXsq9LbPIFFMSd3rmIrEZ0UVgUir47Np4gQFy3RQdKu2UF5PZM8MeifpWGRKhwAQ984vzwP8aYjt7BhE1ku5acxw16al3p2WY0I52d0i658R8GdHtTAcoHJOzzuBGKm4AQVSbmnJnqgMESpsWHqvbqn8XGDiPPw
```

**Note:** If your dataset is not "production", change `NEXT_PUBLIC_SANITY_DATASET` to match your Sanity dataset name (could be "development" or "production").

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Add Content in Sanity Studio

1. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Open Sanity Studio at: `http://localhost:3000/studio`

3. Create a new **Homepage** document:
   - Click "Create new" → Select "Homepage"
   - Fill in the Hero Section fields:
     - **Title (White Text)**: "The Legendary"
     - **Highlighted Text (Orange)**: "Donkey Trail"
     - **Description**: "Join us today and discover the Hidden Heritage of the Swartberg Mountains trails!"
     - **Promotional Tag**: "Calitzdorp's Premier Hiking Experience"
     - **Trail Statistics**:
       - Total Distance: "77km"
       - Duration: "5 Days"
       - Difficulty: "Mod - Difficult"
     - **Primary Button**: 
       - Text: "Explore the Trail"
       - Link: "/explore" (or your desired link)
     - **Secondary Button**:
       - Text: "View Trail Map"
       - Link: "/map" (or your desired link)
   - Upload a background image
   - Click "Publish"

4. Also create **Header** and **Footer** documents if needed.

### 4. Verify Dataset Name

If you're still seeing "No homepage content found", check your Sanity project:
- Go to https://sanity.io/manage
- Select your project (ID: oe8f87xo)
- Check the dataset name (might be "production" or "development")
- Update `.env.local` if different

## Project Structure

- `app/` - Next.js app router pages
- `components/` - React components (Hero, Header, Footer)
- `sanity/` - Sanity CMS configuration
  - `schemaTypes/` - Content schemas (homepage, header, footer)
  - `lib/` - Sanity client and utilities
- `public/` - Static assets

## Development

```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

