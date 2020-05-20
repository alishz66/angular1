import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      console.log('Try to get location');
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          // this.notificationService.addSuccess('Got your location');
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(5),
      tap(() => {
        this.notificationService.addSuccess('Got your location.');
      }),
      catchError((err) => {
        this.notificationService.addError(
          'Faild to get your current location.'
        );
        return throwError(err);
      })
    );
  }

  getForcast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', coords.latitude.toString())
          .set('lon', coords.longitude.toString())
          .set('units', 'metric')
          .set('appid', 'be1ecd598107f35257ffa98fd79c5376');
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      pluck('list'),
      mergeMap((value) => of(...value)),
      filter((value, index) => index % 8 === 0),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
          humidity: value.main.humidity,
        };
      }),
      toArray(),
      share()
    );
  }
}
