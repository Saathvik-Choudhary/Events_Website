# Sports Events Platform

A modern, high-performance sports event booking platform built with React and TypeScript, designed for single-container deployment.

## Features

- 🏃‍♂️ **Sports Event Discovery**: Browse and search through various sports events
- 📍 **Venue Management**: Explore venues across different cities
- 🏆 **Category-based Filtering**: Filter events by sports categories
- 📅 **Event Booking**: Easy registration and booking system
- 📱 **Responsive Design**: Optimized for all devices
- ⚡ **High Performance**: Optimized for fast loading times
- 🐳 **Single Container**: Deployable in a single React container

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for modern UI components
- **React Query** for data fetching and caching
- **React Router** for navigation
- **Axios** for API calls

### Deployment
- **Docker** for containerization
- **Nginx** for serving static files
- **Mock Data** for standalone deployment

## Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sports-events-platform
   ```

2. **Install dependencies**
   ```bash
   cd sports-events-frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Docker Deployment (Single Container)

1. **Build and run with Docker**
   ```bash
   # Build the Docker image
   docker build -t sports-events-app ./sports-events-frontend
   
   # Run the container
   docker run -p 3000:80 sports-events-app
   ```

2. **Using Docker Compose**
   ```bash
   # Run the application
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   
   # Stop the application
   docker-compose down
   ```

3. **Access the application**
   Navigate to `http://localhost:3000`

### Production Deployment

For production deployment with a reverse proxy:

```bash
# Run with production profile
docker-compose --profile production up -d
```

This will start:
- Sports Events App on port 3000
- Nginx reverse proxy on port 80

Access the application at `http://localhost`

## Configuration

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `REACT_APP_USE_MOCK_DATA`: Set to `true` to use mock data (default in container)
- `REACT_APP_API_URL`: Backend API URL (optional, uses mock data if not set)

### Mock Data

The application includes comprehensive mock data for:
- Sports events (Running, Cycling, Swimming, Football, Basketball, Tennis)
- Venues across different cities
- Categories and event types
- User bookings

## Project Structure

```
sports-events-platform/
├── sports-events-frontend/          # React frontend application
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Page components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API services and mock data
│   │   ├── types/                   # TypeScript type definitions
│   │   └── utils/                   # Utility functions
│   ├── Dockerfile                   # Docker configuration
│   ├── nginx.conf                   # Nginx configuration
│   └── package.json
├── docker-compose.yml               # Docker Compose configuration
├── nginx-proxy.conf                 # Production nginx proxy config
└── README.md
```

## Performance Optimizations

### Frontend Optimizations
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized images with proper sizing
- **Caching**: React Query for intelligent data caching
- **Bundle Optimization**: Tree shaking and minification
- **CDN Ready**: Static assets optimized for CDN delivery

### Docker Optimizations
- **Multi-stage Build**: Optimized Docker image size
- **Nginx Configuration**: Gzip compression and caching headers
- **Health Checks**: Container health monitoring
- **Security Headers**: Proper security headers configuration

## API Integration

The application is designed to work with a Spring Boot backend but includes mock data for standalone deployment. To connect to a real backend:

1. Set `REACT_APP_API_URL` environment variable
2. Set `REACT_APP_USE_MOCK_DATA=false`
3. Ensure CORS is configured on the backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for sports enthusiasts**
