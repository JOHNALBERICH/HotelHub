'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hotel, Room } from '@/app/types';

interface HotelDetailClientProps {
  hotel: Hotel;
}

export default function HotelDetailClient({ hotel }: HotelDetailClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [dateError, setDateError] = useState('');

  const validateDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return true;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkOutDate > checkInDate;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hotel Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[400px]">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
          <p className="text-gray-600 mb-4">{hotel.location}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{hotel.rating}</span>
          </div>
          <p className="text-gray-700 mb-6">{hotel.description}</p>
          <div>
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {hotel.amenities?.map((amenity) => (
                <div key={amenity} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Room Selection */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotel.rooms?.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                selectedRoom?.id === room.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-blue-200'
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="relative h-48 mb-4">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-4">{room.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-blue-600">
                  ${room.price}
                  <span className="text-sm text-gray-500">/night</span>
                </span>
                <span className="text-gray-600">Up to {room.capacity} guests</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href={`/bookings?hotelId=${hotel.id}&roomId=${room.id}`}
                  className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now - ${room.price} per night
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 