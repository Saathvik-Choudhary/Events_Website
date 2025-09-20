#!/bin/bash

# Deployment script for Sports Events Platform
# This script deploys the application using Docker containers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
REPOSITORY=""
TAG="latest"
ENVIRONMENT="production"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -r, --repository REPO    GitHub repository (e.g., username/sports-events)"
    echo "  -t, --tag TAG           Docker image tag (default: latest)"
    echo "  -e, --env ENV           Environment (production|staging) (default: production)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --repository username/sports-events"
    echo "  $0 -r username/sports-events -t v1.0.0 -e staging"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -r|--repository)
            REPOSITORY="$2"
            shift 2
            ;;
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -e|--env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate required parameters
if [ -z "$REPOSITORY" ]; then
    print_error "Repository is required"
    show_usage
    exit 1
fi

print_status "Starting deployment for repository: $REPOSITORY"
print_status "Tag: $TAG"
print_status "Environment: $ENVIRONMENT"

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker is not running"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed"
    exit 1
fi

# Login to GitHub Container Registry
print_status "Logging in to GitHub Container Registry..."
if [ -z "$GITHUB_TOKEN" ]; then
    print_warning "GITHUB_TOKEN not set. You may need to login manually:"
    print_warning "echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
else
    echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin
    print_success "Logged in to GitHub Container Registry"
fi

# Pull the latest images
print_status "Pulling latest images..."
docker pull "ghcr.io/$REPOSITORY/frontend:$TAG" || print_warning "Failed to pull frontend image"
docker pull "ghcr.io/$REPOSITORY/backend:$TAG" || print_warning "Failed to pull backend image"

# Create environment file
print_status "Creating environment configuration..."
cat > .env << EOF
GITHUB_REPOSITORY=$REPOSITORY
IMAGE_TAG=$TAG
ENVIRONMENT=$ENVIRONMENT
EOF

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans || true

# Start the application
print_status "Starting the application..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
print_status "Waiting for services to be healthy..."
sleep 30

# Check service health
print_status "Checking service health..."

# Check frontend
if curl -f http://localhost:80 > /dev/null 2>&1; then
    print_success "Frontend is running at http://localhost:80"
else
    print_error "Frontend is not responding"
fi

# Check backend
if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    print_success "Backend is running at http://localhost:8080"
else
    print_error "Backend is not responding"
fi

# Show running containers
print_status "Running containers:"
docker-compose -f docker-compose.prod.yml ps

print_success "Deployment completed!"
print_status "Frontend: http://localhost:80"
print_status "Backend API: http://localhost:8080"
print_status "Backend Health: http://localhost:8080/actuator/health"
