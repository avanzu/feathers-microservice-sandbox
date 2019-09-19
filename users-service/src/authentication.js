const { AuthenticationService } = require('@feathersjs/authentication');
const { LocalStrategy }         = require('@feathersjs/authentication-local');
const { expressOauth }          = require('@feathersjs/authentication-oauth');
const ServerAwareJWT            = require('./authentication/jwt-strategy');


module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new ServerAwareJWT());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
