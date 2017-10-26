using System.Collections.Generic;

namespace resonate.WebApi.Models.resonate
{
    /// <summary>
    /// A Country Response Object
    /// </summary>
    public class CountryCityResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<string> Cities { get; set; }
    }
}