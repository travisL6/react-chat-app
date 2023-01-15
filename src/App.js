import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {

    if(!localStorage.getItem('username')) return <LoginForm />

    function handleLogout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
        <ChatEngine 
            height="100vh"
            projectID="0790574b-3bb8-418a-8302-9190b3d695cc"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed { ...chatAppProps } /> }
        />
        <button id="logout-button" onClick={handleLogout}>Log Out</button>
        </>
    )

    
}

export default App;