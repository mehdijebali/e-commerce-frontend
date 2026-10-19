import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-callback',
  standalone: false,
  templateUrl: './login-callback.component.html',
  styleUrl: './login-callback.component.css'
})
export class LoginCallbackComponent {
  // The Auth0 SDK processes the code/state query params automatically
  // and then navigates to the target route (defaults to '/').
  constructor(public auth: AuthService) {}
}
