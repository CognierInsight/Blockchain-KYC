import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from './../auth.service';

import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})



export interface Address{
	street:string;
	country:string;
	city:string;
	state:string;
	zip:string;
}


export class LoginComponent implements OnInit {
	private apiBaseUrl = environment.apiBaseUrl;

	form:FormGroup;
	createUserForm:FormGroup;
	createCategoryForm:FormGroup;
	updateCategoryForm:FormGroup;
	searchIdForm:FormGroup;
	updateUserForm:FormGroup;
	addressForm:FormGroup;
	createDocumentForm:FormGroup;
	updateDocumentForm:FormGroup;
	kycForm:FormGroup;
	//updateDocumentForm:FormGroup;
	keyForm:FormGroup;

	constructor(private fb:FormBuilder, 
		private authService: AuthService, 
		// private router: Router,
		private http: HttpClient
		) {

		this.form = this.fb.group({
			email: ['',Validators.required],
			password: ['',Validators.required]
		});

		this.createUserForm = this.fb.group({
			id: ['',Validators.required],			
			email: ['',Validators.required],
			password: ['',Validators.required],
			firstName: ['',Validators.required],
			lastName: ['',Validators.required],
			dob: ['',Validators.required],
			contact: ['',Validators.required],
		});


		this.updateUserForm = this.fb.group({
			firstName: ['',Validators.required],
			lastName: ['',Validators.required],
			dob: ['',Validators.required],
			contact: ['',Validators.required],
			authorized: ['',Validators.required],
			//address: ['',address addressForm()],
			//kycDetails: ['',kycDetails kycForm()],
		});
/*=========================================================================*/
		this.addressForm = this.fb.group({
			country: ['',Validators.required],
			state: ['',Validators.required],
			city: ['',Validators.required],
			street: ['',Validators.required],
			zip: ['',Validators.required],
		}); 

		this.kycForm = this.fb.group({
			status: ['',Validators.required],
			documentRequired: ['', Validators.required],
		})

/*==================================================================================*/
		this.createCategoryForm = this.fb.group({
			id: ['',Validators.required],			
			categoryName: ['',Validators.required],
			description: ['',Validators.required]
		});

		this.updateCategoryForm = this.fb.group({
			id: ['',Validators.required],			
			categoryName: ['',Validators.required],
			description: ['',Validators.required]
		});
/*=================================================================================*/

        
        this.createDocumentForm = this.fb.group({
			id: ['',Validators.required],			
			documentName: ['',Validators.required],
			documentImage: ['',Validators.required],
			status: ['',Validators.required],
			MemberObject: ['',Validators.required],
			categoryObject: ['',Validators.required],
		});

		this.updateDocumentForm = this.fb.group({
			id: ['',Validators.required],			
			documentName: ['',Validators.required],
			documentImage: ['',Validators.required],
			status: ['',Validators.required],
			//MemberObject: ['',Validators.required],
			categoryObject: ['',Validators.required],
		});

		this.searchIdForm = this.fb.group({
			id:['',Validators.required]
		});
	}

	login() {
		const val = this.form.value;

		if (val.email && val.password) {
			this.authService.login(val.email, val.password)
			.subscribe(
				() => {
					console.log("User is logged In");
					// this.router.navigateByUrl('/');
				}
				);
		}
	}


	logout() {
		this.authService.logout();
	}
	/* ============================members============================================================*/

	createUser() {
		if (this.authService.isAdmin()) {
			const val = this.createUserForm.value;
			this.http.post(this.apiBaseUrl+'members', val)
			.subscribe(
				(data) => {
					console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
		}

		return false;
	}

	

	fetchMembers() {
		console.log(this.authService.isAdmin());
		this.http.get(this.apiBaseUrl+'members')
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}

	fetchMembersById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		//console.log(val)
		this.http.get(this.apiBaseUrl+'members/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}



	

	updateMember() {
		if (this.authService.isAdmin()) {
			const val = this.createCategoryForm.value;
			this.http.put(this.apiBaseUrl+'members/'+ val.id, val )
			.subscribe(
				(data) => {
					console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
		}

		return false;
	}

	fetchMembersByQuery() {
		console.log(this.authService.isAdmin());
		this.http.get(this.apiBaseUrl+'members/query')
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}


	deleteMembersById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		//console.log(val)
		this.http.delete(this.apiBaseUrl+'members/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}


/*==========================categorys==============================*/

	createCategory() {
		if (this.authService.isAdmin()) {
			const val = this.createCategoryForm.value;
			this.http.post(this.apiBaseUrl+'categorys', val)
			.subscribe(
				(data) => {
					console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
		}

		return false;
	}

	




	fetchCategorys() {
		console.log(this.authService.isAdmin());
		this.http.get(this.apiBaseUrl+'categorys')
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}




	updateCategorysById() {
		console.log(this.authService.isAdmin());
		const val = this.updateCategoryForm.value;
		this.http.put(this.apiBaseUrl+'categorys',val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}



	


	fetchCategorysById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		console.log(val)
		this.http.get(this.apiBaseUrl+'categorys/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}


	deleteCategorysById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		//console.log(val)
		this.http.delete(this.apiBaseUrl+'categorys/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}


/*======================================documents=============================================*/


	createDocuments() {
		if (this.authService.isAdmin()) {
			const val = this.createDocumentForm.value;
			this.http.post(this.apiBaseUrl+'documents', val)
			.subscribe(
				(data) => {
					console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
		}

		return false;
	}



	updateDocumentsById() {
		console.log(this.authService.isAdmin());
		const val = this.updateDocumentForm.value;
		this.http.put(this.apiBaseUrl+'documents',val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}

	fetchDocuments() {
		console.log(this.authService.isAdmin());
		this.http.get(this.apiBaseUrl+'documents')
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}




	


	fetchDocumentsById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		console.log(val)
		this.http.get(this.apiBaseUrl+'documents/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}


	deleteDocumentsById() {
		console.log(this.authService.isAdmin());
		const val = this.searchIdForm.value.id;
		//console.log(val)
		this.http.delete(this.apiBaseUrl+'documents/'+val)
		.subscribe(
			(data) => {
				console.log(data);
					// this.router.navigateByUrl('/');
				}
				);
	}




	ngOnInit() {
	}

}
