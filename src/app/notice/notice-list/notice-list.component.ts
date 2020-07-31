import { Component, OnInit } from '@angular/core';
import { AuthSlyService } from 'src/app/shared/services/authsly.service';
import { Notice } from 'src/app/shared/models/notice';
import { NoticeService } from 'src/app/shared/services/notice.service';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {

  constructor(private service: NoticeService, public auth: AuthSlyService) { }

  notices: Notice[];
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {

    this.service.getNotices()
      //.subscribe(notices=>{this.notices=notices;
      .subscribe(notices => {
       this.notices = notices;
       
       console.log(this.sortBy());
        this.successMessage = 'All Notices!';

        console.log(notices);
      },

        err => {
          this.errorMessage = 'No data available!Check network connectivity!';
          console.error(err);
        }

      );
  }


  sortBy() {

    this.notices.sort((c1: Notice, c2: Notice) => {
      if(c1.title>c2.title) return 1
      else if (c1.title===c2.title) return 0
      else return -1
      //return b.createdAt.valueOf() - a.createdAt.valueOf();
    })
  }

}
