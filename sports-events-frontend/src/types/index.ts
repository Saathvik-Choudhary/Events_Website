// Event Types
export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  maxParticipants?: number;
  price?: number;
  imageUrl?: string;
  bannerUrl?: string;
  eventType: EventType;
  difficultyLevel?: DifficultyLevel;
  status: EventStatus;
  rules?: string;
  prizeInfo?: string;
  contactInfo?: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  venue: Venue;
}

export enum EventType {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  FOOTBALL = 'FOOTBALL',
  BASKETBALL = 'BASKETBALL',
  TENNIS = 'TENNIS',
  CRICKET = 'CRICKET',
  VOLLEYBALL = 'VOLLEYBALL',
  BADMINTON = 'BADMINTON',
  TABLE_TENNIS = 'TABLE_TENNIS',
  ATHLETICS = 'ATHLETICS',
  MARATHON = 'MARATHON',
  TRIATHLON = 'TRIATHLON',
  OTHER = 'OTHER'
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

// Category Types
export interface Category {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Venue Types
export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  imageUrl?: string;
  description?: string;
  amenities?: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

// Booking Types
export interface Booking {
  id: number;
  bookingDate: string;
  totalAmount?: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  paymentReference?: string;
  notes?: string;
  emergencyContact?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  event: Event;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED'
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  ATTENDED = 'ATTENDED',
  NO_SHOW = 'NO_SHOW'
}

// API Response Types
export interface ApiResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Filter Types
export interface EventFilters {
  category?: number;
  city?: string;
  eventType?: EventType;
  difficultyLevel?: DifficultyLevel;
  priceRange?: [number, number];
  dateRange?: [string, string];
  searchTerm?: string;
}

// Component Props Types
export interface EventCardProps {
  event: Event;
  onBook?: (eventId: number) => void;
  onViewDetails?: (eventId: number) => void;
}

export interface EventListProps {
  events: Event[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface BookingFormProps {
  event: Event;
  onSubmit: (bookingData: BookingFormData) => void;
  onCancel: () => void;
}

export interface BookingFormData {
  userId: number;
  notes?: string;
  emergencyContact?: string;
}

// Utility Types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

// Theme Types
export interface Theme {
  palette: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
  typography: {
    fontFamily: string;
    h1: any;
    h2: any;
    h3: any;
    h4: any;
    h5: any;
    h6: any;
    body1: any;
    body2: any;
  };
  spacing: (value: number) => number;
}
