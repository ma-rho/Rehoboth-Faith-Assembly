# Rehoboth Faith Assembly - Church Website

This is a Next.js starter project for the Rehoboth Faith Assembly, built using Firebase Studio. It serves as a modern, engaging online hub for the church community.

## Key Features

This application is designed to be a central point of contact for members and visitors, offering the following functionalities:

*   **Sermon Archive:**
    *   An easy-to-use admin form for uploading new sermon recordings.
    *   Automatically extracts YouTube video IDs from full URLs to simplify the upload process.
    *   A public-facing page to watch and browse past sermons.

*   **Online Giving:**
    *   A secure and seamless donation experience powered by an integrated Stripe Checkout.
    *   Users can select preset donation amounts or enter a custom amount.
    *   The system handles payment processing and provides immediate feedback on transaction status (success or cancellation).

*   **Community Engagement:**
    *   **About Us:** Shares the mission and vision of the church to build a Christ-centered community.
    *   **Get Involved:** Encourages users to connect with the church through groups and serving opportunities.
    *   **Contact Page:** Provides a clear way for visitors to get in touch.

*   **Modern Design & User Experience:**
    *   Built with a mobile-first, responsive design for an optimal experience on any device.
    *   Features a clean, intuitive layout with tasteful animations to enhance user interaction.

## Getting Started

To get started with this project locally:

1.  Clone the repository.
2.  Install dependencies:
    '''bash
    npm install
    '''
3.  Set up your local environment variables by creating a `.env.local` file in the root of the project. This is required for the Stripe integration.
    '''
    # Stripe API Keys
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    '''
4.  Run the development server:
    '''bash
    npm run dev
    '''

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
