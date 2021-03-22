const { getRandomColor, setStartDate } = require('./app/helper')
const { debug } = require('./server');

module.exports = class ioHandler {
    constructor(app, MessageController, UserController) {
        this.startDate = setStartDate();
        this.MessageController = MessageController;
        this.UserController = UserController;
        this.io = require('socket.io').listen(app);



        this.connect([
            this.disconnect,
            this.onGetMessages,
            this.reciveMessage
        ]);

        this.restartTimer();
    }

    restartTimer = () => {
        setInterval(() => {
            let curDate = new Date();
            if (curDate > this.startDate) {
                debug && console.log('restartTimer!!!')
                this.io.emit('restartServer');
                this.MessageController.clearMessages();
                this.UserController.clearUsers();
                this.startDate = setStartDate();
            }

        }, 1800000);
    }

    connect = (cbs) => {
        this.io.on('connection', async (client) => {
            let [userName, fullName] = await this.getName(client);
            debug && console.log('userName: ', userName);

            if (userName === false) client.emit('checkStatus', { status: false });
            else {
                client.emit('checkStatus', { status: true });
                client.userName = userName;
                client.fullName = fullName;
                client.color = getRandomColor();

                if (!this.UserController.isUserOnline(fullName)) {
                    this.UserController.addUser(fullName, userName, client.color);
                    // console.log('new client with id:', client.id, 'userName:', userName, ' color:', client.color);
                } else {
                    // console.log('client already online with id:', client.id, 'userName:', userName, ' color:', client.color);
                }

                for (const cb of cbs) cb(client);
            }
        });
    }

    getName = async (client) => {
        let userName = await this.UserController.getAddress(client.request.connection.remoteAddress);
        return [userName.split(' ')[0], userName];
    }


    disconnect(client) {
        client.on('disconnect', () => {
            debug && console.log('Disconnected client: ', client.id);
        });
    }

    onGetMessages = (client) => {
        client.on('getMessages', () => {
            let messages = this.MessageController.getMessages();
            debug && console.log('getMessages');
            debug && console.log('messages: ', messages);
            client.emit('getMessages', messages);
        });
    }

    reciveMessage = (client) => {
        client.on('sendMessage', data => {
            let color = this.UserController.getUserColor(client.fullName);
            let message = this.createMessage(client, data, color);
            debug && console.log('Recive message:', message);
            this.MessageController.reciveMessage(message);
            this.broadcast(message)
        })
    }

    createMessage = (client, text, color) => {
        return { user: client.userName, message: text, color: color, time: new Date() };
    }

    broadcast = message => {
        this.io.emit('broadcast', message);
    }

}