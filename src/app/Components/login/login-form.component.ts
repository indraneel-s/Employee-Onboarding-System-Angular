import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-loginform',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginformComponent implements OnInit {


  status: Boolean = false;
  notifyText: String = "";
  loginFailed:Boolean=false;
  error:boolean=false;
  loginForm!: FormGroup;
  errorMessage = {
    userName: {
      empty: "UserName is required",
      valid: "Enter valid Username"
    },
    password: {
      empty: "Password is required",
      minLegth: "Password must have atleast 5 characters",
      pattern: "Numbers only allowed",
    },
  };
  userNameErrorMsg: String = "";
  passwordErrorMsg: String = "";
  isSubmitted: Boolean = false;
  constructor(private loginService: LoginService, http: HttpClient, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.LoginFormInitalize()
  }
  LoginFormInitalize():void{
    this.loginForm = this.fb.group({
      userName: ["",
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"),
          Validators.minLength(8),
        ],
      ],
    });
  }
  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }
  closeNotification(closeModalEvent: Boolean) {
    this.loginFailed = closeModalEvent;
  }
  loginMethod(): void {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      this.loginService.checkUser({emailId: this.userName?.value, password: this.password?.value}).subscribe((data: any) => {
         
       if(data[0]!=null)
       {
          if(data[0]==3){
            localStorage.setItem('user', "HR");
            this.router.navigate(['/hr']) 
           
          }
          if(localStorage.getItem('user')!='HR'){
            localStorage.setItem('id', data[0]);
            localStorage.setItem('user', "engineer");
            localStorage.setItem('type',data[3])
            
            this.router.navigate(['/employee'])
          }
        }
          
       
    },
    (error)=>{
      this.notifyText="Invalid Credentials"
      this.loginFailed=!this.loginFailed
    })
    }
  }

}
