import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { of } from 'rxjs'
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  modalRef?: BsModalRef;
  empForm!: FormGroup;
  editMode: boolean = false;
  empData!: any;
  employees!: Employee[];
  constructor(private modalService: BsModalService, private fb: FormBuilder,
    private emplService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployee();
    this.empForm = this.fb.group({
      _id: [''],
      name:['Ex. Alex Johnson', Validators.required],
      position: ['Ex. Full Stack Developer', Validators.required],
      dept: ['Development']
    })
  }

  getEmployee() {
    this.emplService.getEmployeList().subscribe((res:any) => {
      console.log(res);
      this.employees = res;
    })
  }

  onSubmit() {
    if(this.empForm.valid) {
      if(this.editMode) {
        this.emplService.updateEmployee(this.empForm.value).subscribe((res) => {
          console.log(res);
          this.getEmployee();
        },(err) => {
          console.log(err)
        })
      }else {
        this.emplService.addEmployee(this.empForm.value).subscribe((res) => {
          console.log(res);
          this.getEmployee();
        },(err) => {
          console.log(err)
        })
      }
    }
    this.modalRef?.hide()
  }

  onEditEmploye(template: TemplateRef<any>, emp: Employee) {
    this.openModal(template);
    this.editMode = true;
    this.empForm.patchValue(emp)
  }

  onDeleteEmployee(id: string) {
    if(confirm('Do you want to delete this Employee')) {
      this.emplService.deleteEmployee(id).subscribe(res => {
        console.log('Delete Successfully');
        this.getEmployee();
        },(err) => {
          console.log(err)
        })
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.editMode = false;
    this.modalService.hide();
  }

}
