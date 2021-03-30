import { useEffect, useState } from 'react'
import './ControlPanel.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../index'

const ControlPanel = observer((props) => {
    const { organizationStore } = rootstore

    const createOffice = async () => {
        await organizationStore.createOffice()
    }

    if (!organizationStore.office) {
        console.log(organizationStore.office)
        return (
            <div className="office">
                <div onClick={() => createOffice()}>Create office</div>
            </div>
        )
    }

    return (
        <div className="office">
            <div className="office-body">
                {organizationStore.organization.name}
                {organizationStore.organization.employees.map(employee =>
                    <div>
                        {employee}
                    </div>
                )}
            </div>
        </div>
    )
})

export default ControlPanel