'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarDaysIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { Hotel } from '@/app/types';

interface BookingClientProps {
  hotel: Hotel;
}

export default function BookingClient({ hotel }: BookingClientProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateError, setDateError] = useState('');

  const validateDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return true;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkOutDate > checkInDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates(formData.checkIn, formData.checkOut)) {
      setDateError('Check-out date must be after check-in date');
      return;
    }
    
    // Clear any existing errors
    setDateError('');
    
    // TODO: Implement booking submission
    console.log('Booking details:', { hotelId: hotel.id, ...formData });
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      email: '',
      fullName: '',
      checkIn: '',
      checkOut: '',
      specialRequests: '',
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear date error when dates change
    if (name === 'checkIn' || name === 'checkOut') {
      setDateError('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Room has been booked successfully
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hotel Details Section */}
        <div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
            <p className="mt-2 text-gray-600">{hotel.location}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{hotel.rating}</span>
            </div>
            <p className="mt-4 text-gray-600">{hotel.description}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Rooms</h2>
              <div className="mt-4 space-y-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg">{room.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{room.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-blue-600 font-bold">${room.price}/night</span>
                      <span className="text-gray-500">Up to {room.capacity} guests</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Check-in Date
                    </div>
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Check-out Date
                    </div>
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {dateError && (
                <div className="text-red-500 text-sm">{dateError}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Book Now
              </button>

              <p className="text-sm text-gray-500 mt-4">
                By clicking "Book Now", you agree to our terms and conditions and cancellation policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 