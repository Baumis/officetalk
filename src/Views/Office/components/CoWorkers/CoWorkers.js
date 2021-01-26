import './CoWorkers.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../../../index'


const CoWorkers = observer((props) => {
    const officeStore = rootstore.officeStore
    return (
        <div className="coworkers block-shadow" style={{right: props.show ? '0px' : '-250px'}}>
            <div className="coworkers-header">
                co-workers
            </div>
            <div className="coworkers-header-back" onClick={() => props.close()}>
                {'>'}
            </div>
            <div className="coworkers-names">
                {officeStore.organization.employees.map(employee => {
                    return <div className="coworkers-name"> {employee.name} </div>
                })}
            </div>
        </div>
    )
})

export default CoWorkers;