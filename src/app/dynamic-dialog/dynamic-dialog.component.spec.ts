import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as Material from "@angular/material";
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { Provider } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DynamicDialogComponent', () => {
  let component: DynamicDialogComponent;
  let fixture: ComponentFixture<DynamicDialogComponent>;
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
      imports: [ReactiveFormsModule, Material.MatToolbarModule, Material.MatFormFieldModule,
        Material.MatDialogModule, Material.MatInputModule, BrowserAnimationsModule,
        RouterTestingModule],
      declarations: [DynamicDialogComponent],
      providers: mockProviders
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(Material.MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call matDialog', () => {
  //   component.onNoClick();
  // });
});
