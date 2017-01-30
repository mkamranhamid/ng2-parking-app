import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Login } from '../login/login';
import { ParkingSlotObject } from './home';
import { BookingModalComponent } from '../modal/bookingmodal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items: FirebaseListObservable<any[]>;
  parkingspaces: FirebaseListObservable<any[]>;
  addSelectedParkingSlotToUser: FirebaseObjectObservable<any[]>;
  bookingSlot: FirebaseObjectObservable<any[]>;
  constructor(public dialog: MdDialog,public af: AngularFire) {
    this.items = af.database.list('/parkingspaces');
    this.parkingspaces = af.database.list('/parkingspaces');
    console.log(this.items)
  }

  //ngOnInit() { this.logIt(`OnInit`); }
  parkingSlots;
  dialogRef: MdDialogRef<BookingModalComponent>;
  slotDetails: Object;
  newParkingArr: any;
  sessionUid:string = sessionStorage.getItem('uid'); 
  uidOfParkingArea:string;
  /*parkingspaces: [any] = [
    { place: 'A', parkingSlots: { a: { id: 'a', availability: true, timingAvailability: '', dateAvailability: '' }, b: { id: 'b', availability: false, timingAvailability: '', dateAvailability: '' }, c: { id: 'c', availability: true, timingAvailability: '', dateAvailability: '' } }, availability: true, timingAvailability: '', dateAvailability: '' },
    { place: 'B', parkingSlots: { a: { id: 'aa', availability: false, timingAvailability: '', dateAvailability: '' }, b: { id: 'bb', availability: true, timingAvailability: '', dateAvailability: '' }, c: { id: 'cc', availability: true, timingAvailability: '', dateAvailability: '' } }, availability: true, timingAvailability: '', dateAvailability: '' },
    { place: 'C', parkingSlots: { a: { id: 'ab', availability: true, timingAvailability: '', dateAvailability: '' }, b: { id: 'bc', availability: true, timingAvailability: '', dateAvailability: '' }, c: { id: 'cd', availability: false, timingAvailability: '', dateAvailability: '' } }, availability: true, timingAvailability: '', dateAvailability: '' },
    { place: 'D', parkingSlots: { a: { id: 'a1', availability: true, timingAvailability: '', dateAvailability: '' }, b: { id: 'b1', availability: false, timingAvailability: '', dateAvailability: '' }, c: { id: 'c1', availability: true, timingAvailability: '', dateAvailability: '' } }, availability: true, timingAvailability: '', dateAvailability: '' },
    { place: 'E', parkingSlots: { a: { id: 'ab1', availability: false, timingAvailability: '', dateAvailability: '' }, b: { id: 'bc1', availability: true, timingAvailability: '', dateAvailability: '' }, c: { id: 'cd1', availability: true, timingAvailability: '', dateAvailability: '' } }, availability: true, timingAvailability: '', dateAvailability: '' }
  ];*/
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
    this.dialog.closeAll()
    console.log(val);
    let slotArr = [];
    for (var key in val.parkingSlots) {
      slotArr.push(val.parkingSlots[key])
    }
    val.parkingSlots = slotArr;
    this.parkingSlots = val.parkingSlots;
    this.uidOfParkingArea = val.id;
  }
  getParkingSpace(slot) {
    this.dialog.closeAll()
    if (slot.availability) {
      console.log(slot);
      this.slotDetails = slot;
    } else {
      this.slotDetails = slot;
    }
  }
  bookSlot(slotbookdetails) {
    if (slotbookdetails.availability) {
      console.log(slotbookdetails)
      this.dialogRef = this.dialog.open(BookingModalComponent);
      this.dialogRef.componentInstance.slotbookdetails = slotbookdetails;
      this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let selectedSlot = result;
          let uidOfSelectedParkingPlace = this.parkingSlots.id;
          let uidOfSelectedSlot = result.id;
          this.bookingSlot = this.af.database.object(`/parkingspaces/${this.uidOfParkingArea}/parkingSlots/${uidOfSelectedSlot}/`);
          this.bookingSlot.set(result);
          this.addSelectedParkingSlotToUser = this.af.database.object(`/users/${this.sessionUid}/selectedSlot/`);
          this.addSelectedParkingSlotToUser.set(result);
          console.log('result: ', result);
          this.dialogRef = null;
        }
      });
    }
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