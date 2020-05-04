import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  TopBarComponent} from "../top-bar/top-bar.component";
import { HomeComponent } from './home.component';
import * as Material from "@angular/material";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[Material.MatToolbarModule],
      declarations: [ HomeComponent,TopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
