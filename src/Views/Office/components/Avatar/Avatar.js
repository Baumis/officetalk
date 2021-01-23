import './Avatar.css';

const Avatar = (props) => {
    return (
        <div className="avatar" style={{
            top: props.user.position.cordinates.y,
            left: props.user.position.cordinates.x
        }}>
        </div>
    );
}

export default Avatar