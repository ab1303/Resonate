using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using resonate.Services.Results;

namespace resonate.Services.Results
{
    public class CountryCityResult:ServiceResult
    {
        public IEnumerable<string> Cities { get; set; }

    }
}
