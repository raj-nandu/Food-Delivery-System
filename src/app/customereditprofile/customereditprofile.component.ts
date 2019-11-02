import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customereditprofile',
  templateUrl: './customereditprofile.component.html',
  styleUrls: ['./customereditprofile.component.css']
})
export class CustomereditprofileComponent implements OnInit {

  userProfileForm;
  
  constructor(
    private formbuilder: FormBuilder,
    private cookie: CookieService,
    private http: HttpClient,
  ) { 
    this.userProfileForm = this.formbuilder.group({
      name: '',
      contact: '',
      address: '',
      altAddress: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  ngOnInit() {
  }

  onSubmit(event){
    
  }

  onUpdateName(event){

  }

  onUpdateContact(event){

  }

  onUpdateAddress(event){

  }

  onUpdateAltAddress(event){

  }

  onUpdateCity(event){

  }

  onUpdateState(event){

  }

  onUpdateZip(event){

  }

}