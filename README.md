#Project Documentation
## 1. Overview

This project is built with Vite as the frontend build tool and Vitest for testing.
Vite ensures fast development with HMR (Hot Module Replacement) and optimized builds, while Vitest provides a Jest-like testing experience but runs much faster in a Vite environment.

## 2. Installation

Make sure you have Node.js 18+ installed.
Then install dependencies:

```
npm install
```

## 3. Available Scripts
Development
```
npm run dev
```

Runs the app in development mode with hot reload. Open http://localhost:5173
 to view it in the browser.

Build
```
npm run build
```

Builds the project for production. Output will be optimized and placed in the dist/ directory.

Preview
```
npm run preview
```

Locally preview the production build before deployment.

Testing
```
npm run test
```

Runs unit tests using Vitest. It supports TypeScript, JSX, and mocks out of the box.

To run tests in watch mode:

npm run test:watch

## 4. Project Structure
```
project-root/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level views
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Helper functions
│   └── main.tsx      # Application entry point
├── tests/            # Unit and integration tests
├── vite.config.ts    # Vite configuration
└── package.json
```

## 5. Configuration

Vite: Configured with TypeScript support and React plugin.

Vitest: Configured for jsdom environment to test React components.

Example vite.config.ts:
```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts"
  }
});
```

## 6. Testing Example
```
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App component", () => {
  it("renders headline", () => {
    render(<App />);
    expect(screen.getByText(/hello vite/i)).toBeInTheDocument();
  });
});
```
## 7. Deployment

After building, deploy the dist/ folder to any static hosting provider:

Netlify

## 8. Storybook Hosting

The Storybook for this project is deployed on Netlify.

Live Storybook URL: 

```
https://storybookpreview.netlify.app/
```

Deployment Procedure

Netlify runs:
```
npm run build-storybook

```