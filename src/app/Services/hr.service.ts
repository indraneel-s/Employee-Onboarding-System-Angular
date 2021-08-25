import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  public roles$: Subject<any> = new Subject();
  public employees$: Subject<any>=new Subject();

  baseurl="http://localhost:9192/";
  constructor(private http: HttpClient) { }
  getRoles(){
 
     return this.http.get("http://localhost:9192/roles").subscribe(data=>{
     this.roles$.next(data);
   })
    
  }
  
  getEmployees(){
    return this.http.get(this.baseurl+'users').subscribe(data=>{
      this.employees$.next(data);
    })
  }
  createEmployee(data:any){
 

    return this.http.post("http://localhost:9192/user",data);
  }
  rejectEmployeeData(data:any){
  
    return this.http.put(this.baseurl+'user/status',data);
  }
  notifyEmployee(data:any){
    return this.http.post(this.baseurl+`user/${data}/notification`,data);
  }
  
}
