using System.ComponentModel.DataAnnotations;

namespace Portal.Models
{
    public class SignInVM: AuthModel
    {
        [Required]
        [Display(Prompt = "Логин")]
        public string Login { get; set; }
    }

    public class FormVM
    {
        public object Item { get; set; }
        public string Header { get; set; }
        public string SubmitText { get; set; }
        public string AltActionText { get; set; }
        public string AltControlID { get; set; }
        public string FormID { get; set; }
        public string FieldsViewName { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
    }
}