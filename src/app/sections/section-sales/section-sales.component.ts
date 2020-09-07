import { Component, OnInit } from '@angular/core';

// AUTHENTIFICATION
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.scss']
})
export class SectionSalesComponent implements OnInit {
  currentUser;

  constructor(
    private authenticationService: AuthenticationService,
  ) { 
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
  }

}
