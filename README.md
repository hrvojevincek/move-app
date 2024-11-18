# Cinerama - Movie Database App

A React-based movie database application that allows users to browse movies by genre, view details, and manage favorites. Built with React, Webpack, and TMDB API.

## Features

- Browse movies by genres (Action, Comedy, Sci-Fi)
- Infinite scroll carousel for each genre
- Movie details view with full information
- Add/remove movies to favorites
- Responsive design with genre-specific styling
- Error boundary handling
- Loading states with skeleton screens

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API access (API key and access token)

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hrvojevincek/movie-app.git
```

2. Install dependencies:

```bash
cd movie-app
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run test:watch` - Runs tests in watch mode
- `npm run test:coverage` - Runs tests with coverage report
- `npm run lint` - Lints the source code
- `npm run lint:fix` - Fixes linting issues
- `npm run format` - Formats code with Prettier

## Testing

The project includes comprehensive testing:

- Unit tests for components
- Integration tests for main features
- API service tests
- Custom hooks tests

Run tests with:

```bash
npm test
```

## Tech Stack

- React
- Webpack
- SASS/SCSS
- Jest & Testing Library
- Axios
- React Router
- ESLint & Prettier
