export interface City {
  // Массив найденных городов
  results: [
    {
      id: number; // Уникальный идентификатор города в базе
      name: string; // Название города
      latitude: number; // Широта (нужно для запроса погоды)
      longitude: number; // Долгота (нужно для запроса погоды)
      elevation: number; // Высота над уровнем моря в метрах
      feature_code: string; // Тип населенного пункта (PPLC - столица, PPL - город и т.д.)
      country_code: string; // Код страны (RU, US, DE и т.д.)
      // ID административных единиц (для внутреннего использования)
      admin1_id: number; // ID региона (область, штат)
      admin3_id: number; // ID района
      admin4_id: number; // ID микрорайона
      timezone: string; // Часовой пояс (Europe/Moscow)
      population: number; // Население
      postcodes: string[]; // Почтовые индексы
      country_id: number; // ID страны в базе
      country: string; // Название страны (Россия)
      admin1: string; // Название региона (Московская область)
      admin3: string; // Название района
      admin4: string; // Название микрорайона
    },
  ];
  generationtime_ms: number; // Время выполнения запроса в миллисекундах
}
export interface Weather {
  latitude: number; // Широта запроса
  longitude: number; // Долгота запроса
  generationtime_ms: number; // Время выполнения запроса
  utc_offset_seconds: number; // Смещение от UTC в секундах
  timezone: string; // Часовой пояс (Europe/Moscow)
  timezone_abbreviation: string; // Сокращение часового пояса (MSK)
  elevation: number; // Высота над уровнем моря
  current: CurrentCity;
  daily: Daily;
  hourly: Hourly;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface Daily {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weather_code: number[];
}

export interface CurrentCity {
  time: string; // Время измерения
  interval: number; // Интервал обновления (сек)
  temperature_2m: number; // Температура (°C)
  apparent_temperature: number; // Ощущается как
  relative_humidity_2m: number; // Влажность (%)
  precipitation: number; // Осадки всего (мм)
  rain: number; // Дождь (мм)
  showers: number; // Ливни (мм)
  snowfall: number; // Снег (см)
  cloud_cover: number; // Облачность (%)
  is_day: number; // 1 - день, 0 - ночь
  wind_speed_10m: number; // Ветер (км/ч)
  wind_direction_10m: number; // Направление (градусы)
  wind_gusts_10m: number; // Порывы (км/ч)
  pressure_msl: number; // Давление на ур. моря (гПа)
  surface_pressure: number; // Давление на поверхности (гПа)
  weather_code: number; // Код погоды (для иконок)
}

export interface NecessaryData {
  name: string;
  country: string;
  population: number;
  current: CurrentCity;
  daily: NeedDaily[];
  hourly: NeedHourly[];
}

export interface NeedDaily {
  time: string;
  temperature_2m_min: number;
  temperature_2m_max: number;
  weather_code: number;
}

export interface NeedHourly {
  time: string;
  temperature_2m: number;
  weather_code: number;
}
