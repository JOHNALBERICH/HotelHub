export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  rooms: Room[];
} 