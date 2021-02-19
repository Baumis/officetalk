import { makeObservable, observable, action, runInAction } from 'mobx'
import Peer from 'simple-peer'
import socket from '../Services/Socket'

class MediaStore {
    rootStore = null
    stream = null
    peers = []
    peerAudios = []

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            stream: observable,
            peerAudios: observable,
            peers: observable,
            connectToPeers: action,
            endAllConnections: action
        })
    }

    connectToPeers = async (iceServers) => {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            this.stream = stream
            const usersInRoom = this.getRoomUsers()

            if (usersInRoom.length > 1) {
                usersInRoom.forEach(employee => {
                    if (employee.employeeId !== this.rootStore.userStore.user._id) {
                        console.log('createPeer')
                        this.createPeer(employee.employeeId, iceServers)
                    }
                })
            }

            this.rootStore.socketStore.socket.on('sendSignal', ({ signal, employeeId }) => {
                console.log('sendSignal received')
                this.addPeer(signal, employeeId, iceServers)
            })

            this.rootStore.socketStore.socket.on('returnSignal', ({ signal, employeeId }) => {
                console.log('returnSignal received')
                const peer = this.peers.find(peer => peer.employeeId === employeeId)
                peer.peer.signal(signal)
            })
        })
    }

    addPeer = (signal, employeeId, iceServers) => {
        const peer = new Peer({ initiator: false, trickle: false, stream: this.stream, config: { iceServers } })
        peer.signal(signal)

        peer.on('signal', signal => {
            console.log('returnSignal sent')
            socket.returnSignal(employeeId, signal)
        })

        peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudios = [...this.peerAudios, { stream: stream, employeeId: employeeId }]
            })
        })

        peer.on('close', () => {
            console.log('connection closed')
            this.endPeerConnection(employeeId)
        })

        peer.on('error', (err) => {
            console.log('Peer error: ', err)
        })

        runInAction(() => {
            this.peers = [...this.peers, { peer: peer, employeeId: employeeId }]
        })
    }

    createPeer = (employeeId, iceServers) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: this.stream, config: { iceServers } })

        peer.on('signal', signal => {
            console.log('sendSignal sent')
            socket.sendSignal(employeeId, signal)
        })

        peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudios = [...this.peerAudios, { stream: stream, employeeId: employeeId }]
            })
        })

        peer.on('close', () => {
            console.log('connection closed')
            this.endPeerConnection(employeeId)
        })

        peer.on('error', (err) => {
            console.log('Peer error: ', err)
        })

        runInAction(() => {
            this.peers = [...this.peers, { peer: peer, employeeId: employeeId }]
        })
    }

    getRoomUsers = () => {
        const myId = this.rootStore.userStore.user._id
        const myState = this.rootStore.officeStore.users.find(user => user.employeeId === myId)
        const myRoom = myState.position.room
        const roomUsers = this.rootStore.officeStore.users.filter(user => user.position.room === myRoom)
        console.log('Users in the room:', roomUsers)
        return roomUsers
    }

    endAllConnections = () => {
        console.log('ending all connections')
        this.peers.forEach(peer => peer.peer.destroy())
        runInAction(() => {
            this.peers = []
            this.peerAudios = []
        })
    }

    endPeerConnection = (employeeId) => {
        const peers = this.peers.filter(user => user.employeeId !== employeeId)
        const audios = this.peerAudios.filter(user => user.employeeId !== employeeId)

        runInAction(() => {
            this.peers = peers
            this.peerAudios = audios
            console.log('after signout', this.peerAudios)
        })
    }
}

export default MediaStore