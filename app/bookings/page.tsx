'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDaysIcon, CurrencyDollarIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { Hotel } from '@/app/types';

// Mock data for hotels (you should import this from a shared data file)
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
      },
      {
        id: 2,
        name: 'Grand Suite Opera',
        description: 'Opulent 92m² suite with Opera House views',
        price: 850,
        capacity: 3,
        amenities: ['Butler service', 'Opera House view', 'Club Lounge access'],
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200']
      }
    ]
  },
  {
    id: 2,
    name: 'InterContinental Danang Sun Peninsula',
    description: 'Luxurious beachfront resort nestled in the hills of Monkey Mountain, offering stunning views of the East Sea and world-class amenities.',
    location: 'Son Tra Peninsula, Da Nang',
    price: 450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200',
    amenities: [
      'Private Beach',
      'Michelin-starred Restaurant',
      'Luxury Spa',
      'Infinity Pools'
    ],
    rooms: [
      {
        id: 3,
        name: 'Ocean View Room',
        description: 'Spacious 70m² room with panoramic ocean views',
        price: 450,
        capacity: 2,
        amenities: ['Private balcony', 'Ocean view', 'Premium amenities'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200']
      },
      {
        id: 4,
        name: 'Ocean Pool Villa',
        description: 'Luxurious 150m² villa with private infinity pool',
        price: 1200,
        capacity: 4,
        amenities: ['Private pool', 'Butler service', 'Ocean view', 'Terrace'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200']
      }
    ]
  },
  {
    id: 3,
    name: 'Park Hyatt Saigon',
    description: 'Elegant 5-star hotel in the heart of Ho Chi Minh City, combining French colonial architecture with modern luxury and Vietnamese hospitality.',
    location: 'District 1, Ho Chi Minh City',
    price: 400,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200',
    amenities: [
      '2 Signature Restaurants',
      'Luxury Spa',
      'Outdoor Pool',
      'Park Lounge'
    ],
    rooms: [
      {
        id: 5,
        name: 'Park Room',
        description: 'Sophisticated 40m² room with city views',
        price: 400,
        capacity: 2,
        amenities: ['City view', 'Marble bathroom', 'Le Labo amenities'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200']
      },
      {
        id: 6,
        name: 'Park Suite',
        description: 'Luxurious 80m² suite with separate living area',
        price: 750,
        capacity: 3,
        amenities: ['Living room', 'Butler service', 'Club access'],
        images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200']
      }
    ]
  }
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
    guests: '2',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateError, setDateError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  useEffect(() => {
    const hotelId = searchParams.get('hotelId');
    const roomId = searchParams.get('roomId');
    
    if (hotelId) {
      const hotel = hotelsData.find(h => h.id === parseInt(hotelId));
      setSelectedHotel(hotel || null);
      
      if (hotel && roomId) {
        const room = hotel.rooms.find(r => r.id === parseInt(roomId));
        setSelectedRoom(room || null);
      }
    }
  }, [searchParams]);

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
    console.log('Booking details:', {
      hotelId: selectedHotel?.id,
      roomId: selectedRoom?.id,
      ...formData
    });
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      email: '',
      fullName: '',
      checkIn: '',
      checkOut: '',
      specialRequests: '',
      guests: '2',
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  if (!selectedHotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Select a Hotel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelsData.map((hotel) => (
            <Link 
              href={`/bookings?hotelId=${hotel.id}`}
              key={hotel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
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
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    From ${hotel.price}
                    <span className="text-sm text-gray-500">/night</span>
                  </span>
                  <span className="text-sm text-gray-600">
                    ★ {hotel.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

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
              src={selectedHotel.image}
              alt={selectedHotel.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{selectedHotel.name}</h1>
            <p className="mt-2 text-gray-600">{selectedHotel.location}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{selectedHotel.rating}</span>
            </div>
            <p className="mt-4 text-gray-600">{selectedHotel.description}</p>
            
            {!selectedRoom && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Select a Room</h2>
                <div className="mt-4 space-y-4">
                  {selectedHotel.rooms.map((room) => (
                    <div 
                      key={room.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                      }`}
                      onClick={() => {
                        setSelectedRoom(room);
                        window.history.pushState({}, '', `?hotelId=${selectedHotel.id}&roomId=${room.id}`);
                      }}
                    >
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
            )}

            {selectedRoom && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Selected Room</h2>
                <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                  <h3 className="font-semibold text-lg">{selectedRoom.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{selectedRoom.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">${selectedRoom.price}/night</span>
                    <span className="text-gray-500">Up to {selectedRoom.capacity} guests</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRoom(null);
                      window.history.pushState({}, '', `?hotelId=${selectedHotel.id}`);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Change Room
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form Section */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                  placeholder="Enter your email (e.g., john@example.com)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                  placeholder="Enter your full name (e.g., John Smith)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-600" />
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-600" />
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>

              {dateError && (
                <div className="text-red-600 text-sm font-medium">{dateError}</div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Number of Guests
                  </div>
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                >
                  {[...Array(selectedRoom ? selectedRoom.capacity : 5)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="text-gray-800">
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                  placeholder="Tell us about any special requirements or preferences (e.g., room preferences, dietary restrictions, special occasions)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-md hover:shadow-lg"
              >
                Book Now {selectedRoom && `- $${selectedRoom.price} per night`}
              </button>

              <p className="text-sm text-gray-600 mt-4 font-medium">
                By clicking "Book Now", you agree to our terms and conditions and cancellation policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 