const userModel = new (require('../model/userModel'));
const { getIp } = require('../app/helper');

module.exports = class userController {

    users = {};

    getAddress = async (string) => {
        let address = getIp(string);
        if (address === false) return false;
        let name = await userModel.getName(address);
        if (typeof name === 'undefined' || name.length === 0) return false;

        return name;
    }

    addUser = (fullName, name, color) => {
        this.users[fullName] = { name: name, color: color };
    }

    isUserOnline = (fullName) => {
        return typeof this.users[fullName] !== 'undefined';
    }

    getUserColor = (fullName) => {
        return this.users[fullName] ? this.users[fullName].color : 'black'
    }

    clearUsers = () => {
        this.users = {};
    }
}