import { BookDetails } from '../core/book.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../core/book.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(1000),
      ])
    ])
  ]
})

export class ProductListComponent implements OnInit {
  items: any;
  displayedColumns: string[] = ['id', 'name', 'author', 'options'];
  dialogType: string[] = ['Remove', 'Update', 'Add'];
  dataSource: any;
  constructor(private bookService: BookService, private router: Router, private dialog: MatDialog, private notifier: NotifierService) { }

  ngOnInit() {
    // Getting The Books
    this.bookService.getBooks().subscribe((res) => {
      // console.log("nice", res);
      this.items = res;
      this.dataSource = new MatTableDataSource(this.items);
    }, err => {
      this.dataSource = new MatTableDataSource(null);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // route to productDetails
  viewBook(value) {
    this.router.navigate(['product', value]);
  }

  // notification
  showNotification(type: string, message: string): void {
    console.log('notify');
    this.notifier.notify(type, message);
  }

  // Add Book
  addBook(type: string) {
    this.dialogOpen(type);
  }

  // Delete
  deleteBook(id, type: string) {
    this.dialogOpen(type, id);
  }

  // dialogOpen
  dialogOpen(type, id?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'Custom-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    if (type === this.dialogType[2]) {
      dialogConfig.data = { type: 'Add', value: null };
      const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result: BookDetails) => {
        if (result) {
          this.bookService.addBook(result).subscribe((res) => {
            this.showNotification('success', 'Book Added Successfully!');
            this.ngOnInit();
          });
        }
      }, err => {
        console.log('Add->', err);
      });
    } else if (type === this.dialogType[0]) {
      dialogConfig.data = { type: 'Remove', value: 'Confirm Delete'};
      const dialogRef = this.dialog.open(DynamicDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.bookService.deleteBookById(id).subscribe(() => {
            this.showNotification('error', 'Book Deleted Successfully!');
            this.ngOnInit();
          });
        }
      }, err => {
        console.log('Confirm Delete->', err);
      });
    }
  }
}


