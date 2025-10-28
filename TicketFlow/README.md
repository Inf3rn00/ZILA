# ZILA - Modern Ticket Management System

A robust, production-ready ticket management web application built with React, TypeScript, and modern web technologies. ZILA provides a seamless user experience for creating, tracking, and managing support tickets with a beautiful, responsive interface.

## Features

### Core Functionality

- **Landing Page**: Eye-catching hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login and signup with form validation
- **Dashboard**: Overview of ticket statistics with visual indicators
- **Ticket Management**: Complete CRUD operations for tickets
- **Protected Routes**: Session-based authentication using localStorage
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop (max-width: 1440px)

### Technical Highlights

- Input validation using Zod schema
- Toast notifications for user feedback
- Status-based color coding (Open: Green, In Progress: Amber, Closed: Gray)
- Semantic HTML and accessibility compliance
- Modern design system with HSL color tokens
- Smooth transitions and hover effects

## Technologies Used

### Frontend Framework & Libraries

- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 7.1.12** - Fast build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing

### UI Components & Styling

- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.16** - Tailwind plugin for Vite
- **Radix UI** - Accessible component primitives
  - @radix-ui/react-label
  - @radix-ui/react-slot
  - @radix-ui/react-select
  - @radix-ui/react-alert-dialog
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** - Merge Tailwind classes
- **clsx** - Conditional class names

### Form Handling & Validation

- **Zod 4.1.12** - Schema validation

### State Management & Data Fetching

- **TanStack React Query 5.90.5** - Server state management
- **localStorage** - Session and data persistence

### User Feedback

- **Sonner** - Toast notifications

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the zila directory**

```bash
cd zila
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

##Design System

### Color Scheme

The application uses a comprehensive design system defined in `src/index.css`:

- **Primary**: Indigo gradient (`hsl(239, 84%, 67%)` to `hsl(262, 83%, 58%)`)
- **Status Colors**:
  - Open: Green (`hsl(142, 76%, 36%)`)
  - In Progress: Amber (`hsl(38, 92%, 50%)`)
  - Closed: Gray (`hsl(215, 16%, 47%)`)

### Layout

- Maximum container width: 1440px (centered)
- Responsive breakpoints: Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)
- Consistent spacing and typography throughout

## Authentication

### Test Credentials

Since this is a frontend-only implementation, you can create your own account through the signup page. The authentication system uses localStorage for session management.

**Session Key**: `ticketapp_session`
**Users Storage Key**: `ticketapp_users`

### Authentication Flow

1. Users can sign up with email, password, and name
2. Login validates credentials against localStorage
3. Session token is stored in localStorage
4. Protected routes check for valid session
5. Logout clears session and redirects to home

## Pages & Routes

| Route          | Component | Access    | Description                     |
| -------------- | --------- | --------- | ------------------------------- |
| `/`            | Landing   | Public    | Hero page with features and CTA |
| `/auth/login`  | Login     | Public    | User login form                 |
| `/auth/signup` | Signup    | Public    | User registration form          |
| `/dashboard`   | Dashboard | Protected | Statistics overview             |
| `/tickets`     | Tickets   | Protected | Ticket management (CRUD)        |

## Data Validation

### Ticket Schema

```typescript
{
  title: string (required, max 100 chars)
  description: string (optional, max 500 chars)
  status: 'open' | 'in_progress' | 'closed' (required)
  priority: 'low' | 'medium' | 'high' (optional)
}
```

### User Schema

```typescript
{
  name: string (2-50 chars)
  email: string (valid email)
  password: string (min 6 chars)
}
```

## UI Components Structure

### Reusable Components

- `Button` - Multiple variants (default, hero, outline, ghost)
- `Badge` - Status-based color variants
- `Card` - Content containers with hover effects
- `Input` - Form input with validation states
- `Select` - Dropdown selects for status/priority
- `AlertDialog` - Confirmation dialogs
- `Toast` - User feedback notifications

### Layout Components

- `Footer` - Consistent footer across all pages
- `ProtectedRoute` - Authentication wrapper

## Accessibility Features

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels and descriptions
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast
- Screen reader friendly
- Error messages linked to form fields

## Error Handling

The application implements comprehensive error handling:

1. **Form Validation**: Real-time validation with inline error messages
2. **Authentication Errors**: Clear feedback for login/signup failures
3. **User-Friendly Messages**: Descriptive error messages
4. **Toast Notifications**: Non-intrusive feedback system

## Data Storage

All data is stored in localStorage:

- `ticketapp_session`: Current user session
- `ticketapp_users`: Registered users
- `tickets`: All created tickets

## State Management

- **Authentication State**: Managed by React Context (`AuthContext`)
- **Form State**: React Hook Form
- **Local State**: React useState for component-level state
- **URL State**: React Router for navigation state

## Known Issues & Limitations

- Authentication is simulated (localStorage-based, not production-ready)
- No backend API integration
- No real-time updates
- Data is stored locally (cleared on browser cache clear)
- No email verification system
- No password recovery feature

## Future Enhancements

- Backend API integration
- Real-time ticket updates (WebSocket)
- Email notifications
- File attachments
- Ticket comments/history
- Advanced filtering and search
- Team collaboration features
- Export functionality

## License

This project is created for demonstration purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built using React, TypeScript, and modern web technologies.
