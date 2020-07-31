import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSlyService } from 'src/app/shared/services/authsly.service';
import { NoticeService } from 'src/app/shared/services/notice.service';
import { Notice } from 'src/app/shared/models/notice';


@Component({
  selector: 'app-notice-single',
  templateUrl: './notice-single.component.html',
  styleUrls: ['./notice-single.component.css']
})
export class NoticeSingleComponent implements OnInit {

  showModal: boolean;
  content: string;
  title: string;
  //Bootstrap Modal Open event
  show() {
    this.showModal = true; // Show-Hide Modal Check
    this.content = "The image goes here"; // Dynamic Data
    this.title = "Property Images";    // Dynamic Data
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }



  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthSlyService,
    private service: NoticeService) { }


  notices: Notice;
  ngOnInit() {
    let _id = this.route.snapshot.params['id'];
    this.service.getContact(_id)
      .subscribe(notices => this.notices = notices);
  }

  teacherDelete() {
    this.service.teacherDelete(this.notices._id)
      .subscribe(data => {
        this.router.navigate(['/notice']);
      })
  }

}
