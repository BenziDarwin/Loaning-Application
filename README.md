# Loan Management Application Frontend

A modern loan management system frontend built with Next.js and TypeScript. This application provides a user interface for financial institutions to manage their loan operations, track borrowers, and monitor loan processing workflows.

## Features

### User Management

- Role-based access (Admin, Manager, Loan Officer, Collector)
- User profile management
- Activity tracking
- Role-based UI components

### Client Management

- Client registration interface
- Document upload UI
- Client profile viewing and editing
- Blacklist status tracking

### Loan Processing

- Loan application forms
- Application status tracking
- Loan disbursement monitoring
- Repayment schedule display
- Loan product catalog

### Collection Management

- Repayment tracking dashboard
- Collection agent assignment interface
- Collection performance metrics
- Defaulter list management

### Reporting & Analytics

- Financial reports visualization
- Collection performance charts
- Portfolio quality dashboards
- Risk analysis displays

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts
- **Icons**: Lucide Icons

## Prerequisites

- Node.js 18 or later
- npm (recommended)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/loan-management-frontend.git
cd loan-management-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── dashboard/      # Dashboard pages
│   │   ├── members/    # Member management
│   │   ├── loans/      # Loan management
│   │   ├── collectors/ # Collector management
│   │   └── settings/   # Settings pages
│   ├── auth/          # Authentication pages
│   └── layout.tsx     # Root layout
├── components/
│   ├── ui/            # Reusable UI components
│   ├── forms/         # Form components
│   └── dashboard/     # Dashboard-specific components
├── lib/
│   ├── utils.ts       # Utility functions
│   └── constants.ts   # Constants and configurations
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── public/            # Static assets
```

## User Interface Components

### Dashboard Layout

- Responsive sidebar navigation
- Header with user profile
- Role-based menu items
- Breadcrumb navigation

### Forms

- Member registration
- Collector registration
- Loan application
- Settings configuration

### Data Display

- Data tables with sorting and filtering
- Performance charts and graphs
- Status cards and indicators
- Profile displays

### Modals and Dialogs

- Confirmation dialogs
- Form modals
- Alert notifications
- Success messages

## Available Scripts

```bash
# Development
npm dev           # Start development server
npm lint         # Run ESLint
npm lint:fix     # Fix ESLint errors
npm format       # Format code with Prettier

# Production
npm build        # Create production build
npm start        # Start production server
```

## Configuration

### Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_API_URL=        # Backend API URL
NEXT_PUBLIC_APP_NAME=       # Application name
```

### Route Protection

The following routes are protected and require authentication:

- `/dashboard/*`
- `/settings/*`
- `/profile/*`

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy with default settings

### Static Export

```bash
npm build
```

The static output will be in the `out` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR follows these guidelines:

- Follow the existing code style
- Update documentation as needed
- Add tests if applicable
- Keep commits focused and atomic

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@loanapp.com or open an issue in the repository.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Hook Form Documentation](https://react-hook-form.com/)
