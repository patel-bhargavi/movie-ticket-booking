// ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ShowList.css'; // Import the CSS file

const ShowList = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        // Fetch data from the provided API
        axios.get('https://api.tvmaze.com/search/shows?q=all')
            .then(response => setShows(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="show-list-container">
            <h1>Trending Shows</h1>
            <div className="show-card-container">
                {shows.map(show => (
                    <div key={show.show.id} className="show-card">
                        {show.show.image && show.show.image.medium && (
                            <img src={show.show.image.original} alt={show.show.name} className="show-image" />
                        )}
                        <div className="card-details">
                            <h3 className="show-name">{show.show.name}</h3>
                            {show.show.rating && (
                                <p className="show-rating">Rating: {show.show.rating.average}</p>
                            )}
                            <p className="show-language">{show.show.language}</p>
                            <Link to={`/show/${show.show.id}`} className="details-button">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowList;
