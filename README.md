# Event Registration App

This is a React-based web application for event registration. The application allows users to register for an event by filling out a form. The form data is validated using `react-hook-form` and `zod`, and the UI components are styled using Mantine.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)

## Features

- User-friendly registration form
- Form validation with `react-hook-form` and `zod`
- Fetch event data from an API
- Responsive design with Mantine components

## Technologies Used

### [React](https://reactjs.org/)
JavaScript library for building user interfaces.

### [Next.js](https://nextjs.org/)
React framework for server-rendered applications.

### [TypeScript](https://www.typescriptlang.org/)
Typed superset of JavaScript.

### [react-hook-form](https://react-hook-form.com/)
Performant, flexible and extensible forms with easy-to-use validation.

### [zod](https://github.com/colinhacks/zod)
TypeScript-first schema declaration and validation library.

### [Mantine](https://mantine.dev/)
React components library with native dark theme support.

### [React Icons](https://react-icons.github.io/react-icons/)
Include popular icons in your React projects.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install) (npm comes bundled with Node.js)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/event-registration-app.git
    cd event-registration-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

1. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

```
events-app
├─ app
│  ├─ api
│  │  └─ events
│  │     ├─ route.js
│  │     └─ [id]
│  │        └─ route.js
│  ├─ event
│  │  └─ [eventId]
│  │     └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ register
│     └─ [eventId]
│        └─ page.tsx
├─ components
│  ├─ CardsSection.tsx
│  ├─ form
│  │  ├─ FormDateInput.tsx
│  │  ├─ FormInput.tsx
│  │  └─ FormSelect.tsx
│  ├─ Preloader.tsx
│  ├─ ui
│  │  ├─ AuroraBackground.tsx
│  │  └─ BentoGrid.tsx
│  └─ UserCard.tsx
├─ hooks
│  ├─ useEvents.ts
│  ├─ useEventStatus.ts
│  ├─ useFetchEvent.ts
│  └─ useFilteredUsers.ts
├─ lib
│  ├─ mongodb.js
│  └─ utils.ts
├─ models
│  └─ event.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tailwind.config.ts
├─ tsconfig.json
└─ utils
   ├─ cardsColors.ts
   ├─ cn.ts
   ├─ eventUtils.ts
   ├─ flipClock.css
   ├─ formSchema.ts
   └─ MotionWrapper.tsx

```