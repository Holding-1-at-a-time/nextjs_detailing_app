#!/bin/bash

# Auto Detailing App - Convex Setup Script
echo "Setting up Convex for Auto Detailing App..."

# Check if Convex CLI is installed
if ! command -v npx convex &> /dev/null; then
    echo "Installing Convex CLI..."
    npm install -g convex
fi

# Initialize Convex if not already done
if [ ! -f "convex.json" ]; then
    echo "Initializing Convex..."
    npx convex dev --once
else
    echo "Convex already initialized"
fi

# Deploy schema and functions
echo "Deploying Convex functions..."
npx convex deploy

echo "Convex setup complete!"
echo "Don't forget to:"
echo "1. Add your NEXT_PUBLIC_CONVEX_URL to .env.local"
echo "2. Run 'npx convex dev' for development"
echo "3. Run 'npx convex deploy' for production"
