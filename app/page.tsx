'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Hotel } from './types';

// Mock data for hotels
const hotelsData: Hotel[] = [
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
        description: 'Luxurious 45m² room in the historic wing with colonial charm',
        price: 350,
        capacity: 2,
        amenities: ['French colonial decor', 'Premium Sofitel MyBed™', 'Hermès bath amenities'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Grand Suite Opera',
        description: 'Elegant 75m² suite with Opera Wing views',
        price: 550,
        capacity: 3,
        amenities: ['Opera House view', 'Living room', 'Club Lounge access'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      }
    ]
  },
  {
    id: 2,
    name: 'InterContinental Danang Sun Peninsula',
    description: 'Luxury beach resort nestled in the hills of Monkey Mountain, offering stunning views of the East Sea.',
    location: 'Son Tra Peninsula, Da Nang',
    price: 420,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
    amenities: [
      'Private Beach',
      'Infinity Pool',
      'La Maison 1888',
      'HARNN Heritage Spa'
    ],
    rooms: [
      {
        id: 1,
        name: 'Ocean View Room',
        description: 'Luxurious 70m² room with panoramic ocean views',
        price: 420,
        capacity: 2,
        amenities: ['Ocean view', 'Private balcony', 'Luxury bathroom'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Ocean Pool Villa',
        description: 'Luxurious 150m² villa with private infinity pool',
        price: 880,
        capacity: 4,
        amenities: ['Private infinity pool', 'Direct beach access', 'Butler service'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      }
    ]
  },
  {
    id: 3,
    name: 'Park Hyatt Saigon',
    description: 'Elegant 5-star hotel in the heart of Saigon, blending colonial charm with modern luxury.',
    location: 'District 1, Ho Chi Minh City',
    price: 380,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    amenities: [
      'Opera Restaurant',
      'Park Lounge',
      'Xuan Spa',
      'Outdoor Pool'
    ],
    rooms: [
      {
        id: 1,
        name: 'Park Room',
        description: 'Sophisticated 45m² room with city views',
        price: 380,
        capacity: 2,
        amenities: ['City view', 'Marble bathroom', 'Premium bedding'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200']
      },
      {
        id: 2,
        name: 'Park Suite',
        description: 'Sophisticated 70m² suite with butler service',
        price: 580,
        capacity: 3,
        amenities: ['Butler service', 'Luxury spa access', 'Evening canapes'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      }
    ]
  }
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [searchResults, setSearchResults] = useState<Hotel[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [dateError, setDateError] = useState('');

  const validateDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return true;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkOutDate > checkInDate;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Validate dates
    if (!validateDates(checkIn, checkOut)) {
      setDateError('Check-out date must be after check-in date');
      setSearchResults([]);
      return;
    }
    
    // Clear any existing date error
    setDateError('');

    // Filter hotels based on search criteria
    const results = hotelsData.filter(hotel => {
      const matchLocation = hotel.location.toLowerCase().includes(location.toLowerCase());
      const matchCapacity = hotel.rooms.some(room => room.capacity >= parseInt(guests));
      return matchLocation && matchCapacity;
    });

    setSearchResults(results.length > 0 ? results : []);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2000"
            alt="Tropical beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center text-white w-full max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-lg md:text-xl mb-6">Discover amazing hotels at the best prices</p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white/98 backdrop-blur-md p-6 rounded-lg shadow-xl mx-4">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className="md:col-span-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 pl-10 border rounded-lg text-gray-700 bg-white shadow-sm"
                      placeholder="Where do you want to stay?"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setDateError('');
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setDateError('');
                    }}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <div className="md:col-span-1">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div className="md:col-span-8">
                  {dateError && (
                    <div className="text-red-500 text-sm mb-2">{dateError}</div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm"
                  >
                    Search Hotels
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {hasSearched && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {searchResults && searchResults.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold text-black text-center mb-12">Search Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((hotel) => (
                    <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-black mb-2">{hotel.name}</h3>
                        <p className="text-gray-600 mb-2">{hotel.location}</p>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{hotel.description}</p>
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 3).map((amenity, index) => (
                              <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-blue-600">
                            ${hotel.price}
                            <span className="text-sm text-gray-500">/night</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            ★ {hotel.rating}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link 
                            href={`/hotels/${hotel.id}`}
                            className="text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            View Details
                          </Link>
                          <Link 
                            href={`/bookings?hotelId=${hotel.id}`}
                            className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Could not find any hotels</h2>
                <p className="text-gray-600 mb-6">
                  {dateError || "We couldn't find any hotels matching your search criteria."}
                </p>
                <Link 
                  href="/support" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="underline">Need help with your search? Contact our support team</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Hotels Section */}
      {(!hasSearched || (searchResults && searchResults.length === 0)) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">Featured Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotelsData.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-black mb-2">{hotel.name}</h3>
                    <p className="text-gray-600 mb-2">{hotel.location}</p>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{hotel.description}</p>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        ${hotel.price}
                        <span className="text-sm text-gray-500">/night</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        ★ {hotel.rating}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        href={`/hotels/${hotel.id}`}
                        className="text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </Link>
                      <Link 
                        href={`/bookings?hotelId=${hotel.id}`}
                        className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
