import { useState } from "react"
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authObject = { 'Project-ID': "0790574b-3bb8-418a-8302-9190b3d695cc", 'User-Name': username, 'User-Secret': password}
        const authObject2 = { 'Private-key': "c6508b4a-e313-4618-8425-2d17655d2a34"}

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject })
            .then(() => {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                window.location.reload();
            })
            .catch(() =>{
                let formData = new FormData();
                formData.append('username', username);
                formData.append('secret', password);
                axios.post('https://api.chatengine.io/users', formData, { headers: authObject2 })
                .then(() => {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    window.location.reload();
                })
                .catch((error) =>{
                    console.log(error);
                })
            })
        } catch (error) {
            setError('Incorrect username or password. Please try again.')
        }
    }

    /* const handleSignUp = () => {
        
    } */

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Log In</span>
                        </button>
                    </div>
                    <h2 className="error">
                        {error}
                    </h2>
                </form>
                {/* <div align="center">
                    <button className="button" onClick={handleSignUp}>
                        <span>Sign Up</span>
                    </button>
                </div> */}
                <p align="center">Made by Travis Lambert</p>
                <p align="center"><a href="https://www.linkedin.com/in/travis-lambert-450261195/"><i class="fa-brands fa-linkedin"></i></a><a href="https://github.com/travisL6"><i class="fa-brands fa-github"></i></a></p>
            </div>
        </div>
    )
}

export default LoginForm;