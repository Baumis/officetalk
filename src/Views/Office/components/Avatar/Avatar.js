import './Avatar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'

const Avatar = observer((props) => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore

    const getUserAvatar = () => {
        const user = officeStore.organization.employees.find(empl => empl._id === props.user.userId)
        if (!user) {
            return 'laoding...'
        } else {
            return user.avatar
        }
    }

    return (
        <div className="avatar" style={{
            top: props.user.position.coordinates.y,
            left: props.user.position.coordinates.x,
            transition: `all ${props.user.transitionTime}s ease-in-out`,
            border: `2px solid ${props.user.userId === userStore.user._id ? '#1CBF73' : 'black'}`,
            backgroundImage: `url(${getUserAvatar()})`
        }}>
        </div>
    )
})

export default Avatar