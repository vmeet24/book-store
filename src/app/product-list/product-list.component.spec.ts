import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { ProductListComponent } from './product-list.component';
import * as Material from '@angular/material';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../core/book.service';
import { Provider } from '@angular/core';
import { NotifierModule } from 'angular-notifier';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let dialog: Material.MatDialogRef<any>;
  const mockMatDialogRef = {
    closeAll: (): void => undefined
  };
  beforeEach(async(() => {
    const mockProviders: Provider[] = [
      { provide: Material.MAT_DIALOG_DATA, useValue: {} },
      { provide: Material.MatDialogRef, useValue: mockMatDialogRef }
    ];
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Material.MatFormFieldModule, Material.MatTableModule, Material.MatIconModule,
         Material.MatToolbarModule, NotifierModule, Material.MatDialogModule, Material.MatInputModule,
         BrowserAnimationsModule],
      declarations: [ProductListComponent, TopBarComponent],
      providers: [BookService, HttpClient, HttpHandler, mockProviders]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(Material.MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
