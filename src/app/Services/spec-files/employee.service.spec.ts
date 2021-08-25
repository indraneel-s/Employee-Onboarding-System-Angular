import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { EmployeeService } from '../employee.service';
import { DatePipe } from '@angular/common';
import { Employees } from 'src/app/Interfaces/employees';
import { Component } from '@angular/core';
describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;
  let traveller: any;
  let saveData:any;
  let submitData:any;
  let baseurl="http://localhost:9192/";
  beforeAll(()=>{
    localStorage.setItem('id',"1");
    
  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DatePipe]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(EmployeeService);
    service.basicDetails={
      aadharNumber: "12313123213",
      bloodGroup: "O+ve",
      dob: "09/09/1999",
      emailID:"dsjfajkfa",  
     emergencyContactName: "adsfafda", 
      emergencyContactNumber: "9092301031",
      fatherName: "sdfsaf",
      firstName:"dfafaf",
      gender: "ad",
      hsc: "fds",
      lastName: "fds",
     motherName: "fdsa",
      phoneNumber: "dsa",
      relation: "fads",
      sslc: "das",
      ug: "123",
    }
  });
saveData={
  action:'save',
  empID:'1',
  aadharNumber: "12313123213",
      bloodGroup: "O+ve",
      dob: "09/09/1999",
      emailID:"dsjfajkfa",  
     emergencyContactName: "adsfafda", 
      emergencyContactNumber: "9092301031",
      fatherName: "sdfsaf",
      firstName:"dfafaf",
      gender: "ad",
      hscScore: "fds",
      lastName: "fds",
     motherName: "fdsa",
      phoneNumber: "dsa",
      emergencyContactRelation: "fads",
      sslcScore: "das",
      ugScore: "123",
      addresses:[
        {
          id:1,
        type:"present",
          area: "chepauk",
          country: "India",
          district: "chennai",
          flatName: "sfa",
          mapCoordinates: "12341.123N,123.12E",
          pincode: 600006,
          state: "Tamilnadu",
          street: "cnk",
      },
      {
        id:2,
      type:"permanent",
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
    },

      ]
};
submitData={
  action:'submit',
  empID:'1',
  aadharNumber: "12313123213",
      bloodGroup: "O+ve",
      dob: "09/09/1999",
      emailID:"dsjfajkfa",  
     emergencyContactName: "adsfafda", 
      emergencyContactNumber: "9092301031",
      fatherName: "sdfsaf",
      firstName:"dfafaf",
      gender: "ad",
      hscScore: "fds",
      lastName: "fds",
     motherName: "fdsa",
      phoneNumber: "dsa",
      emergencyContactRelation: "fads",
      sslcScore: "das",
      ugScore: "123",
      addresses:[
        {
          id:1,
        type:"present",
          area: "chepauk",
          country: "India",
          district: "chennai",
          flatName: "sfa",
          mapCoordinates: "12341.123N,123.12E",
          pincode: 600006,
          state: "Tamilnadu",
          street: "cnk",
      },
      {
        id:2,
      type:"permanent",
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
    },

      ]
}
traveller={
  presentAddress:{
      area: "chepauk",
      country: "India",
      city: "chennai",
      flatName: "sfa",
      mapCoordinates: "12341.123N,123.12E",
      pinCode: 600006,
      state: "Tamilnadu",
      streetName: "cnk",
  },
  permanentAddress:{
    area: "chepauk",
    country: "India",
    city: "chennai",
    flatName: "sfa",
    mapCoordinates: "12341.123N,123.12E",
    pinCode: 600006,
    state: "Tamilnadu",
    streetName: "cnk",
}
}
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should return employee", () => {
    let result: any;
    service.getEmployeeDetails();
    service.employee$.subscribe(data=>{
       result=data;
     })
     let id=localStorage.getItem('id');
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseurl+`details/${id}`
    });
   
    req.flush([traveller]);
   
    expect(result[0]).toEqual(traveller);
  });

  // it("should call patch API to update employee and change status", () => {
  //   service.register(traveller,).subscribe();
   
  //   let id=localStorage.getItem('id');
  //   let req = httpTestingController.expectOne({
  //     method: "PUT",
  //     url: baseurl+`details/${id}`
  //   });
  //   expect(req.request.body).toEqual(submitData);
  // });
});