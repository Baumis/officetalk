import Dots from '../Dots/Dots';
import './Loading.css';

const Loading = (props) => {
    return (
        <div className="loading">
            <div className="loading-text">Loading Office</div>
            <Dots />
        </div>
    )
}

export default Loading