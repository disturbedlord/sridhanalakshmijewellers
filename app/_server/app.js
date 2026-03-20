import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

/* 
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: 'VH4nmScCr6tFgsQZJ0OTlTJh4dsO0smH',
  kottsterApiToken: 'AXhUkHmoRujyO1gWrXBu7LoIfc06otCv',

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt: 'acqe5fqgiydV0sNH',
    
    /* The root admin user credentials */
    rootUsername: 'admin',
    rootPassword: 'admin',
  }),
});