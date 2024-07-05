import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userAxios from "./apis/userApi";
import { FaDatabase } from "react-icons/fa6";

const UserEditEvent = ({ events, logUser, navigate, setEvents, userId }) => {
  const [theEvent, setTheEvent] = useState([]);
  const [isEventGotten, setIsEventGotten] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [booking, setBooking] = useState([]);
  const [editSuccess, setEditSuccess] = useState('');
  const { id } = useParams();

  console.log(events);

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
      setBooking(getEvent[0].booking);
      setIsEventGotten("Data is gotten so show form");
    }
  }, [id, events]);

  const handleSubmitEdit = (e) => {
    // prevent the default action of form submission to server
    e.preventDefault();
    const editEvent = { id, userId, title, date, time, location, venue, description, booking };
    let allEvents = events.filter((event) => event.id !== id);
    allEvents = [...allEvents, editEvent];
    const doPutEvent = async (eventEdit) => {
      try {
        const eventData = await userAxios.put(`/events/${id}`, eventEdit);
        console.log(eventData.data)
      } catch (error) {
        console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
      }
    };
    doPutEvent(editEvent);
    setEvents(allEvents);
    setEditSuccess("Event updated !!!");
  }

  return (
    <section className="edit-event-section">
      {logUser.length !== 0 ? logUser[0].isLoggedin ? isEventGotten ? theEvent.length > 0 ? (
        <div className="event-form-div">
          <form onSubmit={handleSubmitEdit} className="event-form">
            {editSuccess ? <p>{editSuccess}</p> : null}
            <p className="event-form-p1 glow">
              <label htmlFor="title">Event Title: </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </p>
            <p className="event-form-p2 glow">
              <label htmlFor="date">Event Date: </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </p>
            <p className="event-form-p3 glow">
              <label htmlFor="time">Event Time: </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </p>
            <p className="event-form-p4 glow">
              <label htmlFor="location">Event Location: </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </p>
            <p className="event-form-p5 glow">
              <label htmlFor="venue">Event Venue: </label>
              <input
                type="text"
                id="venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </p>
            <p className="event-form-p6 glow">
              <label htmlFor="description">Event Description</label>
              <textarea
                id="description"
                rows="30"
                cols="30"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
            <p className="event-form-p7">
              <button type="submit" onMouseOver={() => setEditSuccess('')}>
                Submit Edit
              </button>
            </p>
          </form>
        </div>
      ) : <div className="not-available">No event Found!!!</div> : <div className="loading-events">Loading the events before crud can be done...</div> : <div className="not-available try-login">Read Instructions at the side</div> : <div className="not-available try-login database">
        <FaDatabase />
      </div>}
    </section>
  );
}

export default UserEditEvent;