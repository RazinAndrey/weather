import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NecessaryData } from './weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherStore {
  private weatherSubject = new BehaviorSubject<NecessaryData | null>(null);
  currentWeather$ = this.weatherSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$: Observable<string | null> = this.errorSubject.asObservable();

  updateWeather(data: NecessaryData | null) {
    this.weatherSubject.next(data);
  }

  getWeather(): NecessaryData | null {
    return this.weatherSubject.value;
  }

  setLoading(status: boolean) {
    this.loadingSubject.next(status);
  }

  setError(error: string | null): void {
    this.errorSubject.next(error);
  }
}
