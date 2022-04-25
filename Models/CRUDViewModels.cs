using System.Collections.Generic;
using Portal.Interfaces;

namespace Portal.Models
{
    public class SaveResultVM: ISaveResult
    {
        public IData Entity { get; set; }
        public IDictionary<string, string> Errors { get; } 

        public SaveResultVM(IDictionary<string, string> errors = null)
        {
            Errors = errors ?? new Dictionary<string, string>();
        }
    }
}