import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'pizza-dialog',
  templateUrl: './bookingmodal.component.html',
})
export class BookingModalComponent {
  constructor(public dialogRef: MdDialogRef<BookingModalComponent>) { }
  slotbookdetails = this.dialogRef.componentInstance;
  booking = this.slotbookdetails;
}