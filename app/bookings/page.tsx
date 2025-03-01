'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDaysIcon, CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/outline';

// Mock data for booking history
const bookingHistory = [
  {
    id: 1,
    hotelName: 'Luxury Resort & Spa',
    location: 'Maldives',
    roomType: 'Deluxe Ocean View',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    guests: 2,
    pricePerNight: 299,
    totalPrice: 1495,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
  },
  {
    id: 2,
    hotelName: 'Urban Boutique Hotel',
    location: 'New York',
    roomType: 'Premium Suite',
    checkIn: '2024-04-10',
    checkOut: '2024-04-15',
    guests: 3,
    pricePerNight: 199,
    totalPrice: 995,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
  },
  {
    id: 3,
    hotelName: 'Mountain View Lodge',
    location: 'Swiss Alps',
    roomType: 'Family Suite',
    checkIn: '2024-02-01',
    checkOut: '2024-02-05',
    guests: 4,
    pricePerNight: 249,
    totalPrice: 996,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200',
  },
];

export default function BookingsPage() {
  const [filter, setFilter] = useState('all'); // all, upcoming, completed

  const filteredBookings = bookingHistory.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">My Bookings</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' 
              ? 'px-4 py-2 rounded-lg bg-blue-600 text-white'
              : 'px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200'}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={filter === 'upcoming'
              ? 'px-4 py-2 rounded-lg bg-blue-600 text-white'
              : 'px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200'}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed'
              ? 'px-4 py-2 rounded-lg bg-blue-600 text-white'
              : 'px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200'}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative h-48 md:h-full">
                <Image
                  src={booking.image}
                  alt={booking.hotelName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:col-span-3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">
                      {booking.hotelName}
                    </h2>
                    <p className="text-gray-600 mb-2">{booking.location}</p>
                    <p className="text-gray-700 font-medium">
                      Room: {booking.roomType}
                    </p>
                  </div>
                  <span
                    className={booking.status === 'Upcoming'
                      ? 'px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'
                      : 'px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-medium">{formatDate(booking.checkIn)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-medium">{formatDate(booking.checkOut)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="font-medium">{booking.guests} guests</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">
                        {calculateNights(booking.checkIn, booking.checkOut)} nights at ${booking.pricePerNight}/night
                      </p>
                      <p className="text-2xl font-bold text-black mt-1">
                        Total: ${booking.totalPrice}
                      </p>
                    </div>
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 