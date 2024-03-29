import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.css']
})
export class RestaurantdetailsComponent implements OnInit {

  detailsForm;
  restaurant_details;

  constructor(
    private httpService:HttpClient,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router) {
    this.detailsForm = this.formBuilder.group({
      name: '',
      location: '',
      food_category: '',
      res_image: '',
      contact: '',
      working_hours: '',
      description:'',
      password: '',
      state: '',
      street1: '',
      street2: '',
      zip_code: ''
    });

  }

  selectedFile: File = null;

  // fileAsBase64 = null;
  image
  onFileSelected(event){
    //this.selectedFile = <File>event.target.files[0];
    // var b64;
    // var reader = new FileReader();
    // reader.onload = function(e){
    //   console.log("encoding image")
    //   b64 = btoa(e.target.toString());
    //   console.log(b64)
    // }
    // this.fileAsBase64 = b64;
    const file = event.target.files[0];
    this.image = file
  }



  onSubmit(details) {
    var jwttoken = this.cookie.get('jwttoken');
    details['jwttoken'] = jwttoken;
    details['id'] = this.cookie.get('restaurant_id');
    const formData = new FormData()
    formData.append("id", this.cookie.get('restaurant_id'))
    formData.append("jwttoken", jwttoken)
    formData.append("image", this.image, this.cookie.get('restaurant_id')+'.png')
    formData.append("name", details['name'])
    formData.append("location", details['location'])
    formData.append("food_category", details['food_category'])
    formData.append("contact", details['contact'])
    formData.append("working_hours", details['working_hours'])
    formData.append("description", details['description'])
    formData.append("password", details['password'])
    formData.append("street1", details['street1'])
    formData.append("street2", details['street2'])
    formData.append("state", details['state'])
    formData.append("zip_code", details['zip_code'])

    this.http.post<any>('/restaurant/restaurant_details', formData).subscribe(
      (res)=> this.router.navigate(['/restaurantviewdetails']),
      (err) => console.log(err)
    )
  }

  ngOnInit() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
      jwttoken: this.cookie.get("jwttoken")
    });



    var url='/restaurant/display_details/' + this.cookie.get ('restaurant_id')

    this.http.get(url, {headers}).subscribe(data => {
      // this.detailsForm = data;

      if (data != null){
        this.restaurant_details = data
        this.restaurant_details.res_image = "/restaurant_images/" + this.restaurant_details.res_image
        this.detailsForm.get('name').setValue(data['name'])
        this.detailsForm.get('food_category').setValue(data['food_category'])
        this.detailsForm.get('location').setValue(data['location'])
        this.detailsForm.get('working_hours').setValue(data['working_hours'])
        this.detailsForm.get('description').setValue(data['description'])
        this.detailsForm.get('contact').setValue(data['contact'])
        this.detailsForm.get('street1').setValue(data['street1'])
        this.detailsForm.get('street2').setValue(data['street2'])
        this.detailsForm.get('zip_code').setValue(data['zip_code'])
        this.detailsForm.get('state').setValue(data['state'])
        console.log(data)
      }
    });
  }


}
