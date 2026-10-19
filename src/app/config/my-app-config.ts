export default {
  auth: {
    domain: "dev-6ly5qzzk8iae1ohp.us.auth0.com",
    clientId: "axJfHmlMRxT4nbDlID0BMy9UpDhTE2Pc",
    authorizationParams: {
      redirect_uri: "http://localhost:4200/login/callback",
      audience: "http://localhost:8080",
    },
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/api/orders/**',
      'http://localhost:8080/api/checkout/purchase'
    ],
  },
}