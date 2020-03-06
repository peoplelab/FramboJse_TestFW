using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace FramboJSe_Test.MasterPages {


	public partial class Main_pvt : System.Web.UI.MasterPage {

		#region main variables
		public string ExportVersion = "";
		
		public string[] Lib_js  = new string[] {
			"/System/3rd-parties/jquery/jquery.min.js", 
			"/System/3rd-parties/jquery-ui/jquery-ui.min.js", 
			"/System/3rd-parties/bootstrap/js/bootstrap.bundle.min.js", 
			"/System/3rd-parties/jscookie/js.cookie.js", 
			"/System/3rd-parties/fontawesome/js/fontawesome-all.min.js", 
			"/System/3rd-parties/system/system.js"
		};
		public string[] Lib_css = new string[] {
			"/System/3rd-parties/jquery-ui/jquery-ui.min.css", 
			"/System/3rd-parties/bootstrap/css/bootstrap.min.css", 
			"/System/3rd-parties/fontawesome/css/fa-svg-with-js.css"
		};
		public string[] Sys_js  = new string[] {
			"/public/config.pub.js",
			"/private/config.pvt.js",
			"/System/config.sys.js",
			"/System/FramboJSe_Test.fw/libs/js/main.sys.js"
		};
		public string[] Sys_css = new string[] {
			"/system/resources/css/overrides.sys.css",
			"/system/resources/css/typographics.sys.css",
			"/system/resources/css/structural.sys.css",
		};
		public string[] Pvt_js  = new string[] {
		};
		public string[] Pvt_css = new string[] {
			"/private/resources/css/overrides.pvt.css",
			"/private/resources/css/typographics.pvt.css",
			"/private/resources/css/application.pvt.css",
		};

		#endregion

		#region main class
		public class DeclareFiles {

			#region Dichiarazioni variabili

			private readonly string[] TAG_JS  = {"<script type=\"text/javascript\" src=\"", "\"></script>"};
			private readonly string[] TAG_CSS = {"<link rel=\"stylesheet\" type=\"text/css\" href=\"", "\" />"};
			private const byte BUILD_JS  = 0;
			private const byte BUILD_CSS = 1;
	
			private string[] _js  = new string[] {};
			private string[] _css = new string[] {};
			private string   _ver = "";

			#endregion

	        #region Properties

			public string Js  { 
				get { return this.buildTags(BUILD_JS); } 
			}
			public string Css {
				get { return this.buildTags(BUILD_CSS); } 
			}

	        #endregion
			
			#region Constructors 

			public DeclareFiles(string[] js, string[] css, string ver) { 
				
				this._js  = js;
				this._css = css;
				this._ver = ver;

			}

			#endregion

			#region Public Methods
			private string buildTags (byte id) {

				string[] fileList = new string[]{ };
				string   tagInit  = "";
				string   tagClose = "";

				switch (id) {
					case BUILD_JS:
						tagInit  = TAG_JS[0];
						tagClose = TAG_JS[1];
						fileList = this._js;
						break;

					case BUILD_CSS:
						tagInit  = TAG_CSS[0];
						tagClose = TAG_CSS[1];
						fileList = this._css;
						break;

					default:
						break;
				}

				StringBuilder htmlString = new StringBuilder();
				foreach (string fileName in fileList) {
				//htmlString.Append("\t");
					htmlString
						.Append(tagInit)
						.Append(fileName)
						.Append(this._ver)
						.Append(tagClose)
						.Append("\n\t");
				}
				htmlString.Append("\n\t");

				return htmlString.ToString();

			}
			#endregion
			
		}
		#endregion

		public const byte JS_FILES  = 0;
		public const byte CSS_FILES = 1;

		public string Mayor    = "";
		public string Minor    = "";
		public string Build    = "";
		public string Revision = "";
		public string Version  = "";

		public string[] LibFiles = new string[] {"", ""};
		public string[] SysFiles = new string[] {"", ""};
		public string[] PvtFiles = new string[] {"", ""};


		protected void Page_Init(object sender, EventArgs e) {
			
			Assembly assem = typeof(Main_pvt).Assembly;
			AssemblyName assemName = assem.GetName();
			
			this.Mayor    = assemName.Version.Major.ToString("0");
			this.Minor    = assemName.Version.Minor.ToString("0");
			this.Build    = assemName.Version.Build.ToString("0");
			this.Revision = assemName.Version.Revision.ToString("0");
			this.Version  = "?v=" + Revision;

			ExportVersion = Version;

		}

		protected void Page_Load(object sender, EventArgs e) {

			// Definizione degli insiemi di tag
			DeclareFiles Lib = new DeclareFiles(Lib_js, Lib_css, "?v=" + Mayor);
				LibFiles[JS_FILES]  = Lib.Js;
				LibFiles[CSS_FILES] = Lib.Css;

			DeclareFiles Sys = new DeclareFiles(Sys_js, Sys_css, "?v=" + Build);
				SysFiles[JS_FILES]  = Sys.Js;
				SysFiles[CSS_FILES] = Sys.Css;

			DeclareFiles Pvt = new DeclareFiles(Pvt_js, Pvt_css, "?v=" + Revision);
				PvtFiles[JS_FILES]  = Pvt.Js;
				PvtFiles[CSS_FILES] = Pvt.Css;

		}

	}
}