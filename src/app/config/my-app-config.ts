import { environment } from '../../environments/environment';

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
      environment.api_base_url + '/api/orders/**',
      environment.api_base_url + '/api/checkout/purchase'
    ],
  },
}