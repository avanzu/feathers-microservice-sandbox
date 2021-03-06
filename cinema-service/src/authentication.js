const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { OAuthStrategy, expressOauth } = require('@feathersjs/authentication-oauth')

module.exports = app => {
    const authentication = new AuthenticationService(app)

    authentication.register('jwt', new JWTStrategy())
    // authentication.register('github', new OAuthStrategy())
    // authentication.register('auth0', new OAuthStrategy())
  

    app.use('/authentication', authentication)
    app.configure(expressOauth())
}
