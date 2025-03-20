'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CalendarDaysIcon, UserIcon, BuildingOfficeIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  hotelImage: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function BookingsPage() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      hotelName: 'Sofitel Legend Metropole Hanoi',
      roomType: 'Premium Room',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      guests: 2,
      totalPrice: 1750,
      hotelImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200',
      status: 'upcoming'
    },
    {
      id: '2',
      hotelName: 'InterContinental Danang Sun Peninsula',
      roomType: 'Ocean View Room',
      checkIn: '2024-04-15',
      checkOut: '2024-04-18',
      guests: 2,
      totalPrice: 1350,
      hotelImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200',
      status: 'upcoming'
    }
  ]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modifyFormData, setModifyFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  // Handle direct booking from Book Now button
  useEffect(() => {
    const hotelId = searchParams.get('hotelId');
    if (hotelId) {
      // When coming from Book Now, create a new booking object
      const newBooking: Booking = {
        id: 'new',
        hotelName: 'New Booking',
        roomType: 'Standard Room',
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        guests: 1,
        totalPrice: 0,
        hotelImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200',
        status: 'upcoming'
      };
      setSelectedBooking(newBooking);
      setModifyFormData({
        checkIn: newBooking.checkIn,
        checkOut: newBooking.checkOut,
        guests: newBooking.guests,
        specialRequests: ''
      });
      setIsModifyModalOpen(true);
    }
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleModifyClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModifyFormData({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      specialRequests: ''
    });
    setIsModifyModalOpen(true);
  };

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    if (selectedBooking.id === 'new') {
      // Add new booking
      const newBooking: Booking = {
        ...selectedBooking,
        id: (bookings.length + 1).toString(),
        checkIn: modifyFormData.checkIn,
        checkOut: modifyFormData.checkOut,
        guests: modifyFormData.guests,
        totalPrice: calculateTotalPrice(modifyFormData.checkIn, modifyFormData.checkOut),
        status: 'upcoming'
      };
      setBookings([...bookings, newBooking]);
    } else {
      // Update existing booking
      const updatedBookings = bookings.map(booking => {
        if (booking.id === selectedBooking.id) {
          return {
            ...booking,
            checkIn: modifyFormData.checkIn,
            checkOut: modifyFormData.checkOut,
            guests: modifyFormData.guests
          };
        }
        return booking;
      });
      setBookings(updatedBookings);
    }

    setIsModifyModalOpen(false);
    setSelectedBooking(null);
  };

  const calculateTotalPrice = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = 350; // Base price, you can adjust this
    return nights * pricePerNight;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModifyFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    if (!bookingToCancel) return;

    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingToCancel.id) {
        return {
          ...booking,
          status: 'cancelled' as const
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    setIsCancelModalOpen(false);
    setBookingToCancel(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your hotel reservations
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">You don't have any bookings yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Hotel Image */}
                    <div className="relative h-48 md:h-full">
                      <Image
                        src={booking.hotelImage}
                        alt={booking.hotelName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 md:col-span-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{booking.hotelName}</h3>
                          <p className="text-gray-600 mt-1">{booking.roomType}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Check-in</p>
                            <p className="text-sm text-gray-600">{formatDate(booking.checkIn)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Check-out</p>
                            <p className="text-sm text-gray-600">{formatDate(booking.checkOut)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Guests</p>
                            <p className="text-sm text-gray-600">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Total Price</p>
                            <p className="text-sm text-gray-600">${booking.totalPrice}</p>
                          </div>
                        </div>
                      </div>

                      {booking.status === 'upcoming' && (
                        <div className="mt-6 flex space-x-4">
                          <button 
                            onClick={() => handleModifyClick(booking)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Modify Booking
                          </button>
                          <button 
                            onClick={() => handleCancelClick(booking)}
                            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modify Booking Modal */}
      {isModifyModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
          <div className="w-full min-h-screen">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedBooking?.id === 'new' ? 'New Booking' : 'Modify Booking'}
                  </h2>
                  <button
                    onClick={() => setIsModifyModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Hotel Details */}
                <div className="space-y-8">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-72">
                      <Image
                        src={selectedBooking.hotelImage}
                        alt={selectedBooking.hotelName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.hotelName}</h3>
                      <p className="text-gray-600 mt-2">{selectedBooking.roomType}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Available Room Options</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-xl hover:border-blue-500 cursor-pointer transition-colors hover:bg-blue-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">Premium Room</h4>
                            <p className="text-gray-600 mt-1">King bed, City view</p>
                            <ul className="mt-2 space-y-1">
                              <li className="text-sm text-gray-600">• Free WiFi</li>
                              <li className="text-sm text-gray-600">• Breakfast included</li>
                              <li className="text-sm text-gray-600">• Air conditioning</li>
                            </ul>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">$350</p>
                            <p className="text-sm text-gray-600">per night</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-xl hover:border-blue-500 cursor-pointer transition-colors hover:bg-blue-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">Deluxe Suite</h4>
                            <p className="text-gray-600 mt-1">King bed, Ocean view</p>
                            <ul className="mt-2 space-y-1">
                              <li className="text-sm text-gray-600">• Ocean view balcony</li>
                              <li className="text-sm text-gray-600">• Premium amenities</li>
                              <li className="text-sm text-gray-600">• Butler service</li>
                            </ul>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">$500</p>
                            <p className="text-sm text-gray-600">per night</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900">Current Selection</h3>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <p className="font-medium text-gray-900">{selectedBooking.roomType}</p>
                          <p className="text-sm text-gray-600">Current booking</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">${selectedBooking.totalPrice}</p>
                          <p className="text-sm text-gray-600">total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Booking Form */}
                <div className="space-y-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h3>
                    <form onSubmit={handleModifySubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                          <input
                            type="date"
                            name="checkIn"
                            required
                            value={modifyFormData.checkIn}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                          <input
                            type="date"
                            name="checkOut"
                            required
                            value={modifyFormData.checkOut}
                            onChange={handleInputChange}
                            min={modifyFormData.checkIn}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                        <select
                          name="guests"
                          value={modifyFormData.guests}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                        <textarea
                          name="specialRequests"
                          value={modifyFormData.specialRequests}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                          placeholder="Any special requests or preferences..."
                        />
                      </div>
                    </form>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Room rate per night</span>
                        <span className="font-medium text-gray-900">${selectedBooking.totalPrice / 5}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Number of nights</span>
                        <span className="font-medium text-gray-900">5</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Taxes & fees</span>
                        <span className="font-medium text-gray-900">$150</span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-blue-600">${selectedBooking.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        onClick={handleModifySubmit}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                      >
                        {selectedBooking?.id === 'new' ? 'Complete Booking' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModifyModalOpen(false)}
                        className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Confirmation Modal */}
      {isCancelModalOpen && bookingToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-6">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">Cancel Booking</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to cancel your booking at <span className="font-semibold">{bookingToCancel.hotelName}</span>?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Check-in</p>
                    <p className="font-medium">{formatDate(bookingToCancel.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out</p>
                    <p className="font-medium">{formatDate(bookingToCancel.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Room Type</p>
                    <p className="font-medium">{bookingToCancel.roomType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Price</p>
                    <p className="font-medium">${bookingToCancel.totalPrice}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Please note that cancellation fees may apply according to the hotel's policy.
              </p>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleCancelConfirm}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Yes, Cancel Booking
              </button>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setBookingToCancel(null);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 