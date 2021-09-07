import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  countries = [
    {
      name: 'Ukraine',
      cities: ['Lviv', 'Kyiv', 'Skole']
    },
    {
      name: 'Egypt',
      cities: ['Cairo', 'Sharm el-Sheikh', 'Hurgada']
    },
    {
      name: 'Turkey',
      cities: ['Antalya', 'Manavgat', 'Alanya']
    }
  ];

  countryControl: FormControl;
  cityControl: FormControl;

  cities$: Observable<string>;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.cityControl = new FormControl('');

    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
