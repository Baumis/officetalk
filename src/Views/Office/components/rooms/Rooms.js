import { useContext } from 'react'
import './Rooms.css'
import { observer } from 'mobx-react';
import RoomBlock from './RoomBlock/RoomBlock'
import { StoreContext } from '../../../../index'

const Rooms = observer(() => {
    const officeStore = useContext(StoreContext).officeStore
    //const roomsCount = officeStore.rooms.length
    const roomsCount = 2

    if (roomsCount < 3) {
        return (
            <div className="rooms">
                <RoomBlock
                    first
                    display
                    displayBoth={false}
                    minimal
                />
                <RoomBlock
                    last
                    display
                    displayBoth={false}
                    minimal
                />
            </div>
        )
    } else {
        return (
            <div className="rooms">
                <RoomBlock
                    first
                    display
                    displayBoth
                />
                <RoomBlock
                    last={roomsCount === 3 || roomsCount === 4}
                    displayBoth={roomsCount >= 4}
                    display={roomsCount >= 3}
                />
                <RoomBlock
                    last={roomsCount === 5 || roomsCount === 6}
                    displayBoth={roomsCount >= 6}
                    display={roomsCount >= 5}
                />
                <RoomBlock
                    last={roomsCount === 7 || roomsCount === 8}
                    displayBoth={roomsCount >= 8}
                    display={roomsCount >= 7}
                />
                <RoomBlock
                    last={roomsCount === 9 || roomsCount === 10}
                    displayBoth={roomsCount >= 10}
                    display={roomsCount >= 9}
                />
            </div>
        )
    }
})

export default Rooms