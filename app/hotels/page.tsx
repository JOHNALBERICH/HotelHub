'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from '@/app/types';

// Mock data for hotels
const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Luxury Resort & Spa',
    description: 'Experience luxury at its finest in our beachfront resort.',
    location: 'Maldives',
    price: 299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 2,
    name: 'Urban Boutique Hotel',
    description: 'Modern comfort in the heart of the city.',
    location: 'New York',
    price: 199,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    amenities: ['Free WiFi', 'Gym', 'Restaurant', 'Bar'],
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    description: 'Scenic mountain retreat with luxury amenities.',
    location: 'Swiss Alps',
    price: 249,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200',
    amenities: ['Free WiFi', 'Ski Access', 'Spa', 'Restaurant'],
  },
  {
    id: 4,
    name: 'Seaside Paradise Resort',
    description: 'Beachfront paradise with stunning ocean views.',
    location: 'Bali',
    price: 279,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
    amenities: ['Free WiFi', 'Private Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 5,
    name: 'Historic City Hotel',
    description: 'Elegant hotel in a historic building with modern amenities.',
    location: 'Paris',
    price: 329,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Concierge'],
  },
  {
    id: 6,
    name: 'Desert Oasis Resort',
    description: 'Luxury desert retreat with spectacular views.',
    location: 'Dubai',
    price: 399,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Desert Tours'],
  },
  // Add more hotels as needed
];

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });

  const [sortBy, setSortBy] = useState('recommended');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter hotels based on criteria
  const filteredHotels = hotels.filter((hotel) => {
    if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && hotel.price < Number(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && hotel.price > Number(filters.maxPrice)) {
      return false;
    }
    if (filters.rating && hotel.rating < Number(filters.rating)) {
      return false;
    }
    return true;
  });

  // Sort hotels based on selected criteria
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Min price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
                placeholder="Max price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Any rating</option>
                <option value="3">3+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotels List */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Available Hotels</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.map((hotel) => (
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
                    <p className="text-gray-500 text-sm mb-4">{hotel.description}</p>
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

          {sortedHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hotels found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 