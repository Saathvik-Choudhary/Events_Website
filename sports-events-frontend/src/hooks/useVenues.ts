import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Venue } from '../types';

// Query keys
export const venueKeys = {
  all: ['venues'] as const,
  lists: () => [...venueKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...venueKeys.lists(), filters] as const,
  details: () => [...venueKeys.all, 'detail'] as const,
  detail: (id: number) => [...venueKeys.details(), id] as const,
  cities: () => [...venueKeys.all, 'cities'] as const,
  byCity: (city: string) => [...venueKeys.all, 'city', city] as const,
};

// Hooks for venues
export const useVenues = (
  page: number = 0,
  size: number = 12,
  sortBy: string = 'name',
  sortDir: 'asc' | 'desc' = 'asc'
) => {
  return useQuery({
    queryKey: venueKeys.list({ page, size, sortBy, sortDir }),
    queryFn: () => apiService.getVenues(page, size, sortBy, sortDir),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useInfiniteVenues = (
  sortBy: string = 'name',
  sortDir: 'asc' | 'desc' = 'asc'
) => {
  return useInfiniteQuery({
    queryKey: venueKeys.list({ sortBy, sortDir, infinite: true }),
    queryFn: ({ pageParam = 0 }) => apiService.getVenues(pageParam, 12, sortBy, sortDir),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000,
  });
};

export const useVenue = (id: number) => {
  return useQuery({
    queryKey: venueKeys.detail(id),
    queryFn: () => apiService.getVenueById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useVenuesByCity = (city: string) => {
  return useQuery({
    queryKey: venueKeys.byCity(city),
    queryFn: () => apiService.getVenuesByCity(city),
    enabled: !!city,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: venueKeys.cities(),
    queryFn: () => apiService.getAllCities(),
    staleTime: 30 * 60 * 1000, // 30 minutes - cities don't change often
  });
};

export const useSearchVenues = (
  searchTerm: string,
  page: number = 0,
  size: number = 12
) => {
  return useQuery({
    queryKey: venueKeys.list({ searchTerm, page, size }),
    queryFn: () => apiService.searchVenues(searchTerm, page, size),
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes for search results
  });
};
