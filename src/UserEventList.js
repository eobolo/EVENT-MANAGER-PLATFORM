import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eventImage from "./assets/images/all_event_pic.jpg"

const UserEventList = ({ userId, events, logUser }) => {
    const [userEvents, setUserEvents] = useState([]);
    const [page, setPage] = useState(0);
    const eventPerPage = 6;
    const charToPrint = 25;

    useEffect(() => {
        const getUserEvents = events.filter((event) => event.userId === userId);
        setUserEvents(getUserEvents);
    }, [events, userId]);

    const slicedUserEvents = userEvents.slice(page, page + eventPerPage);

    const handleNext = () => {
        setPage(page + eventPerPage);
    };
    const handleBack = () => {
        setPage(page - eventPerPage);
    };

    return (
        <div className="event-list">
            {logUser.length !== 0 ? logUser[0].isLoggedin ? slicedUserEvents.length > 0 ? slicedUserEvents.map((slicedUserEvent) => <div key={`${slicedUserEvent.id}`} className="event-list-item">
                <div className="all_event_image">
                    <img src={eventImage} alt="event_image" />
                </div>
                <div className="event-title">
                    <strong>Title:</strong>{slicedUserEvent.title}
                </div>
                <div className="event-date">
                    <strong>Date:</strong>{slicedUserEvent.date}
                </div>
                <div className="event-time">
                    <strong>Time:</strong>{slicedUserEvent.time}
                </div>
                <div className="event-location">
                    <strong>Location:</strong>{slicedUserEvent.location}
                </div>
                <div className="event-venue">
                    <strong>Venue:</strong>{slicedUserEvent.venue}
                </div>
                <div className="event-description">
                    <strong>Description:</strong>{(slicedUserEvent.description).length > charToPrint ? `${(slicedUserEvent.description).slice(0, charToPrint)}...` : slicedUserEvent.description}
                </div>
                <div className="read-more">
                    <Link to={`/user/${userId}/event/${slicedUserEvent.id}`}>
                        <button
                            type="button"
                        >
                            Read More
                        </button>
                    </Link>
                </div>
            </div>) : <div className="not-available"><p>Users has no Events currently Available.</p></div> : null : null}
            {slicedUserEvents.length > 0 ? (
                <div className="navigation-buttons">
                    <div className="next-page-div">
                        {userEvents[page + eventPerPage] ? (
                            <button type="button" onClick={handleNext}>
                                Next Page
                            </button>
                        ) : null}
                    </div>
                    <div className="prev-page-div">
                        {userEvents[page - eventPerPage] ? (
                            <button type="button" onClick={handleBack}>
                                Previous Page
                            </button>
                        ) : null}
                    </div>
                </div>
            ): null}
        </div>
    );
}

export default UserEventList;