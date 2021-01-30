import './Avatar.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'

const Avatar = observer((props) => {
    const officeStore = rootstore.officeStore
    const userStore = rootstore.userStore

    return (
        <div className="avatar" style={{
            top: props.user.position.cordinates.y,
            left: props.user.position.cordinates.x,
            transition: `all ${props.user.transitionTime}s linear`,
            border: `2px solid ${props.user.id === userStore.user._id ? '#1CBF73' : 'black'}`,
            backgroundImage: `url(${officeStore.organization.employees.find(empl => empl._id === props.user.id).avatar})`
        }}>
        </div>
    )
})

export default Avatar