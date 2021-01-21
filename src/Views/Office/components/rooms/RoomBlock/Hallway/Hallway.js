import './Hallway.css'

function Hallway(props) {

    return (
        <div className={`hallway ${props.first && 'first-block'} ${props.last && 'last-block'}`}>
            
        </div>
    );
}

export default Hallway