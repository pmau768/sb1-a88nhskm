# Trek Snout - Dog Adoption & Rehoming Platform

A modern, accessible web platform dedicated to responsible dog rehoming with a focus on protection, prevention, and thorough vetting of potential adopters.

## Features

- 🐕 **Adoptable Dogs Showcase**: Browse available dogs with detailed profiles
- 🏠 **Rehoming Services**: Responsible rehoming process with thorough screening
- 🔍 **Lost Dog Network**: Community-powered lost dog search and reporting system
- 📱 **Mobile-First Design**: Fully responsive across all devices
- ♿ **Accessibility**: WCAG 2.1 Level AA compliant
- 🌙 **Dark Mode**: Optimized dark theme for better visibility

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trek-snout.git
   cd trek-snout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
trek-snout/
├── app/                   # Next.js 13 app directory
│   ├── about/            # About page
│   ├── adoptables/       # Adoptable dogs listings
│   ├── apply/            # Adoption application
│   ├── lost-dogs/        # Lost dog reporting system
│   └── rehoming/         # Rehoming services
├── components/           # Reusable components
│   ├── features/        # Feature-specific components
│   └── ui/              # UI components
├── lib/                 # Utility functions
├── hooks/              # Custom React hooks
├── public/             # Static assets
└── styles/            # Global styles
```

## Deployment

This project is set up for continuous deployment with Netlify:

1. The site automatically builds and deploys when changes are pushed to the main branch
2. Build configuration is specified in `netlify.toml`
3. Static export configuration is specified in `next.config.js`

### Manual Deployment

If needed, you can manually trigger a build from the command line:

```bash
npm run build
netlify deploy --prod
```

## Key Features

### Adoption System
- Detailed dog profiles with medical history
- Multi-step application process
- Reference checking system
- Post-adoption support

### Lost Dog Network
- Real-time sighting reports
- Map-based search
- Alert system
- Community engagement tools

### Rehoming Services
- Thorough screening process
- Behavioral assessment
- Home compatibility matching
- Ongoing support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Dog photos from [Unsplash](https://unsplash.com)
- Icons from [Lucide Icons](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)

## Contact

For questions or support, please email [help@treksnout.com](mailto:help@treksnout.com).