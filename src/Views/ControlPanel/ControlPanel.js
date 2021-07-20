import './ControlPanel.css'
import { observer } from 'mobx-react'
import Navbar from './components/Navbar/Navbar'
import Employees from './components/Employees/Employees'
import OfficeEditor from './components/OfficeEditor/OfficeEditor'

const ControlPanel = observer((props) => {
    return (
        <div className="controlPanel">
            <Navbar 
                navigateTo={props.navigateTo}
            />
            <div className="controlPanel-body">
                <Employees />
                <OfficeEditor />
            </div>
        </div>
    )
})

export default ControlPanel