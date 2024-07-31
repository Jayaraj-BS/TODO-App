import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceService } from '../../services/common-service.service';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive, HttpClientModule, RouterLink],
  providers : [CommonServiceService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  firstName : any
  lastName : any
  email : any
  password : any
  confirmPassword : any

  showToastMessage: boolean = false
  showErrMsg : boolean = false


  constructor(
    private router: Router,
    private commonService : CommonServiceService,
    private cdr: ChangeDetectorRef
  ) {

  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  signup() {
      if(this.password !== this.confirmPassword){
        this.showErrMsg = true 
        this.showToastMessage = false  
        return     
      }
    let params = {
      firstName : this.firstName,
      lastName : this.lastName,
      email : this.email,
      password : this.password
    }    
    console.log(params);

    // this.commonService.register(params).subscribe((resp : any) => {
    //   console.log(resp);
    //   if(resp.status) {
    //     this.showToastMessage = true
    //     this.showErrMsg = false
    //     this.cdr.detectChanges();
    //     setTimeout(() => {
    //       this.router.navigate(['/todoTasks']);
    //     }, 2000);
    //   }
    // })
    
  }

}
