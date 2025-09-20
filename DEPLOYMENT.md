# 🚀 Deployment Guide - Sports Events Platform

This guide covers deploying the Sports Events Platform using Docker containers and GitHub Actions.

## 📋 Prerequisites

- Docker and Docker Compose installed
- GitHub account with repository access
- GitHub Container Registry access (automatically available)

## 🎯 Deployment Options

### 1. GitHub Pages (Static Frontend Only)

The frontend is automatically deployed to GitHub Pages when you push to the main branch.

**Setup Steps:**
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on every push to main

**Access:** `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

### 2. Docker Container Deployment

#### Automated Deployment (Recommended)

The GitHub Actions workflow automatically builds and pushes Docker images to GitHub Container Registry.

**What happens automatically:**
- ✅ Frontend Docker image built and pushed
- ✅ Backend Docker image built and pushed  
- ✅ Images tagged with branch names and commit SHAs
- ✅ Production docker-compose file generated

#### Manual Deployment

Use the provided deployment script:

```bash
# Basic deployment
./deploy-container.sh --repository YOUR_USERNAME/YOUR_REPOSITORY

# With specific tag
./deploy-container.sh -r YOUR_USERNAME/YOUR_REPOSITORY -t v1.0.0

# For staging environment
./deploy-container.sh -r YOUR_USERNAME/YOUR_REPOSITORY -e staging
```

#### Manual Docker Compose Deployment

```bash
# Set your repository name
export GITHUB_REPOSITORY="YOUR_USERNAME/YOUR_REPOSITORY"

# Pull and run containers
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local deployment:

```env
GITHUB_REPOSITORY=YOUR_USERNAME/YOUR_REPOSITORY
IMAGE_TAG=latest
ENVIRONMENT=production
```

### GitHub Secrets (for automated deployment)

Set these in your repository settings under "Secrets and variables":

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- `GITHUB_ACTOR` - Automatically provided by GitHub Actions

## 📊 Monitoring

### Health Checks

The application includes health checks for monitoring:

- **Frontend Health:** `http://localhost:80`
- **Backend Health:** `http://localhost:8080/actuator/health`

### Logs

View container logs:

```bash
# All services
docker-compose -f docker-compose.prod.yml logs

# Specific service
docker-compose -f docker-compose.prod.yml logs frontend
docker-compose -f docker-compose.prod.yml logs backend
```

## 🔄 CI/CD Pipeline

### Workflow Triggers

- **Push to main:** Deploys to GitHub Pages and builds Docker images
- **Pull requests:** Builds Docker images for testing
- **Tags (v*):** Creates versioned releases

### Build Process

1. **Frontend Build:**
   - Installs dependencies
   - Builds React application
   - Creates optimized production build
   - Deploys to GitHub Pages

2. **Docker Build:**
   - Builds frontend Docker image
   - Builds backend Docker image
   - Pushes to GitHub Container Registry
   - Creates multi-platform images (AMD64, ARM64)

## 🐳 Container Images

Images are available at:
- **Frontend:** `ghcr.io/YOUR_USERNAME/YOUR_REPOSITORY/frontend:latest`
- **Backend:** `ghcr.io/YOUR_USERNAME/YOUR_REPOSITORY/backend:latest`

### Image Tags

- `latest` - Latest main branch build
- `main-abc1234` - Specific commit builds
- `v1.0.0` - Version tags
- `pr-123` - Pull request builds

## 🔐 Security

### Container Security

- Images run as non-root users
- Multi-stage builds minimize attack surface
- Health checks ensure service availability
- Regular base image updates

### Access Control

- GitHub Container Registry requires authentication
- Images are private by default
- Can be made public in repository settings

## 🚨 Troubleshooting

### Common Issues

1. **Container won't start:**
   ```bash
   docker-compose -f docker-compose.prod.yml logs
   ```

2. **Images not found:**
   - Ensure repository name is correct
   - Check if images exist in GitHub Container Registry
   - Verify authentication

3. **Port conflicts:**
   - Change ports in docker-compose.prod.yml
   - Stop conflicting services

4. **Health check failures:**
   - Wait longer for services to start
   - Check if ports are accessible
   - Verify environment variables

### Debug Commands

```bash
# Check running containers
docker ps

# Inspect container
docker inspect CONTAINER_ID

# Execute commands in container
docker exec -it CONTAINER_ID /bin/bash

# View resource usage
docker stats
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale frontend
docker-compose -f docker-compose.prod.yml up -d --scale frontend=3

# Scale backend
docker-compose -f docker-compose.prod.yml up -d --scale backend=2
```

### Load Balancing

Use the nginx proxy profile:

```bash
docker-compose -f docker-compose.prod.yml --profile with-proxy up -d
```

## 🔄 Updates

### Automatic Updates

- GitHub Actions automatically rebuilds on code changes
- New images are tagged and pushed automatically
- Manual deployment pulls latest images

### Manual Updates

```bash
# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Restart with new images
docker-compose -f docker-compose.prod.yml up -d
```

## 📞 Support

For deployment issues:
1. Check the GitHub Actions logs
2. Review container logs
3. Verify environment configuration
4. Check network connectivity

---

**🎉 Your Sports Events Platform is now ready for automated deployment!**
