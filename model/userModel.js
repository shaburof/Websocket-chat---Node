const cred = require('../credentials');

module.exports = class userModule {
    credentials;

    constructor() {
        this.credentials = cred;
        this.getConnection();
    }

    getConnection = () => {
        this.con = new Promise(async (resolve, reject) => {
            let mysql2 = require('mysql2/promise');
            let con = await mysql2.createConnection(this.credentials);
            resolve(con);
        });
    }

    getName = async (ip) => {
        try {
            const [result] = await (await this.con).execute("select name from login where ip = ? order by data desc limit 1", [ip]);
            if (result.length > 0) return result[0].name;
            else return '';
        } catch (e) {
            console.log(e);
        }
    }
}