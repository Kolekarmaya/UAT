import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangePasswordService } from '../Service/change-password.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	
  user_type;
  user_id;
  resetPasswordForm : FormGroup;

   constructor( private router: Router,
				private changePasswordService: ChangePasswordService
	 ) {
		var routerState = this.router.getCurrentNavigation().extras.state;
			console.log('routerState :: dashboard component :: ', routerState);
			if( routerState ) {
			  if( routerState['user_type'] ) {
				this.user_type = routerState['user_type'];
			  }
			  if( routerState['user_id'] ) {
				this.user_id = routerState['user_id'];
			  }			 
		}
	}

  ngOnInit(): void {
	    this.resetPasswordForm = new FormGroup({
			newPassword: new FormControl('', [
			  Validators.required,
			]),
			confirmPassword: new FormControl('', [
			  Validators.required
			])
		});		
		
        //this.resetPasswordForm.controls.newPassword.disable();
        //this.resetPasswordForm.controls.confirmPassword.disable();

    }
	
  canSubmit(): boolean {
    return this.resetPasswordForm.valid;
  }
  errorMessage = '';
  checkPassValid() {
	  var newPassword = this.resetPasswordForm.controls.newPassword.value;
	  console.log('checkPassValid :: newPassword:::', newPassword);
	  this.errorMessage = '';
	  
	  if( newPassword ) {
		  if ( !newPassword.match( '^([a-zA-Z0-9!@./#&+-_*$%]{8,}$)' ) ) {
			  this.errorMessage = 'Password length must be minimum 8 characters';		  
		  }
		  else if ( !newPassword.match( '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])' ) ) {
			  this.errorMessage = 'The password must contain atleast one uppercase character, lowercase character and a digit.';
		  }
		  else if ( ( newPassword.toUpperCase() ).includes( 'PASSWORD' ) ) {
			  this.errorMessage = 'The word password cannot be password.';
		  }
		  else if ( this.user_type && (this.user_id ) ){
			  if( ( newPassword.toUpperCase() ).includes( (this.user_type).toUpperCase() ) || 
				  ( newPassword.toUpperCase() ).includes( (this.user_id).toUpperCase() )
				)
				{
					this.errorMessage = 'Password cannot be same as user code, designation, company name of user.';
				}			  
		  } 

	  }
	  //return this.errorMessage;
	  
  }
  valid : boolean =false;
  messagePopup;
  isError=false;
  displayMessage=false;
  messageType;
  messageDetails;
  resetPassword () {
	  this.checkPassValid();
	  console.log('errorMessage>>', this.errorMessage);
	  if ( this.errorMessage == '' ) {
		  var newPassword = this.resetPasswordForm.controls.newPassword.value;
		  var confirmPassword = this.resetPasswordForm.controls.confirmPassword.value;
			console.log(newPassword, '::', confirmPassword);		  
		  if ( confirmPassword != '' ) {
			  if ( newPassword != confirmPassword ) {
				  this.errorMessage = 'New password and confirm password should match.';
			  }
			  else{
				  //Give api call to change password
				  this.valid =true;
				  console.log('Valid:: ', this.valid);
				  this.changePasswordService.updatePassword(this.user_id, newPassword).subscribe(
					(response) => {
						console.log(response);
						
						this.messageType = 'Information Message :  ';
						this.messageDetails = 'Password updated successfully';
						this.isError=false;  
						this.displayMessage =true;
					  
						// alert(response);
						sessionStorage.setItem('login', 'true');
         				this.router.navigate(['dashboard-page'])
					 }, 
					(error) => {
						// alert(error);
						
						this.messageType = 'Error Message :  ';
						this.messageDetails =  error.status +' : ' + error.statusText;
						this.isError=true;  
						this.displayMessage =true;	
						return;				
						
					}
					
				  );

				  
			  }
		  }		  
	  }
	  
  }

  showAlert (){
	this.isError=false;  
	this.displayMessage =false;

  }
   
   clear() {
	   this.ngOnInit();
	   
   }
  
  
}
