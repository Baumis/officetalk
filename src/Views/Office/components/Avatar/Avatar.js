import './Avatar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'

const Avatar = observer((props) => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore
    const user = officeStore.users.find(user => user.id === props.user.id)

    const isMe = () => {
        return props.user.id === userStore.user._id
    }

    console.log(user)

    return (
        <div className="avatar" style={{
            top: user.position.cordinates.y,
            left: user.position.cordinates.x,
            transition: `all ${user.transitionTime}s linear`,
            border: `2px solid ${isMe(user) ? '#1CBF73' : 'black'}`,
            backgroundImage: `url(${officeStore.office.employees})`
        }}>
        </div>
    )
})

export default Avatar