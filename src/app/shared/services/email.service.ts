import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Email } from '../models/email';
import { Observable, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import config from '../../../config/keys';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = `${config.endPoint}/emails`;
  //observable source
  private contactDeletedSource = new Subject();
  private contactCreatedSource = new Subject<Email>();

  private config = { headers: { 'Content-Type': 'multipart/form-data' } };

  //observable stream
  contactCreated$ = this.contactCreatedSource.asObservable();
  contactDeleted$ = this.contactDeletedSource.asObservable();

  constructor(private http: Http) { }


  private handleError(err) {
    let errMessage: string;
    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status}-${err.statusText || ''} ${error}`;
    }
    else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }


  //all emails
  getEmails(): Observable<Email[]> {
    return this.http.get(`${this.url}`)
      .pipe(map(res => res.json().emails),
        catchError(this.handleError));
  }

//create new email
  createEmail(email: Email): Observable<Email> {
    return this.http.post(this.url, email)
      .pipe(map(res => res.json()),
        tap(teacher => this.emailCreated(teacher)),
        catchError(this.handleError));
  }

  emailDelete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
        .pipe(tap(res => this.emailDeleted()),
            catchError(this.handleError));
}


      //messages
      emailCreated(email: Email) {
        console.log('New Email has been created!');
        this.contactCreatedSource.next(email);
    }
  
      emailDeleted() {
          this.contactDeletedSource.next();
          console.log('Email has been deleted!');
      }

}

