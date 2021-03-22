module.exports = class messageController {
    constructor() {
        this.messages = [];
    }

    getMessages = () => {
        return this.messages;
    }

    reciveMessage = message => {
        this.messages.push(message);
    }

    clearMessages = () => {
        this.messages = [];
    }

}