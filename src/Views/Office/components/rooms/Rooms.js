import { useContext, useState } from 'react'
import './Rooms.css'
import { observer } from 'mobx-react';
import RoomBlock from './RoomBlock/RoomBlock'
import { StoreContext } from '../../../../index'

const Rooms = observer(() => {
    const officeStore = useContext(StoreContext).officeStore
    const roomsCount = officeStore.rooms.length
    const [users, setUsers] = useState([{ name: 'A', room: -1, position: 0 }])

    const setPosition = ({name, room, position}) => {
        const usersFiltered = users.filter(user => user.name !== name)
        console.log(usersFiltered)
        usersFiltered.push({ name: name, room: room, position: position })
        console.log(usersFiltered)
        setUsers(usersFiltered)
    } 

    if (roomsCount < 3) {
        return (
            <div className="rooms">
                <RoomBlock
                    first
                    display
                    minimal
                    displayBoth={false}
                    roomTop={{ ...officeStore.rooms[0], id: 0 }}
                    hallwayId={-1}
                    setPosition={setPosition}
                    users={users}
                />
                <RoomBlock
                    last
                    display
                    minimal
                    displayBoth={false}
                    roomTop={{ ...officeStore.rooms[1], id: 1 }}
                    hallwayId={-2}
                    setPosition={setPosition}
                    users={users}
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
                    roomTop={officeStore.rooms.length >= 0 && { ...officeStore.rooms[0], id: 0 }}
                    roomBottom={officeStore.rooms.length >= 1 && { ...officeStore.rooms[1], id: 1 }}
                    hallwayId={-1}
                    setPosition={setPosition}
                    users={users}
                />
                <RoomBlock
                    last={roomsCount === 3 || roomsCount === 4}
                    displayBoth={roomsCount >= 4}
                    display={roomsCount >= 3}
                    roomTop={officeStore.rooms.length >= 2 && { ...officeStore.rooms[2], id: 2 }}
                    roomBottom={officeStore.rooms.length >= 3 && { ...officeStore.rooms[3], id: 3 }}
                    hallwayId={-2}
                    setPosition={setPosition}
                    users={users}
                />
                <RoomBlock
                    last={roomsCount === 5 || roomsCount === 6}
                    displayBoth={roomsCount >= 6}
                    display={roomsCount >= 5}
                    roomTop={officeStore.rooms.length >= 4 && { ...officeStore.rooms[4], id: 4 }}
                    roomBottom={officeStore.rooms.length >= 5 && { ...officeStore.rooms[5], id: 5 }}
                    hallwayId={-3}
                    setPosition={setPosition}
                    users={users}
                />
                <RoomBlock
                    last={roomsCount === 7 || roomsCount === 8}
                    displayBoth={roomsCount >= 8}
                    display={roomsCount >= 7}
                    roomTop={officeStore.rooms.length >= 6 && { ...officeStore.rooms[6], id: 6 }}
                    roomBottom={officeStore.rooms.length >= 7 && { ...officeStore.rooms[7], id: 7 }}
                    hallwayId={-4}
                    setPosition={setPosition}
                    users={users}
                />
                <RoomBlock
                    last={roomsCount === 9 || roomsCount === 10}
                    displayBoth={roomsCount >= 10}
                    display={roomsCount >= 9}
                    roomTop={officeStore.rooms.length >= 8 && { ...officeStore.rooms[8], id: 8 }}
                    roomBottom={officeStore.rooms.length >= 9 && { ...officeStore.rooms[9], id: 9 }}
                    hallwayId={-5}
                    setPosition={setPosition}
                    users={users}
                />
            </div>
        )
    }
})

export default Rooms