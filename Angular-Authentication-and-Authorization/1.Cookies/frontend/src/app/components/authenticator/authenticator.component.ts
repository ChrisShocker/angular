import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { UserClaim } from '../../types/userClaim';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css',
})
export class AuthenticatorComponent implements OnInit {
  nameClaim: string = '';
  authenticated: boolean = false;
  userClaims$: Observable<UserClaim[]> = new Observable<UserClaim[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserClaims();
    this.userClaims$.subscribe((c) => {
      let claim = c.find((claim) => claim.type === 'name');
      this.nameClaim = claim ? claim.value : '';
      // convienience property to check if user is authenticated
      this.authenticated = c.length > 0;
    });
  }

  // get user Claims
  // slide=false is used to allow the cookie to expire by not renewing the token expiration
  getUserClaims() {
    this.userClaims$ = this.http.get<UserClaim[]>(
      '/account/getUserClaims?slide=false'
    );
  }
}
