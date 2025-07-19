# VitalVet

VitalVet is a web application for managing the medical records of veterinary patients. It allows veterinarians to create and manage patient records, including their medical history, appointments, and more.

## Technologies

This project is built with the following technologies:

-   **Astro:** A modern static site builder.
-   **Tailwind CSS:** A utility-first CSS framework.
-   **TypeScript:** A typed superset of JavaScript.
-   **Firebase Hosting:** For hosting the application.
-   **Firebase Realtime Database:** For storing and syncing data in real-time.
-   **Firebase Authentication:** For user authentication.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (version 20 or higher)
-   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/your_project_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

`VITE_API_KEY`
`VITE_AUTH_DOMAIN`
`VITE_PROJECT_ID`
`VITE_STORAGE_BUCKET`
`VITE_MESSAGING_SENDER_ID`
`VITE_APP_ID`

These variables are for the Firebase configuration. You can get them from your Firebase project console.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:4321](http://localhost:4321) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Runs a local preview of the production build.

