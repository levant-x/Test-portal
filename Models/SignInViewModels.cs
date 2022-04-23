using System.ComponentModel.DataAnnotations;
using Portal.Interfaces;

namespace Portal.Models
{
    public class LoginVM: AuthModel
    {
        [Required]
        [Display(Prompt = "Телефон или Email")]
        public string Login { get; set; }
    }

    public class AuthResult: IAuthResult
    {
        public string Token { get; set; }
        public IUser Bearer { get; set; }
    }

    public class FormVM
    {
        public object Item { get; set; }
        public string Header { get; set; }
        public string SubmitText { get; set; }
        public string AltActionText { get; set; }
        public string AltActionUrl { get; set; }
        public string FieldsViewName { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
    }
}