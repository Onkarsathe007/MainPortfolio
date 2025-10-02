# Portfolio Website

A modern portfolio website built with React, Vite, and Tailwind CSS, featuring a dynamic blog system.

## Features

- **Dynamic Blog System**: Fetches blog posts from a REST API
- **Blog Detail Pages**: Dynamic routing for individual blog posts
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Modern UI Components**: Uses shadcn/ui component library
- **Error Handling**: Proper loading states and error handling for API calls

## API Integration

The website integrates with a blog API with the following endpoints:

### Get All Blogs
```
GET http://localhost:9090/blog
```

### Get Specific Blog
```
GET http://localhost:9090/blog/{id}
```

## Environment Setup

1. Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=http://localhost:9090
```

2. Make sure your backend API server is running on port 9090

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Project Structure

```
src/
├── components/
│   └── ui/
│       └── Blog/
│           └── BlogCards.jsx    # Blog listing component
├── pages/
│   ├── HomePage.jsx            # Home page
│   ├── BlogsPage.jsx           # Blog listing page
│   └── BlogDetailPage.jsx      # Dynamic blog detail page
├── services/
│   └── blogAPI.js              # API service layer
└── App.jsx                     # Main app with routing
```

## Routing

- `/` - Home page
- `/blogs` - Blog listing page
- `/blog/:id` - Dynamic blog detail page

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## API Response Format

### Blog Object
```json
{
  "_id": "68d66043e70f8da1bf074a23",
  "title": "Blog Title",
  "content": "Blog content...",
  "author": "Author Name",
  "image": "https://example.com/image.jpg",
  "categories": ["Category1", "Category2"],
  "createdAt": "2025-09-26T09:43:31.457Z",
  "__v": 0
}
```
