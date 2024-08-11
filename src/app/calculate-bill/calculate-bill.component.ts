import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Customer } from 'src/Model/Customer';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bill } from 'src/Model/Bill';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calculate-bill',
  templateUrl: './calculate-bill.component.html',
  styleUrls: ['./calculate-bill.component.css']
})
export class CalculateBillComponent implements OnInit {
  billForm!: FormGroup;
  customers!: Customer[];
  bills!: Bill[];
  months: any[] = [];
  years: any[] = [];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.addForm();
    this.getAllBills();
    this.getAllCustomers();
    this.getMonths();
    this.getYears();
  }

  addForm() {
    this.billForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      custId: [""],
      month: [''],
      year: [''],
      noOfUnits: [0],
      amount: [{ value: 0, disabled: true }]
    })
  }

  getAllCustomers() {
    this.http.get<Customer[]>(environment.appUrl + "Customers").subscribe(data => {
      this.customers = data
    })
  }

  getAllBills() {
    this.http.get<Bill[]>(environment.appUrl + "Bills").subscribe(data => {
      this.bills = data;
      let id: string = "B";
      let num = String(Number(this.bills[this.bills.length - 1].id.substring(1)) + 1)
      for (let i = 1; i < this.bills[this.bills.length - 1].id.length - 1; i++) {
        id += "0";
      }
      id += num;
      this.billForm.get("id")?.setValue(id)
    })
  }

  getMonths() {
    for (let i = 1; i <= 12; i++) {
      let mon = this.datePipe.transform(new Date(i + "/1/2014"), "MMMM")
      this.months[i - 1] = mon;
    }
  }

  getYears() {
    for (let i = 0; i < 10; i++) {
      this.years[i] = new Date().getFullYear() - i
    }
  }

  totalAmount() {
    let noOfUnits = this.billForm.getRawValue().noOfUnits
    let amount = 0;
    if (noOfUnits >= 0 && noOfUnits <= 100) {
      amount = 0;
    }
    else if (noOfUnits > 100 && noOfUnits <= 400) {
      amount = 4.5;
    }
    else if (noOfUnits > 400 && noOfUnits <= 500) {
      amount = 6;
    }
    else if (noOfUnits > 500 && noOfUnits <= 600) {
      amount = 8;
    }
    else if (noOfUnits > 600 && noOfUnits <= 800) {
      amount = 9;
    }
    else if (noOfUnits > 800 && noOfUnits <= 1000) {
      amount = 10;
    }
    else if (noOfUnits > 1000) {
      amount = 11;
    }
    else {
      amount = 0;
    }
    this.billForm.get("amount")?.setValue(noOfUnits * amount);
  }

  saveBill() {
    let data = this.billForm.getRawValue();
    this.http.post(environment.appUrl + "Bills", data).subscribe(() => {
      this.billForm.reset();
      this.ngOnInit();
    })
  }
}
