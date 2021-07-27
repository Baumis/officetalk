import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import './Chat.css';
import Message from './Message/Message'
import { rootstore } from '../../../../index'
import Dots from '../Dots/Dots'
import { AiOutlineSend, AiOutlineInfoCircle } from 'react-icons/ai'

const Chat = observer((props) => {
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [activeChat, setActiveChat] = useState('office')
    const { officeStore, userStore } = rootstore

    useEffect(() => {
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [message])

    const handleKey = (event) => {
        if (event.keyCode === 13) {
            sendMessage()
        }
    }

    const sendMessage = async () => {
        setSending(true)
        const response = await officeStore.sendMessage(message)
        setSending(false)
        setMessage('')
        if (!response) {
            window.alert('sending message failed')
        }
    }

    const sendRoomMessage = () => {
        setSending(true)
        officeStore.sendRoomMessage(message)
        setSending(false)
        setMessage('')
    }

    const getCurrentRoom = () => {
        const user = officeStore.users.find(user => user.employeeId === userStore.user._id)
        if (!user) {
            return 'loading...'
        }
        const roomId = user.position.room

        if (roomId === -1) {
            return "Hallway"
        } else {
            return officeStore.organization.rooms.find(room => room._id === roomId).name
        }
    }

    const messagesToDisplay = () => {
        return activeChat === 'office' ? officeStore.organization.messages : officeStore.roomMessages
    }

    return (
        <div className="chat block-shadow">
            <div className="chat-tabs block-shadow">
                <div className={`chat-tab ${activeChat === 'office' && 'chat-tab-active'}`} onClick={() => setActiveChat('office')}>Office</div>
                <div className={`chat-tab ${activeChat === 'room' && 'chat-tab-active'}`} onClick={() => setActiveChat('room')}>{getCurrentRoom()}</div>
            </div>
            {activeChat === 'room' &&
                <div className="chat-messages-warning">
                    <AiOutlineInfoCircle style={{marginRight: '5px'}} size={18}/>Message history is not saved in rooms.
            </div>}
            <div className="chat-messages">
                {messagesToDisplay().map((message, key) =>
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
                    <div className="chat-send" onClick={activeChat === 'office' ? sendMessage : sendRoomMessage}>
                        {sending ?
                            <Dots />
                            :
                            <AiOutlineSend size={25} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Chat