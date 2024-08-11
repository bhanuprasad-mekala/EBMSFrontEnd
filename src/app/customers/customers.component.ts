import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Customer } from 'src/Model/Customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerId = 1001;
  customers!: Customer[];
  customerForm!: FormGroup
  faTrashCan = faTrashCan;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.customerForm = this.formBuilder.group({
      customer_id:[{value: '', disabled: true}],
      customer_name:[""],
      DOB:[""],
      address:[""],
      pincode:[""]
    })
  }
  ngOnInit(): void {
    this.getAllCustomers();
    // console.log(this.customers)
  }

  getAllCustomers() {
    this.http.get<Customer[]>(environment.appUrl + "Customers").subscribe(data => {
      this.customers = data
    })
  }

  deleteCustomer(id: any) {
    this.http.delete(environment.appUrl + "Customers/" + id).subscribe((data) => {
      this.getAllCustomers();
    })
  }

  customerIdGenertor(){
    this.customerForm.get("customer_id")?.setValue(this.customers[this.customers.length-1].id?Number(this.customers[this.customers.length-1].id)+1:1001);
  }

  saveCustomer(){
    let customer:Customer = {
      id:this.customerForm.getRawValue().customer_id.toString(),
      customerName:this.customerForm.getRawValue().customer_name,
      DOB:this.customerForm.getRawValue().DOB,
      adress:this.customerForm.getRawValue().address,
      pincode:this.customerForm.getRawValue().pincode
    }
    this.http.post<Customer>(environment.appUrl+"Customers",customer).subscribe(data=>{
      console.log("Customer added successfully with ID : "+customer.id)
      this.getAllCustomers();
    })
  }

  resetForm(){
    this.customerForm.reset();
  }
}
