# SmartSight AI: IoT Sensor Data RAG for Smart Buildings

SmartSight AI is a comprehensive Next.js application designed to provide a centralized dashboard for monitoring and managing smart building data. It leverages the power of generative AI to offer intelligent insights, including a Retrieval-Augmented Generation (RAG) chat for querying building documentation, real-time anomaly detection, and actionable efficiency recommendations.

![SmartSight AI Dashboard Screenshot](/home/user/studio/src/public/images/image.png)

## ✨ Key Features

*   **Live Telemetry Dashboard**: Visualize real-time data from various IoT sensors, including temperature, energy consumption, air quality, and vibration levels.
*   **Anomaly Detection**: Automatically identifies and alerts on unusual sensor readings, helping to preemptively address potential issues.
*   **RAG Chat**: An AI-powered chat interface that allows users to ask natural language questions about building procedures, maintenance manuals, and specifications.
*   **AI-Driven Recommendations**: Receive intelligent suggestions for optimizing energy consumption, scheduling predictive maintenance, and improving overall operational efficiency.
*   **Document Management**: A centralized repository for uploading, indexing, and managing crucial building documents like manuals and specifications.
*   **Performance Evaluation**: A dedicated view to monitor and evaluate the performance metrics of the underlying AI and RAG models.
*   **Responsive Design**: A fully responsive interface that works seamlessly across desktops, tablets, and mobile devices.

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd smartsight-ai
    ```
3.  Install NPM packages. Any packages added to `package.json` will be installed automatically.

### Running the Development Server

You can run the application in development mode with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Runs the linter to check for code quality issues.
*   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
*   `npm run genkit:dev`: Starts the Genkit development server.

## 📁 Project Structure

*   `src/app/`: Contains all the pages and layouts for the Next.js App Router.
*   `src/components/`: Shared React components, including UI elements, charts, and dashboard-specific components.
*   `src/ai/`: Houses all Genkit-related code, including flows for RAG, recommendations, and other AI features.
*   `src/lib/`: Utility functions, mock data, and type definitions.
*   `src/hooks/`: Custom React hooks used throughout the application.
*   `public/`: Static assets like images and fonts.

---

This project was bootstrapped with Firebase Studio.
