import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EBMS';
  customers:any[] = [
    {
      "id": "1001",
      "customerName": "Bhanuprasad Mekala",
      "DOB": "2000-05-24",
      "adress": "17-4-252, Chandrashekarnagar, Godavarikhani",
      "pincode": 505209
    }
  ];
  ngOnInit(){
    if(localStorage.getItem("customers") == null){
      localStorage.setItem("customers",JSON.stringify(this.customers));
    }
  }
}
