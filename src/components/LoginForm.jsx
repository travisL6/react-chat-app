import { useState } from "react"
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authObject = { 'Project-ID': "0790574b-3bb8-418a-8302-9190b3d695cc", 'User-Name': username, 'User-Secret': password}
        
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject })
            .then(() => {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                window.location.reload();
            })
        } catch (error) {
            setError('Incorrect username or password. Please try again.')
        }
    }

    function goToSignUp() {
        document.getElementById('sign-up-form').style.display = "inherit";
        document.getElementById('initialSignUp').style.display = "none";
        document.getElementById('log-in-form').style.display = "none";
    }

    const handleSignUpCompletion = async (event) => {
        event.preventDefault();
        const authKey = { 'Private-key': "c6508b4a-e313-4618-8425-2d17655d2a34"}
        let formData = new FormData();
        
        formData.append('username', username);
        formData.append('secret', password);
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('custom_json', avatar);
        try {
            axios.post('https://api.chatengine.io/users', formData, { headers: authKey })
            .then(() => {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                window.location.reload();
            })
        } catch (error) {
            setError('Please try again.')
        }
    }

    function handleBack() {
        document.getElementById('sign-up-form').style.display = "none";
        document.getElementById('initialSignUp').style.display = "inherit";
        document.getElementById('log-in-form').style.display = "inherit";
    }
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat App</h1>
                <form id="log-in-form" onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" id="user" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" id="pass" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button" id="log-in-button">
                            <span>Log In</span>
                        </button>
                    </div>
                </form>
                <form id="sign-up-form" onSubmit={handleSignUpCompletion} style={{display: "none"}}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" id="email" placeholder="Email" required />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" id="firstName" placeholder="First Name" required />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" id="lastName" placeholder="Last Name" required />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" id="user" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" id="pass" placeholder="Password" required />
                    <label id="avatar-label">Choose a profile picture:</label>
                    <input type="file" value={avatar} onChange={(e) => setAvatar(e.target.value)} className="label" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
                    <div align="center">
                        <button id="back-button" className = 'button' onClick={handleBack}>Back</button>
                        <button type="submit" id="finalSignUp" className='button' onClick={handleSignUpCompletion}>
                            <span>Sign Up</span>
                        </button>
                    </div>
                </form>
                <div align="center">
                    <button id="initialSignUp" className='button' onClick={goToSignUp}>
                        <span>Sign Up</span>
                    </button>
                </div>
                <h2 className="error">
                        {error}
                </h2>
                <p align="center">Made by Travis Lambert</p>
                <p align="center"><a href="https://www.linkedin.com/in/travis-lambert-450261195/"><i className="fa-brands fa-linkedin"></i></a><a href="https://github.com/travisL6"><i className="fa-brands fa-github"></i></a></p>
            </div>
        </div>
    )
    
}

export default LoginForm;