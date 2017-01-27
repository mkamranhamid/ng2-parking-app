import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { Login } from '../login/login';
import { BookingModalComponent } from '../modal/bookingmodal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MdDialog) {}
  /*parkingspaces = [
    'A','B','C'
  ];*/

  //ngOnInit() { this.logIt(`OnInit`); }
  parkingSlots: [any];
  dialogRef: MdDialogRef<BookingModalComponent>;
  slotDetails: Object;
  newParkingArr: any;
  parkingspaces: [any] = [
    { place: 'A', parkingSlots: { a: { id: 'a', availability: true, timingAvailability: '' }, b: { id: 'b', availability: false, timingAvailability: '' }, c: { id: 'c', availability: true, timingAvailability: '' } }, availability: true, timingAvailability: '' },
    { place: 'B', parkingSlots: { a: { id: 'aa', availability: false, timingAvailability: '' }, b: { id: 'bb', availability: true, timingAvailability: '' }, c: { id: 'cc', availability: true, timingAvailability: '' } }, availability: true, timingAvailability: '' },
    { place: 'C', parkingSlots: { a: { id: 'ab', availability: true, timingAvailability: '' }, b: { id: 'bc', availability: true, timingAvailability: '' }, c: { id: 'cd', availability: false, timingAvailability: '' } }, availability: true, timingAvailability: '' },
    { place: 'D', parkingSlots: { a: { id: 'a1', availability: true, timingAvailability: '' }, b: { id: 'b1', availability: false, timingAvailability: '' }, c: { id: 'c1', availability: true, timingAvailability: '' } }, availability: true, timingAvailability: '' },
    { place: 'E', parkingSlots: { a: { id: 'ab1', availability: false, timingAvailability: '' }, b: { id: 'bc1', availability: true, timingAvailability: '' }, c: { id: 'cd1', availability: true, timingAvailability: '' } }, availability: true, timingAvailability: '' }
  ];
  logIt(msg: string) {
    this.parkingspaces.map((d, i) => {
      let slotArr = [];
      for (var key in d.parkingSlots) {
        slotArr.push(d.parkingSlots[key])
      }
      d.parkingSlots = slotArr;
      console.log(d);
    });
  }
  clickedParkingSpace(val) {
    console.log(val);
    let slotArr = [];
    for (var key in val.parkingSlots) {
      slotArr.push(val.parkingSlots[key])
    }
    val.parkingSlots = slotArr;
    this.parkingSlots = val.parkingSlots;
  }
  getParkingSpace(slot) {
    if (slot.availability) {
      console.log(slot);
      this.slotDetails = slot;
    } else {
      this.slotDetails = slot;
    }
  }
  bookSlot(slotbookdetails) {
    console.log(slotbookdetails)
    this.dialogRef =  this.dialog.open(BookingModalComponent);
    this.dialogRef.componentInstance.slotbookdetails = slotbookdetails;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
}
/*
@Component({
  selector: 'pizza-dialog',
  template: `
  <h1 md-dialog-title>Would you like to order pizza?</h1>

  <md-dialog-actions>
    <button (click)="dialogRef.close('yes')">Yes</button>
    <button md-dialog-close>No</button>
  </md-dialog-actions>
  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}*/