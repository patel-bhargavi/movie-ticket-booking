import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/ShowList.css';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
    
        const fetchShows = async () => {
            let apiUrl = 'https://api.tvmaze.com/search/shows?q=all';

            if (searchTerm) {
                apiUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
            }

            try {
                const response = await axios.get(apiUrl);
                setShows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchShows();
    }, [searchTerm]);

    return (
        <div className="show-list-container">
            <header className="app-header">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Shows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>
            <div className="show-card-container">
                {shows.map(show => (
                    <div key={show.show.id} className="show-card">
                        {show.show.image && show.show.image.medium && (
                            <img src={show.show.image.original} alt={show.show.name} className="show-image" />
                        )}
                        <div className="card-details">
                            <h3 className="show-name">{show.show.name}</h3>
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
