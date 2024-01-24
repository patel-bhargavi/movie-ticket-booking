import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ShowDetail.css';
import Spinner from './Spinner';

const ShowDetails = () => {
    const { showId } = useParams();
    const [show, setShow] = useState(null);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${showId}`)
            .then(response => response.json())
            .then(data => setShow(data))
            .catch(error => console.error('Error fetching show details:', error));
    }, [showId]);

    if (!show) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="show-details-container">
            <div className="show-details-card">
                {show.image && show.image.medium && (
                    <img src={show.image.original} alt={show.name} className="show-details-image" />
                )}
                <div className="show-details-content">
                    <h1 className="show-details-name">{show.name}</h1>

                    <h5 className=''>Overview</h5>
                    <p
                        className="show-details-summary"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                    />

                    <h5 className=''>Rating</h5>
                    <p className="show-rating">{show.rating.average}</p>

                    <h5 className=''>Genres</h5>
                    <p className='show-details-genres'>{show.genres.join(', ')}</p>

                    <h5 className=''>Production Countries</h5>
                    <p className='show-country'>{show.network.country.name}</p>

                    <h5 className=''>Release</h5>
                    <p className='show-date'>{show.premiered}</p>

                    <button
                        type="button"
                        className="btn btn-primary mb-2"
                        data-toggle="modal"
                        data-target="#bookingModal"

                    >
                        Book Ticket
                    </button>
                    <Link to="/" className="show-details-button">
                        Back to Shows
                    </Link>
                </div>
            </div>

            {/* MODEL */}
            <div className="modal" id="bookingModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Book Ticket</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form>

                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" className="form-control" id="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Book
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
