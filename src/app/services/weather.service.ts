import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  public getWeatherForCity(city: string): Observable<any> {

    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${environment.apiId}`;

    return this.http.get<any>(path).pipe(
      map(data => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
      delay(500)
    );
  }
}
