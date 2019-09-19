// Initializes the `movies` service on path `/movies`
const { Movies } = require('./movies.class')
const createModel = require('../../models/movies.model')
const hooks = require('./movies.hooks')

module.exports = function (app) {
    const Model = createModel(app)
    const paginate = app.get('paginate')

    const options = {
        Model,
        paginate
    }

    // Initialize our service with any options it requires
    app.use('/movies', new Movies(options, app))

    // Get our initialized service so that we can register hooks
    const service = app.service('movies')

    service.hooks(hooks)
}
