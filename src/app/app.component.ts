import { Component, inject, OnInit, signal } from '@angular/core';
import { Info } from './components/info/info';
import { Panel } from './components/panel/panel';
import { Daily } from './components/daily/daily';
import { WeatherStore } from './data/weather-store';
import { Observable } from 'rxjs';
import { NecessaryData } from './data/weather.interface';
import { AsyncPipe } from '@angular/common';
import { Hourly } from './components/hourly/hourly';

type MainContent = 'hourly' | 'daily';

@Component({
  selector: 'app-root',
  imports: [Info, Panel, Daily, Hourly, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly weatherStore = inject(WeatherStore);
  weather$!: Observable<NecessaryData | null>;

  public readonly activeTab = signal<MainContent>('daily');

  ngOnInit(): void {
    this.weather$ = this.weatherStore.currentWeather$;
  }

  switchContent(value: MainContent): void {
    this.activeTab.set(value);
  }
}
