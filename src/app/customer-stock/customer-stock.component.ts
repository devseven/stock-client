import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-customer-stock',
  templateUrl: './customer-stock.component.html',
  styleUrls: ['./customer-stock.component.css'],
  providers: [ HttpService ]
})
export class CustomerStockComponent implements OnInit {

  @Input() stockItem;

  showDetails;
  constructor(private api: HttpService) { }

  ngOnInit() {
  }

  details() {
  	this.showDetails = !this.showDetails;
  }

}
