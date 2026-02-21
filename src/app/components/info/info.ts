import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { WeatherStore } from '../../data/weather-store';
import { NecessaryData } from '../../data/weather.interface';
import { WeatherIconPipe } from '../../pipes/weather-icon-pipe';
import { WeatherDescriptionPipe } from '../../pipes/weather-description-pipe';

@Component({
  selector: 'app-info',
  imports: [AsyncPipe, DatePipe, NgClass, WeatherIconPipe, WeatherDescriptionPipe],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class Info implements OnInit {
  private readonly weatherStore = inject(WeatherStore);
  weather$!: Observable<NecessaryData | null>;

  ngOnInit(): void {
    this.weather$ = this.weatherStore.currentWeather$;
  }
}
