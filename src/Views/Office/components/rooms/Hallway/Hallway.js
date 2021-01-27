import './Hallway.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../..'
const Hallway = observer((props) => {
    const userStore = rootstore.userStore
    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onClick={(event) => props.move(event, -1, userStore.user._id)}>
        </div>
    );
})

export default Hallway