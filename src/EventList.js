import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import eventImage from "./assets/images/all_event_pic.jpg"


const EventList = ({ events, isEventDataGotten, users }) => {
    const [page, setPage] = useState(0);
    const eventPerPage = 6;
    const charToPrint = 25;
    const slicedEvents = events.slice(page, page + eventPerPage);

    const handleNext = () => {
        setPage(page + eventPerPage);
    };
    const handleBack = () => {
        setPage(page - eventPerPage);
    };

    return (
        <div className="event-list">
            {isEventDataGotten ? slicedEvents.length > 0 ? slicedEvents.map((slicedEvent) => <div key={`${slicedEvent.id}`} className="event-list-item">
                <div className="all_event_image">
                    <img src={eventImage} alt="event_image" />
                </div>
                <div className="event-title">
                    <strong>Title:</strong>{slicedEvent.title}
                </div>
                <div className="event-date">
                    <strong>Date:</strong>{slicedEvent.date}
                </div>
                <div className="event-time">
                    <strong>Time:</strong>{slicedEvent.time}
                </div>
                <div className="event-location">
                    <strong>Location:</strong>{slicedEvent.location}
                </div>
                <div className="event-venue">
                    <strong>Venue:</strong>{slicedEvent.venue}
                </div>
                <div className="event-description">
                    <strong>Description:</strong>{(slicedEvent.description).length > charToPrint ? `${(slicedEvent.description).slice(0, charToPrint)}...` : slicedEvent.description}
                </div>
                <div className="user-read-more">
                    <div className="user">
                        <FaUser />
                        <p style={{ textTransform: "capitalize" }}>{`${(users.find((user) => user.id === slicedEvent.userId).first_name).toLowerCase()} ${(users.find((user) => user.id === slicedEvent.userId).last_name).toLowerCase()}`}</p>
                    </div>
                    <div className="read-more">
                        <Link to={`/event/${slicedEvent.id}`}>
                            <button
                                type="button"
                            >
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>) : <div className="not-available"><p>No Events currently Available!!!</p></div> : <div className="loading-events"><p>Loading up all events...</p></div>}
            {slicedEvents.length > 0 ? (
                <div className="navigation-buttons">
                    <div className="next-page-div">
                        {events[page + eventPerPage] ? (
                            <button type="button" onClick={handleNext}>
                                Next Page
                            </button>
                        ) : null}
                    </div>
                    <div className="prev-page-div">
                        {events[page - eventPerPage] ? (
                            <button type="button" onClick={handleBack}>
                                Previous Page
                            </button>
                        ) : null}
                    </div>
                </div>
            ) : null}
            {/* {events[page + eventPerPage] ? (
                <button type="button" onClick={handleNext}>
                    Next Page
                </button>
            ) : null}
            {events[page - eventPerPage] ? (
                <button type="button" onClick={handleBack}>
                    Previous Page
                </button>
            ) : null} */}
        </div>
    );
}

export default EventList;