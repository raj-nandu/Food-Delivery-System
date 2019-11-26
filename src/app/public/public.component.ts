import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  userSearchForm;
  results;
  searchFilter;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService
  ) { 
    this.userSearchForm = this.formBuilder.group({
      restaurant_name: '',
      location: '',
      food_category: '',
      
    });
   }

  ngOnInit() {
  }

  updateToLocation(){
    this.searchFilter = "Location";
    console.log(this.searchFilter);
  }
  updateToResName(){
    this.searchFilter = "Name";
    console.log(this.searchFilter);
  }
  updateToFoodCat(){
    this.searchFilter = "category";
    console.log(this.searchFilter);
  }

  onSubmit(event){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
      jwttoken: this.cookie.get("jwttoken")
    });

    var params = new HttpParams().set("restaurant_name", event['restaurant_name'])
    .set("location", event['location'])
    .set("food_category", event['food_category'])
    console.log(params)
    this.http.get('/restaurant/restaurants_list', {headers, params}).subscribe(data => {
      // this.detailsForm = data;
      console.log(data)
      this.results = data
    })
  }

  //function to render the result of the search to the website
  displayResult(result){
    console.log(result);
    
  }

}
