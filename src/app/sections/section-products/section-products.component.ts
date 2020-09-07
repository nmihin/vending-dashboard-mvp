import { Component, OnInit } from '@angular/core';

// AUTHENTIFICATION
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-section-products',
  templateUrl: './section-products.component.html',
  styleUrls: ['./section-products.component.scss']
})
export class SectionProductsComponent implements OnInit {
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
