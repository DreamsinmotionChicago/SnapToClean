# Chicago Junk Removal App

## Overview
A mobile-first Next.js application for a junk removal service in Chicago. Features a comic-style design with multi-step questionnaire, photo upload, and instant estimate generation.

## Project Architecture
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom comic-style design
- **Image Processing**: Browser-based HEIC to JPEG conversion and compression
- **API Routes**: Lead submission and photo upload endpoints

## Key Features
- 4-step wizard (Where/When → Items → Access/Volume → Contact)
- HEIC → JPEG conversion + compression in browser
- Instant estimate range calculation
- Photo upload functionality
- Sticky CTA bar for mobile experience
- Responsive design with mobile-first approach

## Environment Configuration
The application uses environment variables from `.env.local`:
- Brand information (name, phone, email, zip)
- Optional analytics (Facebook Pixel, GA4)
- Optional Cloudinary configuration for cloud storage

## Development Setup
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Build**: Standard Next.js build process
- **Dependencies**: All managed via npm

## Deployment
Configured for autoscale deployment:
- Build command: `npm run build`
- Start command: `npm start`
- Suitable for serverless environments

## Recent Changes (2025-09-25)
- Imported from GitHub repository
- Installed dependencies and resolved TypeScript issues
- Created environment configuration
- Set up Replit workflow on port 5000
- Configured deployment settings
- Application is fully functional in Replit environment

## User Preferences
- Comic-style design aesthetic maintained
- Mobile-first responsive approach
- Clear pricing transparency
- Chicago-area service focus