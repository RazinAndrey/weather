import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  private readonly icons: Record<number, string> = {
    // Clear sky
    0: 'fa-sun',
    1: 'fa-sun',
    2: 'fa-cloud-sun',
    3: 'fa-cloud',

    // Fog
    45: 'fa-smog',
    48: 'fa-smog',

    // Drizzle, Rain
    51: 'fa-cloud-rain',
    53: 'fa-cloud-rain',
    55: 'fa-cloud-rain',
    56: 'fa-cloud-rain',
    57: 'fa-cloud-rain',
    61: 'fa-cloud-rain',
    63: 'fa-cloud-rain',
    65: 'fa-cloud-showers-heavy',
    66: 'fa-cloud-rain',
    67: 'fa-cloud-showers-heavy',

    // Snow
    71: 'fa-snowflake',
    73: 'fa-snowflake',
    75: 'fa-snowflake',
    77: 'fa-snowflake',
    80: 'fa-cloud-showers-heavy',
    81: 'fa-cloud-showers-heavy',
    82: 'fa-cloud-showers-heavy',
    83: 'fa-cloud-rain',
    84: 'fa-cloud-rain',
    85: 'fa-snowflake',
    86: 'fa-snowflake',

    // Thunderstorm
    95: 'fa-cloud-bolt',
    96: 'fa-cloud-bolt',
    99: 'fa-cloud-bolt',
  };

  transform(code: number): string {
    return this.icons[code] || 'fa-cloud';
  }
}
