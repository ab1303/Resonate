using resonate.Services.DTO;

namespace resonate.WebApi.Models.resonate.Weather
{

    public class WeatherResponse : BaseApiResponse
    {
        public WeatherDto Weather { get; set; }

    }

   }