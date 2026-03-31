export type EventCategory =
  | "strategy"
  | "family"
  | "party"
  | "roleplay"
  | "cooperative"
  | "card"
  | "dice"
  | "dungeon";

export type EventStatus = "upcoming" | "ongoing" | "full" | "cancelled" | "completed";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "waitlist";

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  maxPlayers: number;
  minPlayers: number;
  currentPlayers: number;
  price: number; // in cents
  imageUrl?: string;
  hostName: string;
  hostAvatar?: string;
  gameName: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: BookingStatus;
  numberOfSeats: number;
  totalPrice: number; // in cents
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  event?: Event;
}

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  favoriteCategories: EventCategory[];
  bookings?: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface EventFilters {
  category?: EventCategory;
  status?: EventStatus;
  date?: Date;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: number;
}
