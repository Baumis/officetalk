import './Hallway.css'
import { rootstore } from '../../../../../../index'
import { observer } from 'mobx-react'

const Hallway = observer((props) => {
    const officeStore = rootstore.officeStore

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`}>
        </div>
    );
})

export default Hallway