import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../login.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.css']
})
export class RestaurantdetailsComponent implements OnInit {

  detailsForm;

  constructor(
    private httpService:HttpClient,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private cookie: CookieService,
    private http: HttpClient) {
    this.detailsForm = this.formBuilder.group({
      name: '',
      location: '',
      food_category: '',
      res_image: '',
      contact: '',
      working_hours: ''
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
  

    // details['res_image'] = this.fileAsBase64;
    // console.log(details['res_image'])

    const formData = new FormData()
    formData.append("id", this.cookie.get('restaurant_id'))
    formData.append("jwttoken", jwttoken)
    formData.append("image", this.image, this.cookie.get('restaurant_id')+'.jpg')
    formData.append("name", details['name'])
    formData.append("location", details['location'])
    formData.append("food_category", details['food_category'])
    formData.append("contact", details['contact'])
    formData.append("working_hours", details['working_hours'])

    this.http.post<any>('/restaurant/restaurant_details', formData).subscribe(
      (res)=> console.log(res),
      (err) => console.log(err)
    )
  }

  ngOnInit() {
    console.log("fge" + this.cookie.get('restaurant_id'))
    this.httpService.get('/restaurant/display_details/'+this.cookie.get('restaurant_id')).subscribe(data => {
      // this.detailsForm = data;
      console.log(data)
      if (data != null){
        this.detailsForm.controls['name'].setValue(data['name'])
        this.detailsForm.controls['location'].setValue(data['location'])
        this.detailsForm.controls['food_category'].setValue(data['food_category'])
        this.detailsForm.controls['contact'].setValue(data['contact'])
        this.detailsForm.controls['working_hours'].setValue(data['working_hours'])
      }
      

    });
  }


}