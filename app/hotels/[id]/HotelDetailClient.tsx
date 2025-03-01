'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Hotel, Room } from '@/app/types';

interface HotelDetailClientProps {
  hotel: Hotel;
}

export default function HotelDetailClient({ hotel }: HotelDetailClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking functionality
    console.log('Booking details:', {
      hotelId: hotel.id,
      roomId: selectedRoom?.id,
      checkIn,
      checkOut,
      guests,
    });
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
      <div className="mb-12">
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
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${room.price}
                  <span className="text-sm text-gray-500">/night</span>
                </span>
                <span className="text-gray-600">Up to {room.capacity} guests</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      {selectedRoom && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
          <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                {[...Array(selectedRoom.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now - ${selectedRoom.price} per night
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 