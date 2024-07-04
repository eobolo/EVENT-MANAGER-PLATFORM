import { FaShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import userAxios from "./apis/userApi";
import { FaAddressCard, FaCalendarPlus, FaCalendarDays, FaCalendarCheck, FaArrowRightFromBracket } from "react-icons/fa6";

const UserHeader = ({ logUser, navigate, noDataFound, users, setUsers }) => {
    const handleLogOut = () => {
        // get the users that are not this logged user
        let allUsers = users.filter((user) => user.id !== logUser[0].id);
        // now change the login status of the logged user to false
        logUser[0].isLoggedin = false;
        // now create a new array to store the logged in user and all other users
        allUsers = [...allUsers, logUser[0]];
        // create a function to patch this isloggedin status to the data base
        const logOutUser = async (id) => {
            try {
                const changeIsLoggedIn = await userAxios.patch(`/users/${id}/`, { isLoggedin: false });
                console.log(changeIsLoggedIn);
                console.log(users);
                navigate("/login");
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        logOutUser(logUser[0].id);
        setUsers(allUsers);
    }
    return (
        <header>
            {logUser.length ? logUser[0].isLoggedin ? (
                <nav>
                    <ul className="nav-list">
                        <li className="nav-links elink-1">
                            <FaAddressCard />
                            <Link to={`/user/${logUser[0].id}/`}>Profile</Link>
                        </li>
                        <li className="nav-links elink-2">
                            <FaCalendarPlus />
                            <Link to={`/user/${logUser[0].id}/create`}>Create Event</Link>
                        </li>
                        <li className="nav-links elink-3">
                            <FaCalendarDays />
                            <Link to={`/user/${logUser[0].id}/events`}>Your Events</Link>
                        </li>
                        <li className="nav-links elink-4">
                            <FaCalendarCheck />
                            <Link to={`/user/${logUser[0].id}/booked`}>Booked</Link>
                        </li>
                        <li className="nav-links elink-5">
                            <FaArrowRightFromBracket />
                            <button
                                type="button"
                                onClick={handleLogOut}
                            >
                                logout
                            </button>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul className="nav-list try-login-nav">
                        <li className="nav-links text"><p>Click on the Login button to return to the login page, user not currently logged in</p></li>
                        <li className="nav-links icon"> <FaShield /></li>
                        <li className="nav-links button"><button onClick={() => navigate("/login")}>Login</button></li>
                    </ul>
                </nav>
            ) : noDataFound ?
                <nav>
                    <ul className="nav-list try-login-nav">
                        <li className="nav-links text">{noDataFound}</li>
                        <li className="nav-links button"><button onClick={() => navigate("/login")}>Login</button></li>
                    </ul>
                </nav>
                :
                <nav>
                    <ul className="nav-list try-login-nav">
                        <li className="nav-links text">User profile menu is Loading...</li>
                        <li className="nav-links button"><button onClick={() => navigate("/login")}>Login</button></li>
                    </ul>
                </nav>
            }
        </header>
    );
}

export default UserHeader;