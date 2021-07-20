import './HallwayModel.css'
import { observer } from 'mobx-react'

const HallwayModel = observer((props) => {

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`}>
        </div>
    );
})

export default HallwayModel