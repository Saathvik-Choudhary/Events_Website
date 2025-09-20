import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
  withEvents: () => [...categoryKeys.all, 'with-events'] as const,
};

// Hooks for categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => apiService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategoriesWithActiveEvents = () => {
  return useQuery({
    queryKey: categoryKeys.withEvents(),
    queryFn: () => apiService.getCategoriesWithActiveEvents(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => apiService.getCategoryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
