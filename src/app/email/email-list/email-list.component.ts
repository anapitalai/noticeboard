import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../shared/services/email.service';
import { AuthSlyService } from '../../shared/services/authsly.service';
import { Email } from '../../shared/models/email';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {

  constructor(private service: EmailService) {}

  emails:Email[];
  successMessage:string='';
  errorMessage:string='';


  ngOnInit(): void {
    this.service.getEmails()
    .subscribe(emails=>this.emails=emails);

}



  
}

/**
 *   <!--
    export class FeedbackListComponent implements OnInit {

  constructor(private service: FeedbackService) { }
  
  feedbacks:Feedback[];
  
  ngOnInit(): void {
     this.service.getFeedbacks()
     .subscribe(feedbacks=>this.feedbacks=feedbacks);

}

}
  -->
 */
