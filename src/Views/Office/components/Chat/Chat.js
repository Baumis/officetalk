import { useState } from 'react'
import { observer } from 'mobx-react'
import './Chat.css';
import Message from './Message/Message';
import { rootstore } from '../../../../index'

const Chat = observer((props) => {
    const [message, setMessage] = useState('')
    const officeStore = rootstore.officeStore

    const sendMessage = () => {
        officeStore.sendMessage(message)
        setMessage('')
    }

    return (
        <div className="chat block-shadow">
            <div className="chat-messages">
                {officeStore.messages.map((message, key) =>
                    <Message key={key} message={message} />
                )}
            </div>
            <div className="chat-controls">
                <input
                    value={message}
                    placeholder={'Say something'}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <div className="chat-send" onClick={sendMessage}>
                    send
                </div>
            </div>
        </div>
    )
})

export default Chat