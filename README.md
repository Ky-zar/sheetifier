# Sheetifier

![Sheetifier Screenshot](https://placehold.co/800x400.png?text=Sheetifier+App)

Instantly transform your raw spreadsheets into beautifully styled, professional PDFs. Sheetifier leverages AI to automatically format your data, making it presentation-ready in seconds.

## ✨ Core Features

-   **Seamless File Upload**: Supports both Excel (`.xlsx`) and CSV (`.csv`) formats.
-   **AI-Powered Styling**: Let our AI automatically apply a clean, modern, and accessible style to your tables, including alternating row colors and optimal column widths.
-   **PDF Export**: Download your styled table as a print-ready, landscape A4 PDF, perfect for reports and presentations.
-   **Project History**: Your recent projects are automatically saved to your browser's local storage for quick access.
-   **Responsive Design**: A clean, intuitive interface that works beautifully on any device.

## 🚀 Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **AI**: [Google Gemini via Genkit](https://firebase.google.com/docs/genkit)
-   **UI**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   An API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    GEMINI_API_KEY="your_api_key_here"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🌐 Deployment

This application is optimized for deployment on platforms like [Vercel](https://vercel.com/) or [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

When deploying, ensure you set the `GEMINI_API_KEY` as an environment variable in your hosting provider's project settings. **Do not** commit your `.env` file to your repository.
