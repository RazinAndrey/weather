import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Weather } from './weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly urlForWeather = 'https://api.open-meteo.com/v1';
  private readonly urlForCity = 'https://geocoding-api.open-meteo.com/v1';

  getCities(city: string): Observable<City> {
    const params = new HttpParams().set('name', city).set('count', '1').set('language', 'ru').set('format', 'json');

    return this.http.get<City>(`${this.urlForCity}/search`, { params });
  }

  getWeather(latitude: number, longitude: number): Observable<Weather> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set(
        'current',
        [
          'temperature_2m',
          'weather_code',
          'wind_speed_10m',
          'precipitation',
          'rain',
          'showers',
          'snowfall',
          'is_day',
          'apparent_temperature',
          'relative_humidity_2m',
          'cloud_cover',
          'pressure_msl',
          'surface_pressure',
          'wind_direction_10m',
          'wind_gusts_10m',
        ].join(','),
      )
      .set('timezone', 'auto')
      .set('daily', ['temperature_2m_min', 'temperature_2m_max', 'weather_code'].join(','))
      .set('hourly', ['temperature_2m', 'weather_code'].join(','));

    return this.http.get<Weather>(`${this.urlForWeather}/forecast`, { params });
  }
}
