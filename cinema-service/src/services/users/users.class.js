const feathers = require('@feathersjs/feathers')
const io       = require('socket.io-client')
const socketio = require('@feathersjs/socketio-client')
const auth     = require('@feathersjs/authentication-client')
const storage  = require('localstorage-memory')

const tokenizer     = service => id => service.createAccessToken({ server: id })
const authenticator = socket => accessToken => new Promise((resolve, reject) => {
    const event = { strategy: 'jwt', accessToken }
    const done  = (error, result) => error ? reject(error) : resolve(result)

    socket.emit('create', 'authentication', event, done)
})

const createClient = ({ authentication, serverId, uri, storage }) => {

    const socket       = io(uri)
    const client       = feathers()
    const createToken  = tokenizer(authentication)
    const authenticate = authenticator(socket)

    const authenticateService = () => createToken(serverId).then(authenticate)

    socket.on('connect',   authenticateService)
    socket.on('reconnect', authenticateService)

    return client.configure(socketio(socket)).configure(auth({ storage }))

}


module.exports = ({uri}, app) => {
    const authentication = app.service('authentication')
    const serverId       = app.get('serverId')
    const client         = createClient({uri, serverId, authentication, storage })
    const service        = (name) => Promise.resolve(client.service(name))

    return {
        id : 'id',
        get: (id, params) =>
            service('users').then(service => service.get(id, params)),
        find: (params) =>
            service('users').then(service => service.find(params))
    }


}