import './ControlPanel.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../index'
import Navbar from './components/Navbar/Navbar'
import Employees from './components/Employees/Employees'

const ControlPanel = observer((props) => {
    return (
        <div className="controlPanel">
            <Navbar 
                navigateTo={props.navigateTo}
            />
            <div className="controlPanel-body">
                <Employees />
            </div>
        </div>
    )
})

export default ControlPanel