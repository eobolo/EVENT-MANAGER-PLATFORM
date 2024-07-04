import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import userAxios from "./apis/userApi";
import eventImage from "./assets/images/all_event_pic.jpg"
import { FaDatabase } from "react-icons/fa6";

const UserEventList = ({ events, logUser, navigate, setEvents, userId }) => {
    const [theEvent, setTheEvent] = useState([]);
    const [isEventGotten, setIsEventGotten] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const getEvent = events.filter((event) => event.id === id);
        if (getEvent.length === 0) {
            setTheEvent(getEvent);
            setIsEventGotten("Data is gotten so show form");
        } else {
            setTheEvent(getEvent);
            setTitle(getEvent[0].title);
            setDate(getEvent[0].date);
            setTime(getEvent[0].time);
            setLocation(getEvent[0].location);
            setVenue(getEvent[0].venue);
            setDescription(getEvent[0].description);
            setIsEventGotten("Data is gotten so show form");
        }
    }, [id, events]);

    const handleDelete = () => {
        /*
          try to filter the event being deleted
          from the events array using the id, then
          the filtered array is being set to the setEvents
          state variable function
        */
        const allEvents = events.filter((event) => event.id !== id);
        const deleteEvent = async () => {
            try {
                await userAxios.delete(`/events/${id}`);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        deleteEvent();
        setEvents(allEvents);
        navigate(`/user/${userId}/events`);
    };


    return (
        <div className="each-event-section">
            {logUser.length !== 0 ? logUser[0].isLoggedin ? isEventGotten ? theEvent.length > 0 ? (
                <section className="event-list-item">
                    <div className="all_event_image">
                        <img src={eventImage} alt="event_image" />
                    </div>
                    <div className="event-title">
                        <strong>Title:</strong>{title}
                    </div>
                    <div className="event-date">
                        <strong>Date:</strong>{date}
                    </div>
                    <div className="event-time">
                        <strong>Time:</strong>{time}
                    </div>
                    <div className="event-location">
                        <strong>Location:</strong>{location}
                    </div>
                    <div className="event-venue">
                        <strong>Venue:</strong>{venue}
                    </div>
                    <div className="event-description">
                        <strong>Description:</strong>{description}
                    </div>
                    <div className="action-buttons">
                        <Link to={`/user/${userId}/edit/${id}`}>
                            <button
                                type="button"
                                className="book-button edit-button"
                            >
                                Edit Event
                            </button>
                        </Link>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="del-button"
                        >
                            Delete Event
                        </button>
                    </div>
                </section>
            ) : <div className="not-available"><p>No event Found!!!</p></div> : <div div className="loading-events"><p>Loading the events before crud can be done...</p></div> : <div className="not-available try-login">Read Instructions at the side</div> : <div className="not-available try-login database">
                <FaDatabase />
            </div>}
        </div>
    );
}

export default UserEventList;