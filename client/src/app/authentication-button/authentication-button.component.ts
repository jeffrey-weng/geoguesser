import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styles: [],
})
export class AuthenticationButtonComponent implements OnInit {
  constructor(public auth: AuthService,@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}