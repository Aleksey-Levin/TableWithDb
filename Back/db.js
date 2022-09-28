const {Client} = require('pg')
const client = new Client({
    user: "",
    password: "",
    host: "",
    port: 0,
    database: ""
})

client.connect();

module.exports = client;