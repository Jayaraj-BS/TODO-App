import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonServiceService } from '../../services/common-service.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLinkActive, HttpClientModule, CommonModule, RouterLink],
  providers: [CommonServiceService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email: any;
  password: any

  showToastMessage: boolean = false
  showErrMsg: boolean = false
  showEmailErrorMessage: boolean = false;


  constructor(
    private router: Router,
    private commonService: CommonServiceService,
    private cdr: ChangeDetectorRef
  ) {

  }

  async login() {

    if (this.email == "test@gmail.com" && this.password == "test@2024") {
      this.showToastMessage = true
      this.showErrMsg = false
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/todoTasks']);
      }, 2000);
      return
    } else {
      this.showErrMsg = true
      this.showToastMessage = false
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }

    let params = {
      email: this.email,
      password: this.password
    }

    console.log(params, "LOGINPARAMS");


    // this.commonService.login(params).subscribe((resp: any) => {
    //   if (resp && resp.status) {
    //     this.showToastMessage = true
    //     this.showErrMsg = false
    //     setTimeout(() => {
    //       this.router.navigate(['/todoTasks']);
    //     }, 2000);
    //     return
    //   } else {
    //     this.showErrMsg = true
    //     this.showToastMessage = false
    //     window.location.reload()
    //   }
    // })

  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  validateEmail (event : any) {
    let inputEmail = event.target.value
    console.log(inputEmail);

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputEmail === '') {
      this.showEmailErrorMessage = false;
    } else if (!emailFormat.test(inputEmail)) {
      this.showEmailErrorMessage = true;
    } else {
      this.showEmailErrorMessage = false;
    }
    
  }

}
