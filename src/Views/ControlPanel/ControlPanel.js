import { useEffect, useState } from 'react'
import './ControlPanel.css'
import { observer } from 'mobx-react'
import { rootstore } from '../../index'

const ControlPanel = observer((props) => {
    const { organizationStore } = rootstore
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const createEmployee = async () => {
        await organizationStore.createEmployee(
            {
                name: name,
                username: username,
                password: password
            }
        )
    }

    /*if (!organizationStore.office) {
        console.log(organizationStore.office)
        return (
            <div className="office">
                <div onClick={() => createOffice()}>Create office</div>
            </div>
        )
    }*/

    return (
        <div className="office">
            <div className="office-body">
                {organizationStore.organization.name}
                {organizationStore.organization.employees.map(employee =>
                    <div>
                        {employee}
                    </div>
                )}
                <div>
                    <input
                        placeholder={'Full Name'}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        placeholder={'Username'}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        placeholder={'Password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div onClick={() => createEmployee()}>Create Employee</div>
            </div>
        </div>
    )
})

export default ControlPanel