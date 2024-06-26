# Event Registration App

This is a **React-based web application** for event registration. The application allows users to register for an event by filling out a form. The form data is validated using `react-hook-form` and `zod`, and the UI components are styled using Mantine. Additionally, the backend server is built with **Node.js**, and **MongoDB** is used as the database management system.
 
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
- Infinite scrolling events homepage
- Fetch event data from an API
- Responsive design with Mantine components
- Full-stack development architecture
- Database integration for storing user information
- Search and filtering options for events

## Technologies Used

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/): React framework for server-rendered applications.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.
- [react-hook-form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
- [zod](https://github.com/colinhacks/zod): TypeScript-first schema declaration and validation library.
- [Mantine](https://mantine.dev/): React components library with native dark theme support.
- [React Icons](https://react-icons.github.io/react-icons/): Include popular icons in your React projects.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- [MongoDB](https://www.mongodb.com/): NoSQL database used for data storage.
- [Node.js](https://nodejs.org/): JavaScript runtime environment for backend development.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install) (npm comes bundled with Node.js)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yuro4kaw/events-app.git
    cd event-registration-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root directory of the project and add the following content:

    ```plaintext
    MONGODB_URI=mongodb+srv://yurmatvii:0Tz8LfwI0FXnBaUA@cluster0.jav71p3.mongodb.net/events_db
    ```

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.


## Project Structure

```
events-app/
├─ app/
│  ├─ api/
│  │  ├─ events/
│  │  │  ├─ route.js      # API routes for events
│  │  │  └─ [id]/
│  │  │     └─ route.js   # Dynamic route for event by ID
│  ├─ event/
│  │  └─ [eventId]/
│  │     └─ page.tsx      # Page component for specific event
│  ├─ register/
│  │  └─ [eventId]/
│  │     └─ page.tsx      # Page component for event registration
│  ├─ favicon.ico         # Favicon icon
│  ├─ globals.css         # Global CSS styles
│  ├─ layout.tsx          # Layout component
│  └─ page.tsx            # Main page component
├─ components/
│  ├─ CardsSection.tsx    # Component for displaying cards
│  ├─ form/
│  │  ├─ FormDateInput.tsx   
│  │  ├─ FormInput.tsx       
│  │  └─ FormSelect.tsx      
│  ├─ Preloader.tsx       # Preloader component
│  ├─ ui/
│  │  ├─ AuroraBackground.tsx   
│  │  └─ BentoGrid.tsx          
│  └─ UserCard.tsx        # User card component
├─ hooks/
│  ├─ useEvents.ts        # Custom hook for fetching events
│  ├─ useEventStatus.ts   # Custom hook for event status
│  ├─ useFetchEvent.ts    # Custom hook for fetching specific event
│  └─ useFilteredUsers.ts # Custom hook for filtering users
├─ lib/
│  ├─ mongodb.js          # MongoDB utility functions
│  └─ utils.ts            # General utility functions
├─ models/
│  └─ event.js            # Event model
├─ utils/
│  ├─ cardsColors.ts      # Card colors utility
│  ├─ cn.ts               # Classnames utility
│  ├─ eventUtils.ts       # Event utility functions
│  ├─ flipClock.css       # Flip clock CSS
│  ├─ formSchema.ts       # Form schema
│  └─ MotionWrapper.tsx   # Motion wrapper component
├─ next.config.mjs        # Next.js configuration
├─ package-lock.json      
├─ package.json           
├─ postcss.config.mjs     
├─ README.md              # README file
├─ tailwind.config.ts     # Tailwind CSS configuration
└─ tsconfig.json          # TypeScript configuration

```
