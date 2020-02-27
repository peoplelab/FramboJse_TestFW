
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FramboJSe_Test.Pages
{
	public partial class login : System.Web.UI.Page
{
        public string Ver = "";
        protected void Page_Load(object sender, EventArgs e)
    {
            Ver = ((MasterPages.Main_pvt)this.Master).ExportVersion;                 // Eredita il nr. versione determinato nella Master
        }
}
}