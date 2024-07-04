const AuthSignUp = ({ first_name, last_name, email, username, password, setFirstName, setLastName, setEmail, setUserName, setPassword, handleSignUp, signupError, verifyPassword, setVerifyPassword }) => {
    return (
        <section className="signup-section">
            {signupError ? (<div className="signupError">
                {signupError}
            </div>) : null}
            <div>
                <h1>Sign Up Here</h1>
            </div>
            <div>
                <form method="post" encType="multipart/form-data" onSubmit={handleSignUp}>
                    <p>
                        <span>
                            <label htmlFor="first_name">firstname: </label>
                        </span>
                        <span>
                            <input
                                id="first_name"
                                type="text"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <span>
                            <label htmlFor="last_name">lastname: </label>
                        </span>
                        <span>
                            <input
                                id="last_name"
                                type="text"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <span>
                            <label htmlFor="email">email: </label>
                        </span>
                        <span className="span-email-input">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <span>
                            <label htmlFor="username">username: </label>
                        </span>
                        <span className="span-username-input">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <span>
                            <label htmlFor="password">password: </label>
                        </span>
                        <span>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <span>
                            <label htmlFor="verify_password">Verify password: </label>
                        </span>
                        <span className="span-verify-password-input">
                            <input
                                id="verify_password"
                                type="password"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <button
                            type="submit"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default AuthSignUp