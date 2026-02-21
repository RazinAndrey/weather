import { Component, inject, OnInit } from '@angular/core';
import { WeatherStore } from '../../data/weather-store';
import { map, Observable } from 'rxjs';
import { NecessaryData, NeedHourly } from '../../data/weather.interface';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { WeatherIconPipe } from '../../pipes/weather-icon-pipe';

@Component({
  selector: 'app-hourly',
  imports: [AsyncPipe, DatePipe, WeatherIconPipe, NgClass],
  templateUrl: './hourly.html',
  styleUrl: './hourly.css',
})
export class Hourly implements OnInit {
  private readonly weatherStore = inject(WeatherStore);
  hourly$!: Observable<NeedHourly[]>;

  ngOnInit(): void {
    this.hourly$ = this.weatherStore.currentWeather$.pipe(
      map((weather) => {
        return weather?.hourly.filter((day) => this.isNotHour(day.time)).slice(0, 15) || [];
      }),
    );
  }

  private isNotHour(dateString: string): boolean {
    const today = new Date();
    const compareDate = new Date(dateString);

    return compareDate > today;
  }
}
