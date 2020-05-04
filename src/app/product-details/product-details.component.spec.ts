import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ProductDetailsComponent } from './product-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from "@angular/router/testing";
import { NotifierModule } from 'angular-notifier';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatDialogModule, RouterTestingModule, BrowserAnimationsModule,NotifierModule],
      declarations: [ProductDetailsComponent]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should work', () => {
    expect(component.dialogType).toEqual(["Remove", "Update", "Add"]);
  });
});
