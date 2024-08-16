import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import HotelList from '../components/HotelList';
import { fetchHotels } from '../api/hotels';
import './HomePage.css';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const getHotels = async () => {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
      setFilteredHotels(hotelsData);
    };
    getHotels();
  }, []);

  const handleSearch = (query) => {
    const results = hotels.filter(hotel => hotel.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredHotels(results);
  };

  const handleFilter = ({ priceRange, rating }) => {
    const results = hotels.filter(hotel => 
      hotel.price <= priceRange[1] && hotel.rating >= rating
    );
    setFilteredHotels(results);
  };

  return (
    <div className="container">
      <h1>Hotel Booking App</h1>
      <SearchBar onSearch={handleSearch} className="search-bar"/>
      <Filters onFilter={handleFilter} className="filters"/>
      <div className="hotel-list">
        <HotelList hotels={filteredHotels} />
      </div>
    </div>
  );
};

export default HomePage;
