import { use } from 'react';
import HotelDetailClient from './HotelDetailClient';
import { Hotel } from '@/app/types';

// Mock data for hotels
const hotelsData = [
  {
    id: 1,
    name: 'Sofitel Legend Metropole Hanoi',
    description: 'Historic 5-star luxury hotel in the heart of Hanoi, featuring French colonial architecture, world-class dining, and timeless elegance. Experience the blend of Vietnamese hospitality and French art de vivre.',
    location: 'Hoan Kiem District, Hanoi',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200',
    amenities: [
      'French Restaurant',
      'Spa',
      'Historic Wing',
      'Le Club Bar',
      'Butler Service',
      'Swimming Pool',
      'Fitness Center',
      'Club Metropole Access'
    ],
    rooms: [
      {
        id: 1,
        name: 'Premium Room',
        description: 'Luxurious 45m² room in the historic wing with colonial charm, featuring premium Sofitel MyBed™ and Hermès amenities',
        price: 350,
        capacity: 2,
        amenities: ['French colonial decor', 'Premium Sofitel MyBed™', 'Hermès bath amenities', 'Club Metropole access', 'Butler service'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Grand Suite Opera',
        description: 'Elegant 75m² suite with Opera Wing views, separate living room, and exclusive Club Metropole privileges',
        price: 550,
        capacity: 3,
        amenities: ['Opera House view', 'Living room', 'Club Lounge access', 'Premium bar setup', 'Personal butler'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      },
      {
        id: 3,
        name: 'Legendary Suite',
        description: 'Historic 100m² suite featuring colonial grandeur, private terrace, and personalized luxury services',
        price: 850,
        capacity: 4,
        amenities: ['Historic decor', 'Private terrace', '24/7 butler', 'Dining room', 'Luxury spa access'],
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200']
      }
    ]
  },
  {
    id: 2,
    name: 'InterContinental Danang Sun Peninsula',
    description: 'Luxury beach resort nestled in the hills of Monkey Mountain, offering stunning views of the East Sea. Experience world-class dining at La Maison 1888 and relaxation at HARNN Heritage Spa.',
    location: 'Son Tra Peninsula, Da Nang',
    price: 420,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
    amenities: [
      'Private Beach',
      'Infinity Pool',
      'La Maison 1888',
      'HARNN Heritage Spa',
      'Tennis Courts',
      'Kids Club',
      'Helipad',
      'Water Sports'
    ],
    rooms: [
      {
        id: 1,
        name: 'Ocean View Room',
        description: 'Luxurious 70m² room with panoramic ocean views and traditional Vietnamese design elements',
        price: 420,
        capacity: 2,
        amenities: ['Ocean view', 'Private balcony', 'Luxury bathroom', 'Club access', 'Evening cocktails'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Ocean Pool Villa',
        description: 'Luxurious 150m² villa with private infinity pool and direct beach access',
        price: 880,
        capacity: 4,
        amenities: ['Private infinity pool', 'Direct beach access', 'Outdoor dining area', 'Personal butler', 'Luxury spa bathroom'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      },
      {
        id: 3,
        name: 'Peninsula Suite',
        description: 'Ultimate 250m² luxury suite with panoramic views and exclusive amenities',
        price: 1200,
        capacity: 6,
        amenities: ['Panoramic views', 'Private pool', 'Chef service', 'Helicopter transfer', 'Spa room'],
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200']
      }
    ]
  },
  {
    id: 3,
    name: 'Park Hyatt Saigon',
    description: 'Elegant 5-star hotel in the heart of Saigon, blending colonial charm with modern luxury. Features world-class dining options and the tranquil Xuan Spa.',
    location: 'District 1, Ho Chi Minh City',
    price: 380,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    amenities: [
      'Opera Restaurant',
      'Park Lounge',
      'Xuan Spa',
      'Outdoor Pool',
      'Fitness Center',
      'Business Center',
      'Afternoon Tea',
      'Concierge'
    ],
    rooms: [
      {
        id: 1,
        name: 'Park Room',
        description: 'Sophisticated 45m² room with city views and modern amenities',
        price: 380,
        capacity: 2,
        amenities: ['City view', 'Marble bathroom', 'Premium bedding', 'Work desk', 'Evening turndown'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Park Suite',
        description: 'Sophisticated 70m² suite with city views and butler service',
        price: 580,
        capacity: 3,
        amenities: ['Italian marble bathroom', 'Walk-in closet', 'Butler service', 'Luxury spa access', 'Evening canapes'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      },
      {
        id: 3,
        name: 'Presidential Suite',
        description: 'Luxurious 120m² suite with premium amenities and personalized service',
        price: 980,
        capacity: 4,
        amenities: ['Living room', 'Dining room', 'Butler kitchen', 'Private spa', 'VIP services'],
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200']
      }
    ]
  }
];

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const hotelId = parseInt(resolvedParams.id);
  const hotelData = hotelsData.find(hotel => hotel.id === hotelId) || hotelsData[0];

  return <HotelDetailClient hotel={hotelData} />;
} 