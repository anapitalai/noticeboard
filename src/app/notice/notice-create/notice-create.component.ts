import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { NoticeService } from 'src/app/shared/services/notice.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Notice } from 'src/app/shared/models/notice';

import config from '../../../config/keys';
@Component({
  selector: 'app-notice-create',
  templateUrl: './notice-create.component.html',
  styleUrls: ['./notice-create.component.css']
})
export class NoticeCreateComponent implements OnInit {
  constructor(private http: Http, private router: Router, private service: NoticeService, private fb: FormBuilder) {

  }

  form: FormGroup;
  teacher: Notice = { title: '',content: '',owner: '',uploads: '' };
  errorMessage: string = '';
  successMessage: string = '';
  filesToUpload: Array<File> = [];

  ngOnInit() {
     this.form = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      owner:new FormControl(''),
      uploads: new FormControl('')
    });
    
  }


  onFileSelected(event) {
    this.filesToUpload = <Array<File>>event.target.files;
  }


  createTeacher() {
    this.successMessage = '';
    this.errorMessage = '';
    console.log(this.form);
    console.log(this.form.value);

    const files: Array<File> = this.filesToUpload;
    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      fd.append("uploads", files[i], files[i]['location']);
    }
    fd.append('title', this.form.value.title);
    fd.append('content', this.form.value.content);
    fd.append('owner', this.form.value.owner);



      this.http.post(`${config.endPoint}/notices`,fd)  
      .subscribe(res => {
        this.successMessage='New Data created.';
        console.log(res);
      },
      err=>{
        this.errorMessage='Notice can\'t be created!';
        console.error(err);
       }
      );
  }




}
