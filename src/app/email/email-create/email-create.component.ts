import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Email } from '../../shared/models/email';
import { EmailService } from '../../shared/services/email.service';

import config from '../../../config/keys';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})

export class EmailCreateComponent implements OnInit {
  constructor(private http: Http, private router: Router, private service: EmailService, private fb: FormBuilder) {

  }
  
  form: FormGroup;


  email: Email = { name: '',telephone: '',company: '',email: '',subject: '', message: ''};
  errorMessage: string = '';
  successMessage: string = '';


  ngOnInit() {
     this.form = new FormGroup({
      name: new FormControl(''),
      telephone: new FormControl(''),
      company:new FormControl(''),
      email:new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('')
    });
  }



  createEmail() {
    this.successMessage = '';
    this.errorMessage = '';
    console.log(this.form);
    console.log(this.form.value);
    const fd={
    name: this.form.value.name,
    telephone: this.form.value.telephone,
    email:this.form.value.email,
    company:this.form.value.company,
    subject:this.form.value.subject,
    message:this.form.value.message
    }

      this.http.post(`${config.endPoint}/emails`,fd)  
      .subscribe(res => {
        this.successMessage='New Data created.';
        this.form.reset();
        console.log(res);

      },
      err=>{
        this.errorMessage='Email can\'t be created!';
        console.error(err);
       }
      );
  }



}




