import {useState, useContext} from 'react'
import './Chat.css';
import Message from './Message/Message';
import { StoreContext } from '../../../../index'

function Chat(props) {
    const [message, setMessage] = useState('')
    const officeStore = useContext(StoreContext).officeStore

    return (
        <div className="chat block-shadow">
            <div className="chat-messages">
                {officeStore.messages.map(message => 
                    <Message message={message}/>
                )}
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