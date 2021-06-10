import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

  /*   function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
} */
}
