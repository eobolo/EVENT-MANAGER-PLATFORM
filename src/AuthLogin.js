const AuthLogin = ({ signupSuccess, username, password, setUserName, setPassword, signinError, handleLogin }) => {
    return (
        <section className="login-section">
            {signupSuccess ? (<div className="signupSuccess">
                {signupSuccess}
            </div>) : null}
            {signinError ? (
                <div>{signinError}</div>
            ) : null}
            <div>
                <h1>Login Here</h1>
            </div>
            <div>
                <form onSubmit={handleLogin}>
                    <p>
                        <span>
                            <label htmlFor="username">username: </label>
                        </span>
                        <span>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </span>
                    </p>
                    <p>
                        <label htmlFor="password">password: </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <p>
                        <button
                            type="submit"
                        >
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default AuthLogin