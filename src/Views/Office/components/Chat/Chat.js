import { useState } from 'react'
import { observer } from 'mobx-react'
import './Chat.css';
import Message from './Message/Message';
import { rootstore } from '../../../../index'
import Dots from '../Dots/Dots';

const Chat = observer((props) => {
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const officeStore = rootstore.officeStore

    const sendMessage = async () => {
        setSending(true)
        const response = await officeStore.sendMessage(message)
        setSending(false)
        setMessage('')
        if (!response) {
            window.alert('sending message failed')
        }
    }

    return (
        <div className="chat block-shadow">
            <div className="chat-messages">
                {officeStore.office.messages.map((message, key) =>
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
                    {sending ?
                        <Dots />
                        :
                        'send'
                    }
                </div>
            </div>
        </div>
    )
})

export default Chat