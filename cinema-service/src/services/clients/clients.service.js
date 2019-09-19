// Initializes the `clients` service on path `/clients`
const Clients  = require('./clients.class')
const hooks = require('./clients.hooks')

module.exports = function (app) {
  
    const paginate = app.get('paginate')
    const {uri}    = app.get('users-service')

    const options = {
        paginate,
        uri
    }

    // Initialize our service with any options it requires
    app.use('/clients', Clients(options, app))

    // Get our initialized service so that we can register hooks
    const service = app.service('clients')

    service.hooks(hooks)
}
