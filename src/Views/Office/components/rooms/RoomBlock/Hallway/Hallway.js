import './Hallway.css'

function Hallway(props) {

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'} ${props.bottomBorder && 'bottom-border'}`}>
            
        </div>
    );
}

export default Hallway