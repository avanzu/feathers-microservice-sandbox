const feathers = require('@feathersjs/feathers')
const io = require('socket.io-client')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

module.exports = app => {

    const connect = () => {

        const {uri}    = app.get('movies-service')
        const socket = io(uri)
        const client = feathers()

        client
            .configure(socketio(socket))
            .configure(auth())

        app.service('authentication')
            .create({}, {payload: {id: 'cinema-service'}})
            .then(({accessToken}) => client.authenticate({strategy: 'jwt', accessToken}))
            .then(() => {
                client.set('user', {id: 'cinema-service'})
                return client
            })

    }

    app.set('cinema-service', connect)


}