import { makeObservable, observable, action, runInAction } from 'mobx'
import Peer from 'simple-peer'

class MediaStore {
    rootStore = null
    stream = null
    peer = null
    peerAudio = null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this, {
            rootStore: observable,
            stream: observable,
            peerAudio: observable,
            peer: observable,
            connectToPeers: action,
            disconnectPeer: action
        })
    }

    connectToPeers = async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            this.stream = stream

            if (this.isInitiatior()) {
                console.log('createPeer')
                this.createPeer()
            } else {
                console.log('AddPeer')
                this.addPeer()
            }

            this.rootStore.socketStore.socket.on('callAccepted', signal => {
                console.log('callAccepted')
                this.peer.signal(signal)
            })
        })
    }

    addPeer = () => {
        this.peer = new Peer({ initiator: false, trickle: false, stream: this.stream })

        this.peer.on('signal', data => {
            console.log('emiting signal')
            this.rootStore.socketStore.socket.emit('startCall', data)
        })

        this.peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudio = stream
            })
        })

        this.peer.on('close', () => {
            console.log('connection closed')
            this.peer.destroy()
        })

        this.peer.on('error', (err) => {
            console.log('Peer error: ', err)
        })
    }

    createPeer = () => {
        this.peer = new Peer({ initiator: true, trickle: false, stream: this.stream })

        this.peer.on('signal', data => {
            console.log('emiting signal')
            this.rootStore.socketStore.socket.emit('startCall', data)
        })

        this.peer.on('stream', stream => {
            console.log('stream received')
            runInAction(() => {
                this.peerAudio = stream
            })
        })

        this.peer.on('close', () => {
            console.log('connection closed')
            this.peer.destroy()
        })

        this.peer.on('error', (err) => {
            console.log('Peer error: ', err)
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