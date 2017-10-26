using resonate.Services.DTO;

namespace resonate.Services.Results
{
    public class WeatherResult : ServiceResult
    {
        public WeatherDto CityWeather { get; set; }

    }
}
