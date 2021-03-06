import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customereditprofile',
  templateUrl: './customereditprofile.component.html',
  styleUrls: ['./customereditprofile.component.css']
})
export class CustomereditprofileComponent implements OnInit {

  userProfileForm;
  customer_details;
  constructor(
    private formbuilder: FormBuilder,
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.userProfileForm = this.formbuilder.group({
      name: '',
      contact: '',
      email:'',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip_code: '',
      password: '',
      preference: ''
    })
  }
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

  ngOnInit() {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      jwttoken: this.cookie.get("jwttoken")
    });


    var customer_id = this.cookie.get ('customer_id')
    var url='/customer/display_details/'+customer_id
    // var params = new HttpParams().set("id", customer_id)
    this.http.get(url, {headers}).subscribe(data => {
      // console.log(data)

      if (data != null){
        
        this.customer_details = data['result']
      
        this.customer_details.customer_image = "/customer_images/" + customer_id+".png"
        console.log(this.customer_details)
        this.userProfileForm.get('name').setValue(this.customer_details['name'])
        this.userProfileForm.get('contact').setValue(this.customer_details['contact'])
        this.userProfileForm.get('email').setValue(this.customer_details['email'])
        this.userProfileForm.get('street1').setValue(this.customer_details['street1'])
        this.userProfileForm.get('street2').setValue(this.customer_details['street2'])
        this.userProfileForm.get('city').setValue(this.customer_details['city'])
        this.userProfileForm.get('state').setValue(this.customer_details['state'])
        this.userProfileForm.get('zip_code').setValue(this.customer_details['zip_code'])
        this.userProfileForm.get('preference').setValue(this.customer_details['preference'])

      }
    });
  }

  onSubmit(profile){

    let headers = new HttpHeaders({ 
      // 'Content-Type': 'multipart/form-data',
      jwttoken: this.cookie.get("jwttoken")
    });
    var customer_id = this.cookie.get("customer_id");
    


    var jwttoken = this.cookie.get("jwttoken")
    console.log(profile['password'])
    const formData = new FormData()
    formData.append("id", customer_id);
    formData.append("name", profile["name"])
    formData.append("email", profile["email"])
    formData.append("contact", profile["contact"])
    formData.append("street1", profile["street1"])
    formData.append("street2", profile["street2"])
    formData.append("city", profile["city"])
    formData.append("state", profile["state"])
    formData.append("zip_code", profile["zip_code"])
    formData.append("password", profile["password"])
    formData.append("jwttoken", jwttoken)
    formData.append('preference', profile['preference'])
    formData.append("image", this.image, this.cookie.get('customer_id')+'.png')
    // console.log(formData.get("state"));
    
    this.http.post<any>('/customer/details', formData, {headers}).subscribe(
      (res)=> console.log(res),
      (err) => console.log(err)
    )

    this.router.navigate(['/customerprofile'])
  }

  

}
