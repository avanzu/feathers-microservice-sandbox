const users = require('./users/users.service.js')
const cinemas = require('./cinemas/cinemas.service.js')
const clients = require('./clients/clients.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users)
    app.configure(cinemas)
    app.configure(clients);
}
