'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarDaysIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

// Mock hotel data - in a real app, this would come from an API
const hotelData = {
  id: 1,
  name: 'Luxury Resort & Spa',
  location: 'Maldives',
  description: 'Experience luxury at its finest in our beachfront resort featuring world-class amenities and stunning ocean views.',
  price: 299,
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200',
  amenities: [
    'Free WiFi',
    'Swimming Pool',
    'Spa',
    'Restaurant',
    'Fitness Center',
    'Beach Access',
    'Room Service',
    'Bar/Lounge',
  ],
};

export default function BookingPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking submission
    console.log('Booking details:', { hotelId: params.id, ...formData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hotel Details Section */}
        <div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src={hotelData.image}
              alt={hotelData.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{hotelData.name}</h1>
            <p className="mt-2 text-gray-600">{hotelData.location}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{hotelData.rating}</span>
            </div>
            <p className="mt-4 text-gray-600">{hotelData.description}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {hotelData.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                ${hotelData.price}
                <span className="text-base font-normal text-gray-600">/night</span>
              </p>
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
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

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