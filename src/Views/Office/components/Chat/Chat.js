import { useState } from 'react'
import { observer } from 'mobx-react'
import './Chat.css';
import Message from './Message/Message'
import { rootstore } from '../../../../index'
import Dots from '../Dots/Dots'
import { AiOutlineSend } from 'react-icons/ai'

const Chat = observer((props) => {
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [activeChat, setActiveChat] = useState('office')
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore

    const sendMessage = async () => {
        setSending(true)
        const response = await officeStore.sendMessage(message)
        setSending(false)
        setMessage('')
        if (!response) {
            window.alert('sending message failed')
        }
    }

    const getCurrentRoom = () => {
        const user = officeStore.users.find(user => user.userId === userStore.user._id)
        if(!user){
            return 'loading...'
        }
        const roomId = user.position.room

        if (roomId === -1) {
            return "Hallway"
        } else {
            return officeStore.office.rooms.find(room => room._id === roomId).name
        }
    }

    return (
        <div className="chat block-shadow">
            <div className="chat-tabs block-shadow">
                <div className={`chat-tab ${activeChat === 'office' && 'chat-tab-active'}`} onClick={() => setActiveChat('office')}>Office</div>
                <div className={`chat-tab ${activeChat === 'room' && 'chat-tab-active'}`} onClick={() => setActiveChat('room')}>{getCurrentRoom()}</div>
            </div>
            <div className="chat-messages">
                {rootstore.officeStore.office.messages.map((message, key) =>
                    <Message key={key} message={message} />
                )}
            </div>
            <div className="chat-controls">
                <div className="chat-input-container">
                    <input
                        value={message}
                        placeholder={'Say something'}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <div className="chat-send" onClick={sendMessage}>
                        {sending ?
                            <Dots />
                            :
                            <AiOutlineSend size={30}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Chat