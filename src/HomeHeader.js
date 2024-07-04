import { Link } from "react-router-dom";
import { FaCalendarDays, FaArrowRightToBracket, FaUserPlus } from "react-icons/fa6";
const HomeHeader = () => {
    return (
        <header>
            <nav>
                <ul className="nav-list">
                    <li className="nav-links link-1">
                        <FaCalendarDays />
                        <Link to="/">All Events</Link>
                    </li>
                    <li className="nav-links link-2">
                        <FaArrowRightToBracket />
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="nav-links link-3">
                        <FaUserPlus />
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HomeHeader