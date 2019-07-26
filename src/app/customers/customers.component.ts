import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [ HttpService ]
})
export class CustomersComponent implements OnInit {

  constructor(private api: HttpService) { }

  customers;

  ngOnInit() {
  	this.get();
  }

 get() {
    var success = function(data) {
      this.customers = data;
    }.bind(this);

    this.api.get('customers').subscribe(success);
  }

}
