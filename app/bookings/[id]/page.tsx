import { use } from 'react';
import BookingClient from './BookingClient';
import { Hotel } from '@/app/types';

// Mock data for hotels (you can import this from a shared data file)
const hotelsData: Hotel[] = [
  {
    id: 1,
    name: 'Sofitel Legend Metropole Hanoi',
    description: 'Historic 5-star luxury hotel in the heart of Hanoi, featuring French colonial architecture, world-class dining, and timeless elegance.',
    location: 'Hoan Kiem District, Hanoi',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200',
    amenities: [
      'French Restaurant',
      'Spa',
      'Historic Wing',
      'Le Club Bar'
    ],
    rooms: [
      {
        id: 1,
        name: 'Premium Room',
        description: 'Luxurious 45m² room with colonial charm',
        price: 350,
        capacity: 2,
        amenities: ['French colonial decor', 'Premium Sofitel MyBed™', 'Hermès amenities'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200']
      }
    ]
  }
  // ... you can add more hotels here
];

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const hotelId = parseInt(resolvedParams.id);
  const hotel = hotelsData.find(h => h.id === hotelId);

  if (!hotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
        <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <BookingClient hotel={hotel} />;
} 