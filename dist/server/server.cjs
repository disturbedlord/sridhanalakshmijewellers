"use strict";
const server = require("@kottster/server");
const id = "7300d4b9-d8a6-41e6-a61e-86bd146c0f71";
const meta = { "name": "Dljs Admin Panel", "icon": "https://web.kottster.app/icon.png" };
const schema = {
  id,
  meta
};
const app = server.createApp({
  schema,
  secretKey: "VH4nmScCr6tFgsQZJ0OTlTJh4dsO0smH",
  kottsterApiToken: "AXhUkHmoRujyO1gWrXBu7LoIfc06otCv",
  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: server.createIdentityProvider("sqlite", {
    fileName: "app.db",
    passwordHashAlgorithm: "bcrypt",
    jwtSecretSalt: "acqe5fqgiydV0sNH",
    /* The root admin user credentials */
    rootUsername: "admin",
    rootPassword: "admin"
  })
});
async function bootstrap() {
  await app.listen();
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
