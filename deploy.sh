#!/bin/bash

# Tax Deed CRM - Quick Deployment Script
# Usage: ./deploy.sh [vercel|railway|netlify]

set -e

echo "🚀 Tax Deed CRM Deployment Script"
echo "=================================="

# Check if deployment target is provided
PLATFORM=${1:-vercel}
echo "📦 Deploying to: $PLATFORM"

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Add npm global bin to PATH
export PATH=$PATH:/home/ubuntu/.npm-global/bin

# Verify build
echo "🔨 Building application..."
npm run build

# Deploy based on platform
case $PLATFORM in
  "vercel")
    echo "🌐 Deploying to Vercel..."
    echo "⚠️  You need a Vercel token. Get it from: https://vercel.com/account/tokens"
    echo "💡 Run: vercel login"
    echo "💡 Then: vercel --prod --confirm --name tax-deed-crm"
    ;;
  
  "railway")
    echo "🚂 Deploying to Railway..."
    if ! command -v railway &> /dev/null; then
      echo "📦 Installing Railway CLI..."
      npm install -g @railway/cli
    fi
    echo "💡 Run: railway login"
    echo "💡 Then: railway init && railway up"
    ;;
  
  "netlify")
    echo "🌊 Deploying to Netlify..."
    if ! command -v netlify &> /dev/null; then
      echo "📦 Installing Netlify CLI..."
      npm install -g netlify-cli
    fi
    echo "💡 Run: netlify login"
    echo "💡 Then: netlify deploy --prod --dir=.next"
    ;;
  
  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "💡 Supported platforms: vercel, railway, netlify"
    exit 1
    ;;
esac

echo ""
echo "✅ Deployment preparation complete!"
echo "📋 Next steps:"
echo "   1. Authenticate with $PLATFORM"
echo "   2. Set up PostgreSQL database"
echo "   3. Configure DATABASE_URL environment variable"
echo "   4. Test the live application"
echo ""
echo "📚 See DEPLOYMENT_INFO.md for detailed instructions"
echo "📊 See BUSINESS_READINESS.md for next development phases"
