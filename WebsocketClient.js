import { BehaviorSubject, Subject } from "rxjs";

class WebSocketClient {
    static instance = null;
    reconnect = true;
    socketSubject = new Subject();
    socketState = new Subject();

    static getInstance() {
        if (!WebSocketClient.instance) WebSocketClient.instance = new WebSocketClient();
        return WebSocketClient.instance;
    }

    constructor() {
        this.socketRef = null;
        this.connect();
    }

    subscribe = (callback) => {
        this.socketSubject.asObservable().subscribe(callback);
    }

    subscribeState = (callback) => {
        this.socketState.asObservable().subscribe(callback);
    }

    setData = (e) => {
        this.socketSubject.next(e)
    }

    sendJSON = (json) => {
        const socket = this.socketRef;
        const recursion = this.sendJSON;
        setTimeout(
            () => {
                if (socket && socket.readyState && socket.readyState === socket.OPEN) {
                    socket.send(JSON.stringify(json));
                    return;
                } else {
                    recursion(json);
                }
            },
        100);
    }

    connect = () => {
        const path = 'wss://socketsbay.com/wss/v2/1/demo/';
        this.socketRef = new WebSocket(path);

        this.socketRef.onopen = () => {
            console.log('Websocket open');
            this.socketState.next('OPEN'); // LOADING -> after auth, open

            // // AUTH
            // if(localStorage.getItem('wlnt')) {
            //     this.sendJSON({
            //         type: 'auth',
            //         payload: {
            //             token: localStorage.getItem('wlnt')
            //         }
            //     });
            // } else {
            //     this.socketState.next('OPEN');
            // }
        }

        this.socketRef.onmessage = e => {
            // socket tester
            var data = e.data;

            try {
                data = JSON.parse(data);
            } catch(error) {
                return;
            }
            this.setData(data);

            
            //DataStorage.authUser.next(Math.floor(Math.random() * 100) + 1);
            //DataStorage.modals.next('auth')
        };

        this.socketRef.onclose = () => {
            if(this.reconnect) {
                console.log("WebSocket closed let's reopen");
                this.socketState.next('CLOSED');
                this.connect();
            } else {
                console.log("WebSocket closed due to disconnect");
                this.socketState.next('DISCONNECTED');
            }
        };
    }
}

export default WebSocketClient.getInstance();