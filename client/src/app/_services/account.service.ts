import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import{map} from 'rxjs/operators'
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
 
  baseUrl='https://localhost:5001/api/';
  private currUserSource=new ReplaySubject<User>(1);
  currentUser$=this.currUserSource.asObservable();

  constructor(private http:HttpClient) 
  { }
  login(model:any)
  {
    return this.http.post(this.baseUrl+'account/login', model).pipe(
     map((repsonse:User)=> {
       const user=repsonse;
       if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currUserSource.next(user);
       }
     }) 
    )
  }

  register(model:any)
  {
   
   return  this.http.post(this.baseUrl+'account/register', model).pipe( 
      map((user:User)=> { 
        if(user){
         localStorage.setItem('user',JSON.stringify(user));
         this.currUserSource.next(user);   
         } 
      }) 
     ) 
   }
   
  setCurrentUser(user:User){
    this.currUserSource.next(user);
  }
  logout()
  {  
    localStorage.removeItem('user');
    this.currUserSource.next(null);
  }
}
