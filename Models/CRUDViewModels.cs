using System.Collections.Generic;
using Portal.Interfaces;

namespace Portal.Models
{
    public class SaveResultVM<T>: ISaveResult<T>
    {
        public T Value { get; set; }
        public IDictionary<string, string> Errors { get; } 

        public SaveResultVM(IDictionary<string, string> errors = null)
        {
            Errors = errors ?? new Dictionary<string, string>();
        }
    }

    public class EstimationVM
    {
        public bool? Estimation { get; set; }
        public int DeltaPos { get; set; }
        public int DeltaNeg { get; set; }
    }
}