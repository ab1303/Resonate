using resonate.Services.Results;

namespace resonate.Services.Interfaces
{
    public interface IWeatherService
    {
        CountryCityResult GetCities(string country);
        WeatherResult GetCityWeather(string cityName);
    }
}
