using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Core.Models;

namespace Umbraco.Web.Redirects
{
    public class RedirectUrlSearchResult
    {
        public string StatusMessage { get; set; }
        public IEnumerable<IRedirectUrl> SearchResults { get; set; }
        public bool HasSearchResults { get; set; }
        public bool HasExactMatch { get; set; }
        public long TotalCount { get; set; }
        public int PageCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
