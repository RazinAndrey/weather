import { Component, inject, OnInit } from '@angular/core';
import { WeatherStore } from '../../data/weather-store';
import { NecessaryData, NeedDaily } from '../../data/weather.interface';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { WeatherIconPipe } from '../../pipes/weather-icon-pipe';

@Component({
  selector: 'app-daily',
  imports: [AsyncPipe, DatePipe, WeatherIconPipe, NgClass],
  templateUrl: './daily.html',
  styleUrl: './daily.css',
})
export class Daily implements OnInit {
  private readonly weatherStore = inject(WeatherStore);
  daily$!: Observable<NeedDaily[]>;

  ngOnInit(): void {
    this.daily$ = this.weatherStore.currentWeather$.pipe(
      map((weather) => {
        return weather?.daily.filter((day) => this.isNotToday(day.time)).slice(0, 15) || [];
      }),
    );
  }

  private isNotToday(dateString: string): boolean {
    const today = new Date();
    const compareDate = new Date(dateString);

    return (
      today.getFullYear() !== compareDate.getFullYear() ||
      today.getMonth() !== compareDate.getMonth() ||
      today.getDate() !== compareDate.getDate()
    );
  }
}
