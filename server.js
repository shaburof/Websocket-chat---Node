console.clear();
console.log('-----------------------');
module.exports.debug = true;

const http = require('http');

const app = http.createServer(handler);

const ioHandlers = require('./ioHandlers');
const messageController = require('./controllers/messageController');
const MessageController = new messageController();
const UserController = new (require('./controllers/userController'));

new ioHandlers(app, MessageController, UserController);

app.listen(3001);

function handler(req, res) {
    res.writeHead(200);
    res.end('/index');
}
