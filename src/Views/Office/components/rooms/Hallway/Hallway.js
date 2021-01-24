import './Hallway.css'
import { rootstore } from '../../../../../index'
import { observer } from 'mobx-react'
import Avatar from '../../Avatar/Avatar'
const Hallway = observer((props) => {
    const officeStore = rootstore.officeStore

    const moveToPosition = (event) => {
        const bounderies = event.target.getBoundingClientRect();
        const positionX = event.clientX - bounderies.left
        const positionY = event.clientY - bounderies.top
        officeStore.changePosition(1, { room: props.id, cordinates: { x: positionX, y: positionY } })
    }

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onClick={(event) => moveToPosition(event)}>
            {officeStore.users.map(user => user.position.room === props.id && <Avatar key={user.id} user={user} />)}
        </div>
    );
})

export default Hallway