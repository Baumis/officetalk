import './Furniture.css'
import { observer } from 'mobx-react'

const Furniture = observer((props) => {

    return (
        <div className={`furniture ${props.furniture.type}`} style={{
            top: props.furniture.position.y,
            left: props.furniture.position.x,
            height: props.furniture.height,
            width: props.furniture.width
        }}>
        </div>
    )
})

export default Furniture