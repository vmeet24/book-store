import { BookDetails } from './../core/book.model';
import { BookService } from './../core/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class ProductDetailsComponent implements OnInit {
  dialogType: string[] = ['Remove', 'Update', 'Add'];
  id: any;
  bookDetails: BookDetails;
  notifier: NotifierService;
  constructor(private route: ActivatedRoute, private bookService: BookService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('productId');
      this.bookService.getBookById(this.id).subscribe((res: BookDetails) => {
        this.bookDetails = res;
      });
    });
  }

  dialogOpen(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'Custom-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    if (type === this.dialogType[1]) {
      dialogConfig.data = { type: 'Update', value: this.bookDetails };
      const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== 'no change') {
          this.bookService.updateBook(result).subscribe((res: BookDetails) => {
            this.showNotification('success', 'Book Updated Successfully!');
            this.bookDetails = res;
            this.ngOnInit();
          });
        }
      }, err => {
        console.log('Update->', err);
      });
    } else if (type === this.dialogType[0]) {
      dialogConfig.data = { type: 'Remove', value: 'Confirm Delete' };
      const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result: BookDetails) => {
        if (result) {
          this.bookService.deleteBookById(this.bookDetails.bookId).subscribe(() => {
            this.showNotification('error', 'Book Deleted Successfully!');
            this.router.navigate(['/product']);
          });
        }
      }, err => {
        console.log('Confirm Delete->', err);
      });
    }
  }

  // notification
  showNotification(type: string, message: string): void {
    console.log('notify');
    this.notifier.notify(type, message);
  }

  // edit Book

  editBook(type: string) {
    this.dialogOpen(type);
  }

  // delete Book
  deleteBook(type: string) {
    this.dialogOpen(type);
  }
}


