import './Rooms.css'
import { observer } from 'mobx-react';
import RoomBlock from './RoomBlock/RoomBlock'
import { rootstore } from '../../../../index'

const Rooms = observer(() => {
    const officeStore = rootstore.officeStore
    const roomsCount = officeStore.office.rooms.length

    if (roomsCount < 3) {
        return (
            <div className="rooms">
                <RoomBlock
                    first
                    display
                    minimal
                    displayBoth={false}
                    roomTop={{ ...officeStore.office.rooms[0], id: 0 }}
                    hallwayId={-1}
                />
                <RoomBlock
                    last
                    display
                    minimal
                    displayBoth={false}
                    roomTop={{ ...officeStore.office.rooms[1], id: 1 }}
                    hallwayId={-2}
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
                    roomTop={officeStore.office.rooms.length >= 0 && { ...officeStore.office.rooms[0], id: 0 }}
                    roomBottom={officeStore.office.rooms.length >= 1 && { ...officeStore.office.rooms[1], id: 1 }}
                    hallwayId={-1}
                />
                <RoomBlock
                    last={roomsCount === 3 || roomsCount === 4}
                    displayBoth={roomsCount >= 4}
                    display={roomsCount >= 3}
                    roomTop={officeStore.office.rooms.length >= 2 && { ...officeStore.office.rooms[2], id: 2 }}
                    roomBottom={officeStore.office.rooms.length >= 3 && { ...officeStore.office.rooms[3], id: 3 }}
                    hallwayId={-2}
                />
                <RoomBlock
                    last={roomsCount === 5 || roomsCount === 6}
                    displayBoth={roomsCount >= 6}
                    display={roomsCount >= 5}
                    roomTop={officeStore.office.rooms.length >= 4 && { ...officeStore.office.rooms[4], id: 4 }}
                    roomBottom={officeStore.office.rooms.length >= 5 && { ...officeStore.office.rooms[5], id: 5 }}
                    hallwayId={-3}
                />
                <RoomBlock
                    last={roomsCount === 7 || roomsCount === 8}
                    displayBoth={roomsCount >= 8}
                    display={roomsCount >= 7}
                    roomTop={officeStore.office.rooms.length >= 6 && { ...officeStore.office.rooms[6], id: 6 }}
                    roomBottom={officeStore.office.rooms.length >= 7 && { ...officeStore.office.rooms[7], id: 7 }}
                    hallwayId={-4}
                />
                <RoomBlock
                    last={roomsCount === 9 || roomsCount === 10}
                    displayBoth={roomsCount >= 10}
                    display={roomsCount >= 9}
                    roomTop={officeStore.office.rooms.length >= 8 && { ...officeStore.office.rooms[8], id: 8 }}
                    roomBottom={officeStore.office.rooms.length >= 9 && { ...officeStore.office.rooms[9], id: 9 }}
                    hallwayId={-5}
                />
            </div>
        )
    }
})

export default Rooms