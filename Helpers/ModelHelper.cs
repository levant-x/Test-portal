using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Portal.Models;

namespace Portal.Helpers
{
    class ModelHelper
    {
        public static ErrorsMV GetModelErrors(ModelStateDictionary modelState)
        {
            var errors = modelState.Keys
                .Where(key => modelState[key].Errors.Count > 0)
                .ToDictionary(key => key.ToLower(), key => string.Join('\n', modelState[key].Errors
                .Select(error => error.ErrorMessage)));
            return new ErrorsMV() { Errors = errors };
        }
    }
}