#!/bin/bash

# Sports Events Platform Deployment Script

set -e

echo "🚀 Starting Sports Events Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Parse command line arguments
ENVIRONMENT="development"
PROFILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --profile)
            PROFILE="--profile $2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [--env development|production] [--profile production]"
            echo ""
            echo "Options:"
            echo "  --env        Set environment (default: development)"
            echo "  --profile    Set Docker Compose profile (default: none)"
            echo "  -h, --help   Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option $1"
            exit 1
            ;;
    esac
done

print_status "Environment: $ENVIRONMENT"
if [ ! -z "$PROFILE" ]; then
    print_status "Profile: $PROFILE"
fi

# Navigate to the project directory
cd "$(dirname "$0")"

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans

# Remove old images (optional)
if [ "$ENVIRONMENT" = "production" ]; then
    print_warning "Removing old images for clean build..."
    docker-compose build --no-cache
fi

# Build and start containers
print_status "Building and starting containers..."
if [ ! -z "$PROFILE" ]; then
    docker-compose $PROFILE up -d --build
else
    docker-compose up -d --build
fi

# Wait for containers to be ready
print_status "Waiting for containers to be ready..."
sleep 10

# Check container health
print_status "Checking container health..."
if docker-compose ps | grep -q "Up (healthy)"; then
    print_status "✅ Containers are healthy!"
else
    print_warning "⚠️  Some containers may not be fully ready yet"
fi

# Display container status
print_status "Container Status:"
docker-compose ps

# Display access information
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📱 Application Access:"
if [ ! -z "$PROFILE" ] && [[ "$PROFILE" == *"production"* ]]; then
    echo "   Main Application: http://localhost"
    echo "   Direct Access: http://localhost:3000"
else
    echo "   Application: http://localhost:3000"
fi
echo ""
echo "🔧 Management Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop: docker-compose down"
echo "   Restart: docker-compose restart"
echo ""
echo "📊 Health Check:"
echo "   http://localhost/health (production)"
echo "   http://localhost:3000/health (development)"
echo ""

print_status "Deployment completed! 🚀"
