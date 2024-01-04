import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './students';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }
   baseurl = 'http://localhost:3000/';

   post(stu:Students):Observable<Students> {
    return this.http.post<Students>(`${this.baseurl}post`,stu);
   }


   login(stu:Students){

    return this.http.post<any>(`${this.baseurl}login`,stu);

   }
}
