/// <reference types="@feathersjs/authentication/lib/core" />
const { JWTStrategy } = require('@feathersjs/authentication');

class CustomJWT extends JWTStrategy {
    
  authenticate(data, params) {
    const {accessToken} = data;
    const { entity } = this.configuration;
    /**
     *  tests whether there is a "server" key in the payload. 
     * @param {*} payload 
     * @returns Promise(payload)
     */
    const isServerKeyInPayload = payload => 
      payload.server ?  Promise.resolve(payload) : Promise.reject();
 
    /**
     * Produces an AuthenticationResult with the "server" key as entity.id
     *  
     * @param {*} param0 
     * @returns {AuthenticationResult}
     */  
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
      .then(isServerKeyInPayload)
      .then(authenticateServer)
      .catch(() => super.authenticate(data, params));
      
  } 
}

module.exports = CustomJWT;