'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data for featured hotels
const featuredHotels = [
  {
    id: 1,
    name: 'Sofitel Legend Metropole Hanoi',
    location: 'Hoan Kiem District, Hanoi',
    description: 'Historic 5-star luxury hotel in the heart of Hanoi, featuring French colonial architecture and world-class dining.',
    price: 350,
    rating: 4.9,
    amenities: ['French Restaurant', 'Spa', 'Historic Wing', 'Le Club Bar'],
    nearbyAttractions: ['Hoan Kiem Lake', 'Old Quarter', 'Opera House'],
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200',
  },
  {
    id: 2,
    name: 'InterContinental Danang Sun Peninsula',
    location: 'Son Tra Peninsula, Da Nang',
    description: 'Luxury beach resort nestled in the hills of Monkey Mountain, offering stunning views of the East Sea.',
    price: 420,
    rating: 4.8,
    amenities: ['Private Beach', 'Infinity Pool', 'La Maison 1888', 'HARNN Heritage Spa'],
    nearbyAttractions: ['Monkey Mountain', 'My Khe Beach', 'Marble Mountains'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
  },
  {
    id: 3,
    name: 'Park Hyatt Saigon',
    location: 'District 1, Ho Chi Minh City',
    description: 'Elegant 5-star hotel in the heart of Saigon, blending colonial charm with modern luxury.',
    price: 380,
    rating: 4.7,
    amenities: ['Opera Restaurant', 'Park Lounge', 'Xuan Spa', 'Outdoor Pool'],
    nearbyAttractions: ['Opera House', 'Ben Thanh Market', 'Nguyen Hue Street'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
  },
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search params:', { location, checkIn, checkOut, guests });
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
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
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

      {/* Featured Hotels Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <Link href={`/hotels/${hotel.id}`} key={hotel.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        ${hotel.price}
                        <span className="text-sm text-gray-500">/night</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        ★ {hotel.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
