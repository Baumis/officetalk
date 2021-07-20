import './Toggler.css'
import { useEffect, useState } from 'react'

const Toggler = (props) => {

    return (
        <div className="toggler">
            <label className="switch">
                <input
                    type={"checkbox"}
                    onChange={props.onChange}
                    checked={props.value}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Toggler