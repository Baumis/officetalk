import './Avatar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'

const Avatar = observer((props) => {
    const officeStore = rootstore.officeStore
    const user = officeStore.users.find(user => user.id === props.user.id)
    return (
        <div className="avatar" style={{
            top: user.position.cordinates.y,
            left: user.position.cordinates.x,
            transition: `all ${user.transitionTime}s linear`
        }}>
        </div>
    )
})

export default Avatar