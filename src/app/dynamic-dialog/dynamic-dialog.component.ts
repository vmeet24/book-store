import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements OnInit {
  dialogType: string[] = ['Remove', 'Update', 'Add'];
  isConfirm = false;
  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data?: any) { }
  // FormGroup
  bookForm = new FormGroup({
    bookId: new FormControl({ value: null, disabled: true }),
    bookName: new FormControl('', Validators.required),
    authorName: new FormControl('', Validators.required),
    bookDescription: new FormControl('', Validators.required),
  });
  ngOnInit() {
    if (this.data.type === this.dialogType[1]) {
      this.bookForm.patchValue({
        bookId: this.data.value.bookId,
        bookName: this.data.value.bookName,
        authorName: this.data.value.authorName,
        bookDescription: this.data.value.bookDescription
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(this.isConfirm);
  }
  confirmEvent() {
    // console.log(this.bookForm.getRawValue());
    if (this.data.type === this.dialogType[0]) {
      this.dialogRef.close('Deleted');
    } else {
      if (this.bookForm.valid) {
        if (this.bookForm.dirty) {
          this.dialogRef.close(this.bookForm.getRawValue());
        } else {
          this.dialogRef.close('no change');
        }
      }
    }
  }
}
