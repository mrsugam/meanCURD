import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = "http://localhost:3000/employees";
  constructor(private http: HttpClient) { }

  addEmployee(emp: any): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, emp);
  }

  updateEmployee(emp: Employee) {
    return this.http.put(`${this.baseUrl}/${emp._id}`, emp)
  }

  getEmployeList():Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
