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
            disconnectPeer: action
        })
    }

    connectToPeers = async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            this.stream = stream

            if (this.isInitiatior()) {
                this.rootStore.officeStore.users.forEach(employee => {
                    if(employee.employeeId !== this.rootStore.userStore.user._id){
                        console.log('createPeer')
                        console.log(employee.employeeId, this.rootStore.userStore.user._id)
                        this.createPeer(employee.employeeId)
                    }
                })
            }

            this.rootStore.socketStore.socket.on('sendSignal', ({ signal, employeeId }) => {
                console.log('sendSignal received')
                this.addPeer(signal, employeeId)
            })

            this.rootStore.socketStore.socket.on('returnSignal', ({ signal, employeeId }) => {
                console.log('returnSignal received')
                const peer = this.peers.find(peer => peer.employeeId === employeeId)
                peer.peer.signal(signal)
            })
        })
    }

    addPeer = (signal, employeeId) => {
        const peer = new Peer({ initiator: false, trickle: false, stream: this.stream })
        this.peer.signal(signal)

        this.peer.on('signal', signal => {
            console.log('returnSignal sent')
            socket.returnSignal(signal, employeeId)
        })

        this.peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudios = [... this.peerAudios, { stream: stream, employeeId: employeeId }]
            })
        })

        this.peer.on('close', () => {
            console.log('connection closed')
            this.peer.destroy()
        })

        this.peer.on('error', (err) => {
            console.log('Peer error: ', err)
        })

        runInAction(() => {
            this.peers = [... this.peers, { peer: peer, employeeId: employeeId }]
        })
    }

    createPeer = (employeeId) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: this.stream })

        peer.on('signal', signal => {
            console.log('sendSignal sent')
            socket.sendSignal(signal)
        })

        peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudio = stream
            })
        })

        peer.on('close', () => {
            console.log('connection closed')
            this.peer.destroy()
        })

        peer.on('error', (err) => {
            console.log('Peer error: ', err)
        })

        runInAction(() => {
            this.peers = [... this.peers, { peer: peer, employeeId: employeeId }]
        })
    }

    disconnectPeer = () => {
        this.peer.destroy()
    }

    isInitiatior = () => {
        return this.rootStore.officeStore.users.length > 1
    }
}

export default MediaStore