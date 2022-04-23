namespace Portal.Helpers
{
    public static class Themes
    {
        public static readonly object FormLabelStyle = new { @class = "form-label fs-6" };
        public static readonly object FormInputStyle = new { @class = "form-control fs-6" };
        public static readonly object FormStyle = new { @class = "card p-5 border-2 border-primary" };
        public static readonly object FormDateInputStyle = new { @class = "form-control fs-6", type = "date" };
        public static readonly object FormErrorMsgStyle = new { @class = "fw-lighter fst-italic text-danger ms-3" };
    }

    public static class Locale
    {
        public static readonly string Required = "Обязательно для заполнения";
    }
}