// cinemas-model.js - A mongoose model
// 
const { v4 } = require('uuid')
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient')
    const { Schema } = mongooseClient
    const cinemas = new Schema({
        name: { type: String, required: true },
        id  : {type: String, required: true, default: v4, index: true }
    }, {
        timestamps: true
    })

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('cinemas')
    } catch (e) {
        return mongooseClient.model('cinemas', cinemas)
    }
}
