import { Component, inject, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../data/weather.service';
import { firstValueFrom, Observable } from 'rxjs';
import { WeatherStore } from '../../data/weather-store';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { NecessaryData } from '../../data/weather.interface';
import { CitiesStore } from '../../data/cities-store';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, AsyncPipe, DecimalPipe],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly weatherStore = inject(WeatherStore);
  private readonly citiesStore = inject(CitiesStore);

  weather$!: Observable<NecessaryData | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  form = new FormGroup({
    search: new FormControl(''),
  });

  likeCities: string[] = [];

  ngOnInit(): void {
    this.weather$ = this.weatherStore.currentWeather$;
    this.loading$ = this.weatherStore.loading$;
    this.error$ = this.weatherStore.error$;

    this.getCities();
    this.startApp();
  }

  private async getWeather(value: string): Promise<void> {
    this.weatherStore.setError(null);
    this.weatherStore.setLoading(true);

    try {
      const cities = await firstValueFrom(this.weatherService.getCities(value));

      if (!cities.results?.length) {
        this.weatherStore.setError('Город не найден');
        return;
      }

      const city = cities.results[0];

      const weather = await firstValueFrom(this.weatherService.getWeather(city.latitude, city.longitude));

      const data: NecessaryData = {
        name: city.name,
        country: city.country,
        population: city.population,
        current: weather.current,
        daily: weather.daily.time.map((time, index) => ({
          time,
          temperature_2m_min: weather.daily.temperature_2m_min[index],
          temperature_2m_max: weather.daily.temperature_2m_max[index],
          weather_code: weather.daily.weather_code[index],
        })),
        hourly: weather.hourly.time.map((time, index) => ({
          time,
          temperature_2m: weather.hourly.temperature_2m[index],
          weather_code: weather.hourly.weather_code[index],
        })),
      };

      this.weatherStore.updateWeather(data);
      this.saveCity(data.name);

      this.form.controls.search.setValue('');
    } catch (err) {
      console.log(err);
      this.weatherStore.setError('Ошибка');
    } finally {
      this.weatherStore.setLoading(false);
    }
  }

  searchCity(): void {
    const value = this.form.value.search;
    if (!value || value === '') return;

    this.getWeather(value);
  }

  clearError(): void {
    this.weatherStore.setError(null);
  }

  selectCity(value: string): void {
    this.getWeather(value);
  }

  refreshCity(): void {
    const value = this.weatherStore.getWeather();
    if (value) {
      this.getWeather(value.name);
    }
  }

  private getCities(): void {
    this.likeCities = this.citiesStore.getCities();
  }

  private saveCity(value: string): void {
    this.citiesStore.saveCity(value);
    this.getCities();
  }

  private startApp() {
    const city = this.likeCities?.[0];
    if (city) {
      this.getWeather(city);
    }
  }
}
