import './Dots.css'

const Dots = (props) => {
    return (
        <div className={`dots ${props.white && 'white'}`}>
            <div className="snippet" data-title=".dot-hourglass">
                <div className="stage">
                    <div className="dot-flashing"></div>
                </div>
            </div>
        </div>
    )
}

export default Dots
