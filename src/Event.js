import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userAxios from "./apis/userApi";
import eventImage from "./assets/images/all_event_pic.jpg"

const Event = ({ events, users, setEvents }) => {
    const [theEvent, setTheEvent] = useState([]);
    const [isEventGotten, setIsEventGotten] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');
    const [formStyle, setFormStyle] = useState({
        display: "none",
    });
    const [bookButtonStyle, setBookButtonStyle] = useState({
        display: "flex",
    });
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

    const handleBookEvent = () => {
        setBookButtonStyle({
            display: "none",
        });
        setFormStyle({
            display: "flex",
        });
        setSubmitMessage('');
    }
    const handleBackToEvent = () => {
        setBookButtonStyle({
            display: "flex",
        });
        setFormStyle({
            display: "none",
        });
        setSubmitMessage('');
    }

    const handleBookSubmit = (e) => {
        // prevent default for submission action
        e.preventDefault();

        // check if that user exists
        const checkUserExists = users.filter((user) => user.username === username && user.password === password);
        if (checkUserExists.length === 0) {
            setSubmitMessage("This user doesn't exist, care to create a account before booking :)");
            return
        }
        const userId = parseInt(checkUserExists[0].id)
        /*
            we have gotten the event already but now we have
            to know if that user has booked the event already
            to avoid duplicate booking.

            1. we have to get the booking property of an event which is
               an array of objects.
            2. iterate through it to see if the checkuser[0].id already exists
               for that event.
            3. if not take the previous booking array spread it and also add the
               new booking object.
            4. now add this booking to the event.
            5. now update the state event with all events and the updated booked event
            5. now we have to update the event endpoint with the new booking
               for that specific event and also the events state
        */
        let bookings = theEvent[0].booking;
        const checkIdExists = bookings.filter((booking) => booking.userId === userId);
        if (checkIdExists.length > 0) {
            setSubmitMessage("User already booked for this event...");
            setBookButtonStyle({
                display: "flex",
            });
            setFormStyle({
                display: "none",
            });
            setUserName('');
            setPassword('');
            return
        }
        bookings = [...bookings, { userId }];
        theEvent[0].booking = bookings;
        let allEvents = events.filter((event) => event.id !== id);
        allEvents = [...allEvents, ...theEvent];

        const updateBooking = async (id, bookings) => {
            try {
                const eventData = await userAxios.patch(`/events/${id}`, { booking: bookings })
                console.log(eventData.data);
                console.log(events);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        updateBooking(id, bookings);
        setEvents(allEvents);
        setSubmitMessage("Event was successfully booked!!!");
        setBookButtonStyle({
            display: "flex",
        });
        setFormStyle({
            display: "none",
        });
        setUserName('');
        setPassword('');
    };
    return (
        <div className="each-event-section">
            {submitMessage ? <p aria-live="assertive">{submitMessage}</p> : null}
            {isEventGotten ? theEvent.length > 0 ? (
                <section style={bookButtonStyle} className="event-list-item">
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
                    <div className="book-event">
                        <button
                            type="button"
                            onClick={handleBookEvent}
                            style={bookButtonStyle}
                        >
                            Book Event
                        </button>
                    </div>
                </section>
            ) : <p>No event Found!!!</p> : <p>Loading the events before event can be booked...</p>}
            <section style={formStyle} className="login-section booking-form">
                <div>
                    <h1>Book Now</h1>
                </div>
                <form onSubmit={handleBookSubmit}>
                    <p>
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <p className="back_and_book">
                        <button type="submit" className="book-button">
                            Submit Booking
                        </button>
                        <button
                            type="button"
                            onClick={handleBackToEvent}
                        >
                            Back
                        </button>
                    </p>
                </form>
            </section>
        </div >
    );
};

export default Event;