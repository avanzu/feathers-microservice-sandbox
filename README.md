# Feathersjs microservices sandbox

## Service-to-service authentication 
In order to allow service to service communication against endpoints with authentication, we are going to consider a service as a special user type. 

### precondition
As long as all involved services share the same JWT secret, they will be able to generate access tokens that can be processed by any other service. 

### authentication process 
 - connect to remote service 
 - generate an access token with payload 
 - authenticate at the remove service using the access token
 - profit

#### Server-Aware JWT Strategy
Since the service that wants to authenticate itself does not have an actual user record on the remote service, we need to generate an AuthenticationResult differently. 

Given that the JWT payload for service authentications contain a specific key that provides something that can be used as `user.id`  
Then we are able to distinguish between regular- and server authentications and we are able to produce a `user` without any lookups. 

See [ServerAwareJWTStrategy](users-service/src/authentication/jwt-strategy.js) for a working example.

## centralized user service

Given there is one centralized "Users service" that handles user profiles and authentictates those user profiles and there are other services (e.g. "Cinema service") that do require authentication for some endpoints.

Then our "Cinema service" has to use the "Users service" to load user entities during the authentication process. 

Given the `users.get` method on the "Users service" does require authentication. 
Then our "Cinema service" has to authenticate itself in order to be allowed to load the user entity. 

See [Users Service class](cinema-service/src/services/users/users.class.js) for a working example. 