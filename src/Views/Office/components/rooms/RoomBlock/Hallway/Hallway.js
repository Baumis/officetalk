import './Hallway.css'

function Hallway(props) {

    const roomGrid = () => {
        const grid = []
        for (let i = 0; i < 8; i++) {
            grid.push(
                <div className="hallway-square" roomId={i} onClick={() => props.setPosition({ name: 'A', room: props.id, position: i })}>
                    {props.users.find(user => user.room === props.id && user.position === i) &&
                        <div className="user-avatar">
                        </div>
                    }
                </div>
            )
        }
        return grid
    }

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`}>
            {roomGrid()}
        </div>
    );
}

export default Hallway