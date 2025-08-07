# AutoDetail Pro - Professional Auto Detailing Assessment App

A comprehensive Next.js application for auto detailing businesses to streamline client assessments and service requests.

## Features

- **Client Assessment System**: Multi-step form for comprehensive vehicle evaluation
- **Admin Dashboard**: Real-time management of assessment requests
- **Real-time Database**: Convex integration for instant updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation without 'any' types
- **Professional UI**: Shadcn-UI components for consistent design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Convex (real-time)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn-UI
- **Language**: TypeScript
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd auto-detailing-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Convex**
   \`\`\`bash
   npx convex dev
   \`\`\`

4. **Configure environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   # Add your NEXT_PUBLIC_CONVEX_URL
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── assessment/         # Assessment flow pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # Reusable UI components
├── convex/               # Convex backend functions
│   ├── schema.ts         # Database schema
│   └── assessments.ts    # Assessment CRUD operations
└── lib/                  # Utility functions
\`\`\`

## Usage

### For Clients
1. Visit the homepage
2. Click "Start Assessment"
3. Complete the 4-step assessment form
4. Receive confirmation and await quote

### For Business Owners
1. Navigate to `/admin`
2. View all assessment requests
3. Filter and search assessments
4. Update status as you process requests
5. View detailed assessment information

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Convex Production
\`\`\`bash
npx convex deploy --prod
\`\`\`

## Environment Variables

\`\`\`env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
