import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import { fetchHotelById } from '../api/hotels';
import './HotelPage.css';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const getHotel = async () => {
      const hotelData = await fetchHotelById(id);
      setHotel(hotelData);
    };
    getHotel();
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="hotel-page">
      <h1>{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name} />
      <p>{hotel.description}</p>
      <p className="price">Price per night: ${hotel.price}</p>
      <p className="rating">Rating: {hotel.rating}</p>
      <div className="booking-form-container">
        <BookingForm hotel={hotel} />
      </div>
      <div className="reviews-container">
        <Reviews hotelId={hotel.id} />
      </div>
    </div>
  );
};

export default HotelPage;
