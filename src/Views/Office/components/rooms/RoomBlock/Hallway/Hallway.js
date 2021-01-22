import './Hallway.css'
import { rootstore } from '../../../../../../index'
import { observer } from 'mobx-react'

const Hallway = observer((props) => {
    const officeStore = rootstore.officeStore

    const roomGrid = () => {
        const grid = []
        for (let i = 0; i < 8; i++) {
            grid.push(
                <div className="hallway-square" key={i} onClick={() => officeStore.changePosition(1, { room: props.id, position: i })}>
                    {officeStore.users.find(user => user.position.room === props.id && user.position.position === i) &&
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
})

export default Hallway