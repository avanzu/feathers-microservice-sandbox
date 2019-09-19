const { Service } = require('feathers-mongoose')

exports.Cinemas = class Cinemas extends Service {
    create(data, params) {
        return super.create(data, params)
    }
}
