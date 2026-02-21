import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CitiesStore {
  private readonly CITIES_KEY = 'cities';

  saveCity(city: string) {
    const cities = this.getCities();

    let newCities: string[];

    // удалить, если уже есть
    newCities = cities.filter((c) => c !== city);

    // добавляем в начало
    newCities = [city, ...newCities];

    // оставляем только первые 3
    newCities = newCities.slice(0, 3);

    localStorage.setItem(this.CITIES_KEY, JSON.stringify(newCities));
  }

  getCities(): string[] {
    const localCities = localStorage.getItem(this.CITIES_KEY);

    if (!localCities) {
      return [];
    }

    return JSON.parse(localCities);
  }
}
