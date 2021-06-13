import { useState } from 'react'
import { observer } from 'mobx-react'
import './Employees.css';
import { rootstore } from '../../../../index'

const Employees = observer((props) => {
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

    return (
        <div className="employees block-shadow">
            <div className="employee-list">
                {organizationStore.organization.employees.map(employee =>
                    <div className="coworkers-user">
                        <div className="coworkers-user-avatar" style={{ backgroundImage: `url(${employee.avatar})` }}></div>
                        <div className={`coworkers-user-name`}> {employee} </div>
                    </div>
                )}
            </div>
            <div className="employee-controls">
                <div className="login-input-row">
                    <input
                        placeholder={'Full Name'}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="login-input-row">
                    <input
                        placeholder={'Username'}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="login-input-row">
                    <input
                        placeholder={'Password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="OTButton" onClick={() => createEmployee()}>Create Employee</div>
            </div>
        </div >
    )
})

export default Employees