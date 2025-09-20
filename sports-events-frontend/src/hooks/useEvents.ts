import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { EventType } from '../types';

// Query keys
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
  upcoming: () => [...eventKeys.all, 'upcoming'] as const,
  available: () => [...eventKeys.all, 'available'] as const,
};

// Hooks for events
export const useEvents = (
  page: number = 0,
  size: number = 12,
  sortBy: string = 'eventDate',
  sortDir: 'asc' | 'desc' = 'asc'
) => {
  return useQuery({
    queryKey: eventKeys.list({ page, size, sortBy, sortDir }),
    queryFn: () => apiService.getEvents(page, size, sortBy, sortDir),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInfiniteEvents = (
  sortBy: string = 'eventDate',
  sortDir: 'asc' | 'desc' = 'asc'
) => {
  return useInfiniteQuery({
    queryKey: eventKeys.list({ sortBy, sortDir, infinite: true }),
    queryFn: ({ pageParam = 0 }) => apiService.getEvents(pageParam, 12, sortBy, sortDir),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEvent = (id: number) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => apiService.getEventById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: eventKeys.upcoming(),
    queryFn: () => apiService.getUpcomingEvents(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEventsByCategory = (
  categoryId: number,
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: eventKeys.list({ categoryId, page, size }),
    queryFn: () => apiService.getEventsByCategory(categoryId, page, size),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEventsByCity = (
  city: string,
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: eventKeys.list({ city, page, size }),
    queryFn: () => apiService.getEventsByCity(city, page, size),
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEventsByType = (
  eventType: EventType,
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: eventKeys.list({ eventType, page, size }),
    queryFn: () => apiService.getEventsByType(eventType, page, size),
    enabled: !!eventType,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchEvents = (
  searchTerm: string,
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: eventKeys.list({ searchTerm, page, size }),
    queryFn: () => apiService.searchEvents(searchTerm, page, size),
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

export const useEventsWithAvailableSlots = (
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: eventKeys.available(),
    queryFn: () => apiService.getEventsWithAvailableSlots(page, size),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEventAvailability = (id: number) => {
  return useQuery({
    queryKey: [...eventKeys.detail(id), 'availability'],
    queryFn: () => apiService.checkEventAvailability(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useRegistrationStatus = (id: number) => {
  return useQuery({
    queryKey: [...eventKeys.detail(id), 'registration'],
    queryFn: () => apiService.checkRegistrationStatus(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Booking hooks
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, eventId, notes, emergencyContact }: {
      userId: number;
      eventId: number;
      notes?: string;
      emergencyContact?: string;
    }) => apiService.createBooking(userId, eventId, notes, emergencyContact),
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(data.event.id) });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useBookingsByUser = (
  userId: number,
  page: number = 0,
  size: number = 10
) => {
  return useQuery({
    queryKey: ['bookings', 'user', userId, page, size],
    queryFn: () => apiService.getBookingsByUser(userId, page, size),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBookingsByEvent = (eventId: number) => {
  return useQuery({
    queryKey: ['bookings', 'event', eventId],
    queryFn: () => apiService.getBookingsByEvent(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingBookingsByUser = (userId: number) => {
  return useQuery({
    queryKey: ['bookings', 'user', userId, 'upcoming'],
    queryFn: () => apiService.getUpcomingBookingsByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBookingByUserAndEvent = (userId: number, eventId: number) => {
  return useQuery({
    queryKey: ['bookings', 'user', userId, 'event', eventId],
    queryFn: () => apiService.getBookingByUserAndEvent(userId, eventId),
    enabled: !!userId && !!eventId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: number; status: string }) =>
      apiService.updateBookingStatus(bookingId, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(data.event.id) });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingId: number) => apiService.cancelBooking(bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(data.event.id) });
    },
  });
};
