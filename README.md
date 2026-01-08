# Post Management Application

A modern, responsive web application for managing blog posts built with React, TypeScript, and Vite. This application allows users to view, search, filter, and create posts with a clean and intuitive user interface.

## Features

- 📋 **Post List View**: Browse all posts with pagination (10 posts per page)
- 🔍 **Search Functionality**: Search posts by title
- 👤 **Author Filtering**: Filter posts by author
- ➕ **Create Posts**: Add new posts with title, body, and author selection
- 📄 **Single Post View**: View detailed information about individual posts
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ✅ **Form Validation**: Client-side validation using React Hook Form and Zod
- 🔄 **State Management**: Redux Toolkit for efficient state management
- 🌐 **API Integration**: Fetches posts from JSONPlaceholder API

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd elevate-task
   ```

2. **Install dependencies**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Or using yarn:
   ```bash
   yarn install
   ```

## Running the Project Locally

1. **Start the development server**
   
   Using npm:
   ```bash
   npm run dev
   ```
   
   Or using yarn:
   ```bash
   yarn dev
   ```

2. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Build for production**
   
   Using npm:
   ```bash
   npm run build
   ```
   
   Or using yarn:
   ```bash
   yarn build
   ```

4. **Preview production build**
   
   Using npm:
   ```bash
   npm run preview
   ```
   
   Or using yarn:
   ```bash
   yarn preview
   ```

## Project Structure

```
elevate-task/
├── src/
│   ├── components/          # React components
│   │   ├── CreatePost.tsx   # Post creation form
│   │   ├── Post.tsx         # Post list view
│   │   ├── SinglePost.tsx   # Single post view
│   │   ├── shared/          # Shared components
│   │   │   └── Header.tsx
│   │   └── ui/              # UI components
│   │       ├── ErrorMessage.tsx
│   │       └── Pagination.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── usePosts.ts      # Posts data fetching hook
│   ├── slices/              # Redux slices
│   │   └── postSlice.ts     # Post state management
│   ├── schemas/             # Zod validation schemas
│   │   └── postSchema.ts
│   ├── store.ts             # Redux store configuration
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   └── select.tsx
│   ├── lib/                 # Utility functions
│   │   └── utils.ts
│   ├── App.tsx              # Main app component with routes
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Available Scripts

- `npm run dev` / `yarn dev` - Start development server
- `npm run build` / `yarn build` - Build for production
- `npm run preview` / `yarn preview` - Preview production build
- `npm run lint` / `yarn lint` - Run ESLint

## API Integration

The application fetches posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts). The API endpoint used is:
- `https://jsonplaceholder.typicode.com/posts`

## Additional Notes

### State Management
- Posts are fetched from the API and stored in Redux store
- New posts created locally are added to the Redux store
- The application merges API posts with locally created posts to avoid duplicates

### Form Validation
- All form inputs are validated using Zod schemas
- Error messages are displayed inline for better user experience
- Form submission is disabled while processing

### Responsive Design
- The application is fully responsive and works on mobile, tablet, and desktop devices
- Uses Tailwind CSS for consistent styling across all screen sizes

### Accessibility
- Semantic HTML elements
- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management

## Future Improvements

- [ ] Add edit/update functionality for posts
- [ ] Add delete functionality for posts
- [ ] Implement user authentication
- [ ] Add comments section for posts
- [ ] Implement real-time updates using WebSockets
- [ ] Add unit and integration tests
- [ ] Implement error boundaries for better error handling
- [ ] Add loading skeletons for better UX
- [ ] Implement infinite scroll as an alternative to pagination
- [ ] Add dark mode support
- [ ] Implement post categories/tags
- [ ] Add image upload functionality
- [ ] Implement search history
- [ ] Add export functionality (CSV, JSON)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Note**: This project uses JSONPlaceholder as a mock API. In a production environment, you would replace this with your own backend API.
