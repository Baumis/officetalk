import './Hallway.css'
import { observer } from 'mobx-react'
const Hallway = observer((props) => {
    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`} onClick={(event) => props.move(event, -1, 1)}>
        </div>
    );
})

export default Hallway