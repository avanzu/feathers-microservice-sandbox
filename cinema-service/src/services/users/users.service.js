// Initializes the `clients` service on path `/clients`
const createService  = require('./users.class')
const hooks = require('./users.hooks')

module.exports = function (app) {
  
    const paginate = app.get('paginate')
    const {uri}    = app.get('users-service')

    const options = {
        paginate,
        uri
    }

    // Initialize our service with any options it requires
    app.use('/users', createService(options, app))

    // Get our initialized service so that we can register hooks
    const service = app.service('users')

    service.hooks(hooks)
}
