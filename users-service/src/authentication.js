const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

class CustomJWT extends JWTStrategy {
  authenticate(data, params) {
    const {accessToken} = data;
    const { entity } = this.configuration;
    const probeForServer = payload => 
      payload.server ?  Promise.resolve(payload) : Promise.reject();

    const authenticateServer = ({server, ...payload}) => ({ 
      accessToken,
      authentication: {
        strategy: 'jwt',
        payload,
        [entity] : { id: server }
      }
    });

    return this
      .authentication
      .verifyAccessToken(accessToken, params.jwt)
      .then(probeForServer)
      .then(authenticateServer)
      .catch(() => 
        super.authenticate(data, params));
    
  }

}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new CustomJWT());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
