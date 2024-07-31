import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  login(params: any): Observable<any> {
    return this.http.post("http://localhost:3000/users/login", params).pipe(
      map((resp: any) => {
        console.log(resp, "LOGINRESPONSE"); 
        return resp;
      })
    );
  }


  register(params: any): Observable<any> {
    return this.http.post("http://localhost:3000/users/register", params).pipe(
      map((resp: any) => {
        console.log(resp, "RegisterRESPONSE"); 
        return resp;
      })
    );
  }

  getAllTasks(): Observable<any> {
    return this.http.get("http://localhost:3000/tasks").pipe(
      map((resp: any) => {
        console.log(resp, "ALLTASKS"); 
        return resp;
      })
    );
  }

  addNewTask(dataToCreate :any) {
    return this.http.post(`http://localhost:3000/tasks/createTask`, dataToCreate).pipe(
      map((resp: any) => {
        console.log(resp, "Created TASK");
        return resp;
      })
    );
  }

  updateTheTask(id: number, dataToUpdate: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/tasks/${id}`, dataToUpdate).pipe(
      map((resp: any) => {
        console.log(resp, "UPDATED TASK");
        return resp;
      })
    );
  }

  deleteTheTask(id : any): Observable<any> {
    return this.http.delete(`http://localhost:3000/tasks/${id}`).pipe(
      map((resp: any) => {
        console.log(resp, "ALLTASKS"); 
        return resp;
      })
    ); 
  }
}
