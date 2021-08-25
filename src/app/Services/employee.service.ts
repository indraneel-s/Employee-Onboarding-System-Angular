import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  public employee$: Subject<any> = new Subject();
  public response$: Subject<any> = new Subject();


  basicDetails: any;
  addressDetails: any;
  employeeDetails: any;

  baseurl="http://localhost:9192/";


  

  constructor(private http: HttpClient,public datepipe: DatePipe) { }
  datePipeImplementation(date:any){
    date=new Date();
    let latest_date =this.datepipe.transform(date, 'MM/dd/yyyy');
   }
   getEmployeeDetails() {
    var user=localStorage.getItem('id');
    this.http.get("http://localhost:9192/details/"+`/${user}`).subscribe(data=>{
    this.employee$.next(data);
  })
    const addressDetails= [
      {
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "permanent"
      },{
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "present"
      }
     
    ]
  this.setAddressDetails(addressDetails);
}
  register(data:any){
   
    let address=[
      {  "employeeCode":"",
         "type":"present",
         "flatName":data.presentAddress.flatName,
         "streetName":data.presentAddress.streetName,
         "area":data.presentAddress.area,
         "state":data.presentAddress.state,
         "country":data.presentAddress.country,
         "city":data.presentAddress.city,
         "pinCode":data.presentAddress.pinCode,
         "mapCoordinates":data.presentAddress.mapCoordinates

      },
      {  
        "employeeCode": "",
        "type":"permanent",
        "flatName":data.permanentAddress.flatName,
        "streetName":data.permanentAddress.streetName,
         "area":data.permanentAddress.area,
        "state":data.permanentAddress.state,
        "country":data.permanentAddress.country,
        "city":data.permanentAddress.city,
        "pinCode":data.permanentAddress.pinCode,
        "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
   
    this.setAddressDetails(address)
    this.employeeDetails={
      "employeeId":localStorage.getItem('id'),
      "employeeCode":"",
      "password":"",
      "firstName": this.basicDetails.firstName,
      "lastName": this.basicDetails.lastName,
      "dob": this.basicDetails.dob,
      "bloodGroup": this.basicDetails.bloodGroup,
      "aadharNumber": this.basicDetails.aadharNumber,
      "fatherName": this.basicDetails.fatherName,
      "motherName": this.basicDetails.motherName,
      "emailId":  this.basicDetails.emailID,
      "phoneNumber": this.basicDetails.phoneNumber,
      "sslc": parseFloat(this.basicDetails.sslc),
      "hsc": parseFloat(this.basicDetails.hsc),
      "ug": parseFloat(this.basicDetails.ug),
      "gender": this.basicDetails.gender,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactRelation": this.basicDetails.relation,
      "emergencyContactPhoneNumber": this.basicDetails.emergencyContactNumber,
      "currentStatus":"",
      "rejectReason":"",
      "addressList":address,
      "action":"Submit"
  };
   
  return this.http.put(this.baseurl+`details/${localStorage.getItem('id')}`,this.employeeDetails)

  }
  save(data:any){
   
    let address=[
      {
        "employeeCode":"",
        "type":"present",
        "flatName":data.presentAddress.flatName,
        "streetName":data.presentAddress.streetName,
        "area":data.presentAddress.area,
        "state":data.presentAddress.state,
        "country":data.presentAddress.country,
        "city":data.presentAddress.city,
        "pinCode":data.presentAddress.pinCode,
        "mapCoordinates":data.presentAddress.mapCoordinates
      },
      {
        "employeeCode": "",
        "type":"permanent",
        "flatName":data.permanentAddress.flatName,
        "streetName":data.permanentAddress.streetName,
         "area":data.permanentAddress.area,
        "state":data.permanentAddress.state,
        "country":data.permanentAddress.country,
        "city":data.permanentAddress.city,
        "pinCode":data.permanentAddress.pinCode,
        "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
  
    this.setAddressDetails(address)
    this.employeeDetails={
      "employeeId":localStorage.getItem('id'),
      "employeeCode":"",
      "password":"",
      "firstName": this.basicDetails.firstName,
      "lastName": this.basicDetails.lastName,
      "dob": this.basicDetails.dob,
      "bloodGroup": this.basicDetails.bloodGroup,
      "aadharNumber": this.basicDetails.aadharNumber,
      "fatherName": this.basicDetails.fatherName,
      "motherName": this.basicDetails.motherName,
      "emailId":  this.basicDetails.emailID,
      "phoneNumber": this.basicDetails.phoneNumber,
      "sslc": parseFloat(this.basicDetails.sslc),
      "hsc": parseFloat(this.basicDetails.hsc),
      "ug": parseFloat(this.basicDetails.ug),
      "gender": this.basicDetails.gender,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactRelation": this.basicDetails.relation,
      "emergencyContactPhoneNumber": this.basicDetails.emergencyContactNumber,
      "currentStatus":"",
      "rejectReason":"",
      "addressList":address,
      "action":"Save"};
      return this.http.put(this.baseurl+`details/${localStorage.getItem('id')}`,this.employeeDetails)

  }
  setBasicDetails(details:any) {
    this.basicDetails = details;
    
  }
  getBasicDetails() {
    return this.basicDetails;
  }
  setAddressDetails(details:any) {
    this.addressDetails = details;
  }

  getAddressDetails() {
    return this.addressDetails;
  }
}