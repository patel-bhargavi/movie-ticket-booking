// ShowDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ShowDetail.css';
import Spinner from './Spinner';

const ShowDetails = () => {
    const { showId } = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        // Fetch show details by ID
        // Assuming you have an API endpoint to fetch show details by ID
        fetch(`https://api.tvmaze.com/shows/${showId}`)
            .then(response => response.json())
            .then(data => setShow(data))
            .catch(error => console.error('Error fetching show details:', error));
    }, [showId]);

    if (!show) {
        return <div>
            <Spinner />

        </div>;
    }

    return (
        <div className="show-details-container">
            <div className="show-details-card">
                {show.image && show.image.medium && (
                    <img src={show.image.original} alt={show.name} className="show-details-image" />
                )}
                <div className="show-details-content">
                    <h1 className="show-details-name">{show.name}</h1>
                    <p
                        className="show-details-summary"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                    />
                    <div className='detail-block'>

                        <p className='show-details-language'>{show.language}</p>
                        <p className='show-details-status'>{show.status}</p>


                    </div>
                    <p className='show-details-genres'>{show.genres.join(', ')}</p>
                    <br />

                    <Link to={`/book/${showId}`} className="show-details-button">
                        Book Ticket
                    </Link>
                    <Link to="/" className="show-details-button">
                        Back to Shows
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
