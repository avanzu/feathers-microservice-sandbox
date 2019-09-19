const { Service } = require('feathers-nedb')

exports.Users = class Users extends Service {
    get(id, params) {
        return super.get(id, params)
    }
}
