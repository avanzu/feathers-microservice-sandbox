// Initializes the `cinemas` service on path `/cinemas`
const { Cinemas } = require('./cinemas.class')
const createModel = require('../../models/cinemas.model')
const hooks = require('./cinemas.hooks')

module.exports = function (app) {
    const Model = createModel(app)
    const paginate = app.get('paginate')

    const options = {
        Model,
        paginate
    }

    // Initialize our service with any options it requires
    app.use('/cinemas', new Cinemas(options, app))

    // Get our initialized service so that we can register hooks
    const service = app.service('cinemas')

    service.hooks(hooks)
}
