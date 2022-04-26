using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Portal.Models;

namespace Portal.Helpers
{
    static class ModelHelper
    {
        public static SaveResultVM<object> GetModelErrors(ModelStateDictionary modelState)
        {
            var errors = modelState.Keys
                .Where(key => modelState[key].Errors.Count > 0)
                .ToDictionary(key => key.ToLower(), key => string.Join('\n', modelState[key].Errors
                .Select(error => error.ErrorMessage)));
            return new SaveResultVM<object>(errors);
        }

        public static void MarkDuplication(IDictionary<string, string> errors, List<User> scope, 
            string propName, string value, string prompt)
        {
            var duplication = scope.FirstOrDefault(item => item.GetType().GetProperty(propName)
                .GetValue(item).ToString().Normalize() == value.Normalize());
            if (duplication == null) return;
            errors.Add(propName, $"{prompt} уже используется");
        }
    }
}