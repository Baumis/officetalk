import './Message.css';

function Message(props) {

    const myMessage = () => {
        if(props.message.author === "Axel Baumgartner"){
            return ' my-message'
        }
    }

    return (
        <div className={`message ${myMessage()}`}>
            <div className="message-buble">
                <div className="message-author">
                    {props.message.author}
                </div>
                <div className="message-content">
                    {props.message.content}
                </div>
            </div>
        </div>
    );
}

export default Message