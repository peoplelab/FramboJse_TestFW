using FramboJSe_Test.MasterPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FramboJSe_Test.Pages {

	// Code behind comune a tutte le pagine "figlie" di Main.pvt.master
	public partial class Main_pvt_settings : System.Web.UI.Page {
	
		public string Ver = "";
		protected void Page_Load(object sender,EventArgs e) {
			
			Ver = ((Main_pvt)this.Master).ExportVersion;					// Eredita il nr. versione determinato nella Master

		}
	}
}