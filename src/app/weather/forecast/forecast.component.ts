import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecast$: Observable<{ dateString: string, temp: number, humidity: number }[]>;
  constructor(private forecastService: ForecastService) {
    this.forecast$ = forecastService.getForcast();

  }

  ngOnInit(): void {
  }

}
