import './Hallway.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../..'
import move from '../../../../../Hooks/Mover'

const Hallway = observer((props) => {
    const userStore = rootstore.userStore
    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onDoubleClick={(event) => move(event, -1, userStore.user._id)}>
        </div>
    );
})

export default Hallway