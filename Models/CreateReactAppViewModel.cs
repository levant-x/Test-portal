using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.IO;
using System;

namespace Portal.Models
{
    public class CreateReactAppVM: Portal.Interfaces.ICredentials
    {
        private static readonly Regex _parser = new Regex(@"<head>(?<HeadContent>.*)</head>\s*" +
            "<body>(?<BodyContent>.*)</body>", RegexOptions.IgnoreCase | RegexOptions.Singleline);
        private static readonly string NOT_FOUND_ERR_MSG = "The SPA build not found in /CliendApp/bild. " +
            "Try to run npm build or npm start before"; 
        private static readonly string NON_HTML_ERR_MSG = "The SPA file does not seem to be a valid HTML";
        private readonly string _fileName;
        

        public string Head { get; set; }
        public string Body { get; set; }
        public string Token { get; set; }
        

        public CreateReactAppVM(HttpContext context, string fileName = "index.html")
        {
            _fileName = fileName;
            var reader = GetSPAStreamReader(context);
            var match = ParseSPA(reader)[0];
            Head = match.Groups["HeadContent"].Value;
            Body = match.Groups["BodyContent"].Value;
        }

        private StreamReader GetSPAStreamReader(HttpContext context)
        {
            var ctxRequest = context.Request;
            var url = $"{ctxRequest.Scheme}://{ctxRequest.Host}{ctxRequest.PathBase}/{_fileName}";
            var request = WebRequest.Create(url);
            var response = request.GetResponse();

            var stream = response.GetResponseStream();
            var result = new StreamReader(stream ?? throw new InvalidOperationException(NOT_FOUND_ERR_MSG));
            return result;
        }

        private MatchCollection ParseSPA(StreamReader reader)
        {
            var htmlFileContent = reader.ReadToEnd();
            var result = _parser.Matches(htmlFileContent);
            if (result.Count != 1) throw new InvalidOperationException(NON_HTML_ERR_MSG);
            return result;
        }
    }
}