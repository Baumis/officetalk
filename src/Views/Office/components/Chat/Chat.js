import { useState } from 'react';
import './Chat.css';

function Chat(props) {
    const [message, setMessage] = useState('')

    return (
        <div className="chat block-shadow">
            <div className="chat-messages">

            </div>
            <div className="chat-controls">
                <input 
                    value={message}
                    placeholder={'Say something'}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <div className="chat-send">
                    send
                </div>
            </div>
        </div>
    );
}

export default Chat;