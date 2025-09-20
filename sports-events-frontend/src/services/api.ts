import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Event, Category, Venue, Booking, ApiResponse, EventFilters, EventType } from '../types';
import { 
  mockEvents, 
  mockCategories, 
  mockVenues, 
  mockBookings, 
  createMockApiResponse, 
  delay 
} from './mockData';

class ApiService {
  private api: AxiosInstance;
  private useMockData: boolean;

  constructor() {
    // Use mock data for single-container deployment
    this.useMockData = process.env.NODE_ENV === 'development' || process.env.REACT_APP_USE_MOCK_DATA === 'true';
    
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Event API methods
  async getEvents(
    page: number = 0,
    size: number = 12,
    sortBy: string = 'eventDate',
    sortDir: 'asc' | 'desc' = 'asc'
  ): Promise<ApiResponse<Event>> {
    if (this.useMockData) {
      await delay(500); // Simulate API delay
      let sortedEvents = [...mockEvents];
      
      // Simple sorting logic
      if (sortBy === 'eventDate') {
        sortedEvents.sort((a, b) => {
          const dateA = new Date(a.eventDate).getTime();
          const dateB = new Date(b.eventDate).getTime();
          return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
        });
      }
      
      return createMockApiResponse(sortedEvents, page, size);
    }
    
    const response = await this.api.get<ApiResponse<Event>>('/events', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  }

  async getEventById(id: number): Promise<Event> {
    if (this.useMockData) {
      await delay(300);
      const event = mockEvents.find(e => e.id === id);
      if (!event) throw new Error('Event not found');
      return event;
    }
    
    const response = await this.api.get<Event>(`/events/${id}`);
    return response.data;
  }

  async getEventsByCategory(
    categoryId: number,
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Event>> {
    const response = await this.api.get<ApiResponse<Event>>(`/events/category/${categoryId}`, {
      params: { page, size },
    });
    return response.data;
  }

  async getEventsByCity(
    city: string,
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Event>> {
    const response = await this.api.get<ApiResponse<Event>>(`/events/city/${encodeURIComponent(city)}`, {
      params: { page, size },
    });
    return response.data;
  }

  async getEventsByType(
    eventType: EventType,
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Event>> {
    const response = await this.api.get<ApiResponse<Event>>(`/events/type/${eventType}`, {
      params: { page, size },
    });
    return response.data;
  }

  async searchEvents(
    searchTerm: string,
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Event>> {
    const response = await this.api.get<ApiResponse<Event>>('/events/search', {
      params: { q: searchTerm, page, size },
    });
    return response.data;
  }

  async getEventsWithAvailableSlots(
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Event>> {
    const response = await this.api.get<ApiResponse<Event>>('/events/available', {
      params: { page, size },
    });
    return response.data;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const response = await this.api.get<Event[]>('/events/upcoming');
    return response.data;
  }

  async checkEventAvailability(id: number): Promise<boolean> {
    const response = await this.api.get<boolean>(`/events/${id}/availability`);
    return response.data;
  }

  async checkRegistrationStatus(id: number): Promise<boolean> {
    const response = await this.api.get<boolean>(`/events/${id}/registration-status`);
    return response.data;
  }

  // Category API methods
  async getCategories(): Promise<Category[]> {
    if (this.useMockData) {
      await delay(200);
      return mockCategories;
    }
    
    const response = await this.api.get<Category[]>('/categories');
    return response.data;
  }

  async getCategoriesWithActiveEvents(): Promise<Category[]> {
    if (this.useMockData) {
      await delay(200);
      return mockCategories;
    }
    
    const response = await this.api.get<Category[]>('/categories/with-events');
    return response.data;
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await this.api.get<Category>(`/categories/${id}`);
    return response.data;
  }

  // Venue API methods
  async getVenues(
    page: number = 0,
    size: number = 12,
    sortBy: string = 'name',
    sortDir: 'asc' | 'desc' = 'asc'
  ): Promise<ApiResponse<Venue>> {
    const response = await this.api.get<ApiResponse<Venue>>('/venues', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  }

  async getVenuesByCity(city: string): Promise<Venue[]> {
    const response = await this.api.get<Venue[]>(`/venues/city/${encodeURIComponent(city)}`);
    return response.data;
  }

  async getAllCities(): Promise<string[]> {
    if (this.useMockData) {
      await delay(200);
      return Array.from(new Set(mockVenues.map(v => v.city)));
    }
    
    const response = await this.api.get<string[]>('/venues/cities');
    return response.data;
  }

  async getVenueById(id: number): Promise<Venue> {
    const response = await this.api.get<Venue>(`/venues/${id}`);
    return response.data;
  }

  async searchVenues(
    searchTerm: string,
    page: number = 0,
    size: number = 12
  ): Promise<ApiResponse<Venue>> {
    const response = await this.api.get<ApiResponse<Venue>>('/venues/search', {
      params: { q: searchTerm, page, size },
    });
    return response.data;
  }

  // Booking API methods
  async createBooking(
    userId: number,
    eventId: number,
    notes?: string,
    emergencyContact?: string
  ): Promise<Booking> {
    const response = await this.api.post<Booking>('/bookings', null, {
      params: { userId, eventId, notes, emergencyContact },
    });
    return response.data;
  }

  async getBookingsByUser(
    userId: number,
    page: number = 0,
    size: number = 10
  ): Promise<ApiResponse<Booking>> {
    const response = await this.api.get<ApiResponse<Booking>>(`/bookings/user/${userId}`, {
      params: { page, size },
    });
    return response.data;
  }

  async getBookingsByEvent(eventId: number): Promise<Booking[]> {
    const response = await this.api.get<Booking[]>(`/bookings/event/${eventId}`);
    return response.data;
  }

  async getUpcomingBookingsByUser(userId: number): Promise<Booking[]> {
    const response = await this.api.get<Booking[]>(`/bookings/user/${userId}/upcoming`);
    return response.data;
  }

  async getBookingByUserAndEvent(userId: number, eventId: number): Promise<Booking | null> {
    try {
      const response = await this.api.get<Booking>(`/bookings/user/${userId}/event/${eventId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async updateBookingStatus(
    bookingId: number,
    status: string
  ): Promise<Booking> {
    const response = await this.api.put<Booking>(`/bookings/${bookingId}/status`, null, {
      params: { status },
    });
    return response.data;
  }

  async cancelBooking(bookingId: number): Promise<Booking> {
    const response = await this.api.put<Booking>(`/bookings/${bookingId}/cancel`);
    return response.data;
  }

  // Utility methods
  async getEventStats(): Promise<number> {
    const response = await this.api.get<number>('/events/stats');
    return response.data;
  }

  async getBookingStats(): Promise<number> {
    const response = await this.api.get<number>('/bookings/stats');
    return response.data;
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
