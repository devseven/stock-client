// This would be split into Services and Filter Components - ran out of time

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
    providers: [ HttpService ]
})
export class CustomerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: HttpService) { }

  customerParam;
  customer;
  stock;
  viewableStock;
  stockLimit = true;
  limitCount = 10;
  stockFiltered;
  allProducts = [];

  availableColours = [];
  selectingColours;
  selectedColour;


  confirmingStockSend;
  sendResponse;
  sending;

  ngOnInit() {

	 this.route.paramMap.subscribe(params => {
	    this.customerParam = params.get('customer');
	    this.get();
	    this.getStock();
	});
  }

  // What I 'think' is meant by 'in Stock' on the spec
  // ( to an external customer they want to know if can buy by being 'available' ( not physically at G&B but may be reserved ))
  filterByAvailableAvailable(data) {
  	return data.filter((dataItem) => {
  		return dataItem.totalAvailable;
  	});
  }

  get() {
    var success = function(data) {
      this.customer = data;
    }.bind(this);

    this.api.get('customers/' + this.customerParam ).subscribe(success);
  }

  getStock() {
    var success = function(data) {
      this.stock = this.filterByAvailableAvailable(data);
      this.viewableStock = this.stock;
    }.bind(this);

    this.api.get('customers/' + this.customerParam + '/stock').subscribe(success);
  }


  showAll() {
  	this.stockLimit = false;
  	this.limitCount = 5000;
  }

  setAvailableColours() {

  	let isAllReadyAvailable = (product) => {
  		return this.availableColours.includes(product.colourGroup);
  	}

  	this.allProducts.forEach(product => {
  		if ( !isAllReadyAvailable(product) &&  product.colourGroup ) {
  			this.availableColours.push(product.colourGroup);
  		}
  	});
  }

  getProducts() {
  	  var success = (productData) => {
  		this.allProducts = productData;
  		this.setAvailableColours();
  	};

 	this.api.get('products').subscribe(success);
	this.setAvailableColours();
  }

  hideFilters() {
  
  }

  clearFilters() {
  	this.viewableStock = this.stock;
  	this.selectingColours = false;
  	this.selectedColour = false;
  }

  sendStock() {
  	this.sending = true;
  	var success = (sendResponse) => {
  		this.sendResponse = sendResponse;
  		this.sending = false;
  	};

 	this.api.post('customers/' + this.customerParam, this.viewableStock).subscribe(success);
  }

  confirmStockSend() {
  	this.confirmingStockSend = true;
  }

  cancelStockSend() {
  	this.sendResponse = false;
  	this.confirmingStockSend = false;
  }

  getStockByFilter() {
	  	var success = (stockFilteredData) => {
	  		var data = stockFilteredData.stock.data;
		this.stockFiltered = this.filterByAvailableAvailable(data);
		this.viewableStock = this.stockFiltered;
		this.hideFilters();
  	};

 	this.api.get('customers/' + this.customerParam + '/stock/' + this.selectedColour).subscribe(success);
  }

  showColours() {

  	if (!this.allProducts.length) {
	  	this.getProducts();
  	}
  	this.selectingColours = true;
  }

  selectColour(colour) {

  	this.selectedColour = colour;
  	this.getStockByFilter();
  	this.selectingColours = false;
  	
  }
}
