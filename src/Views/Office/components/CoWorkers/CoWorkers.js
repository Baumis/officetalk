import './CoWorkers.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'
import { FiChevronsRight } from 'react-icons/fi'


const CoWorkers = observer((props) => {
    const officeStore = rootstore.officeStore

    const isOnline = (employee) => {
        return officeStore.users.find(user => user.userId === employee._id)
    }

    return (
        <div className="coworkers block-shadow" style={{ right: props.show ? '0px' : '-250px' }}>
            <div className="coworkers-header">
                Co-workers
            </div>
            <div className="coworkers-header-back" onClick={() => props.close()}>
                <FiChevronsRight size={25} />
            </div>
            <div className="coworkers-names">
                {officeStore.organization.employees.map(employee => {
                    return (
                        <div className="coworkers-user">
                            <div className="coworkers-user-avatar" style={{backgroundImage: `url(${employee.avatar})`}}></div>
                            <div className={`coworkers-user-name ${isOnline(employee) && 'user-online'}`}> {employee.name} </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default CoWorkers;