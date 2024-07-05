import { FaDatabase, FaSpinner } from "react-icons/fa6";

const UserProfile = ({ logUser, noDataFound, new_first_name, new_last_name, new_email, new_username, new_password, imageUrl, handleImageUpload, setNewFirstName, setNewLastName, setNewEmail, setNewUserName, setNewPassword, imageName, handleUpdate, updateMessage, setUpdateMessage, password }) => {
    const inputFileStyle = {
        display: "none",

    };
    const LabelFileStyle = {
        cursor: "pointer",
    }
    return (
        <section className="profile-section">
            {logUser.length ? logUser[0].isLoggedin ? (
                <div className="profile-section-div">
                    <div className="upload-div">
                        <div className="upload-div-1">
                            <div className="upload-div-1-1"><img src={imageUrl} alt="User's profile pic" /></div>
                            <div className="upload-div-1-2">
                                <p>Upload a Newphoto</p>
                                <p>{imageName}</p>
                            </div>
                        </div>
                        <div className="upload-div-2">
                            <label htmlFor="imageUpload" style={LabelFileStyle}><span>Upload</span></label>
                            <input style={inputFileStyle} type="file" id="imageUpload" accept="image/*" onChange={(e) => handleImageUpload(e, logUser[0].id)} />
                        </div>
                    </div>
                    <div className="personal-info-div">
                        <form method="post" onSubmit={(e) => handleUpdate(e, logUser[0].id)}>
                            {updateMessage ? (<div className="updateMessage">{updateMessage}</div>) : null}
                            <div className="personal-info-div-1">
                                <p>
                                    <label htmlFor="first_name">firstname: </label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={new_first_name}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="last_name">lastname: </label>
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={new_last_name}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div className="personal-info-div-2">
                                <p>
                                    <label htmlFor="email">email: </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={new_email}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="username">username: </label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={new_username}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div className="personal-info-div-3">
                                <p>
                                    <label htmlFor="password">password: </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={new_password}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </p>
                            </div>
                            <div className="personal-info-div-4">
                                <button
                                    onMouseLeave={() => setUpdateMessage("")}
                                    type="submit"
                                >
                                    Update Information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="not-available try-login">Read Instructions at the side</div>
            ) : noDataFound ?
                <div className="not-available try-login database">
                    <FaDatabase />
                </div>
                : <div className="not-available try-login fetching">
                    <FaSpinner />
                </div>
            }
        </section>
    );
}

export default UserProfile;