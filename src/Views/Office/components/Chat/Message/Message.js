import UserStore from '../../../../../Stores/UserStore';
import './Message.css';
import { rootstore } from '../../../../../index'

function Message(props) {
    const userStore = rootstore.userStore

    const myMessage = () => {
        if(props.message.author._id === userStore.user._id){
            return ' my-message'
        }
    }

    return (
        <div className={`message ${myMessage()}`}>
            <div className="message-buble">
                <div className="message-author">
                    {props.message.author.name}
                </div>
                <div className="message-content">
                    {props.message.content}
                </div>
            </div>
        </div>
    );
}

export default Message