import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(/*private Auth: AuthService*/) { }

  ngOnInit() {
  }

  logUserIn(event){
    event.preventDefault()
    console.log(event)
    //const target = event.target
    //console.log(target.srcElement['0'])
    //const email = target.querySelector('email').value
    //const password = target.querySelector('password').value
  }
    /*
    // subscribe is throwing error because the http request to the backend hasn't been established yet
    this.Auth.validateUserDetails(email, password).subscribe(data => {
      if(data.success){
        // direct user to customer view
      }
      else{
        window.alert("Invalid credintials")
      }
    })
    console.log(email, password)
  }
*/

}