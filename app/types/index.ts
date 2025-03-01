export interface Hotel {
  id: number;
  name: string;
  description?: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities?: string[];
  rooms?: Room[];
}

export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

export interface Booking {
  id: number;
  hotelId: number;
  roomId: number;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: string[];
} 