//----------------------------------------------------------------------------------------
// File: config.pvt.js
//
// Desc: Configuration file for SystemJS module - Private settings
// Path: /private/
//----------------------------------------------------------------------------------------

	// ** Loads cookie and converts data in JSON format **
	cookieRaw = Cookies.get('FramboJSe_TestWAPars');
	var __WACookie = (cookieRaw == undefined || cookieRaw == '')? '' : $.parseJSON(cookieRaw);


	// ** Declare main paths **
	var _pvtRoot  = '/private/';

	var _pvtPaths = {
		framework: _pvtRoot + 'framboJSe.ext/',
		modules  : _pvtRoot + 'modules/',
		resources: _pvtRoot + 'resources/',
		templates: _pvtRoot + 'templates/',
		xml      : _pvtRoot + 'xml/',
	}

	// ** Declare application paths **
	var __dashboard = {
		presenter: _pvtPaths.modules   + 'dashboards/presenter/',
		modules  : _pvtPaths.modules   + 'dashboards/',
		templates: _pvtPaths.templates + 'dashboards/'
	}
	var __demopage = {
		modules  : _pvtPaths.modules   + 'demo/',
		templates: _pvtPaths.templates + 'demo/'
	}
	var __homepage = {
		modules  : _pvtPaths.modules   + 'home/',
		templates: _pvtPaths.templates + 'home/'
}
	var __loginpage = {
		modules  : _pvtPaths.modules   + 'login/',
		templates: _pvtPaths.templates + 'login/'
	}
//	var __menu = {
//		modules  : _pvtPaths.modules   + 'common/',
//		templates: _pvtPaths.templates + 'menu/'
//	}

	// ** Builds system data configuration **
	var __PVT_config = {
		map: {

			// ** Framework extensions **
			// Snippets:
			snippetsList_pvt   : _pvtPaths.framework + 'snippets/snippetsList.pvt.js',
			widgetsList_pvt    : _pvtPaths.framework + 'widgets/widgetsList.pvt.js',
			// Templates:
			templatesList_pvt  : _pvtPaths.templates + 'templatesList.pvt.js',
			// Router:
			routerList_pvt     : _pvtPaths.framework + 'routerList.pvt.js',
			// Sitemap
			customizeSitemap   : _pvtPaths.framework + 'sitemapCustomization.pvt.js',

			// ** "Private" settings **
			// Menu
			menu               : _pvtPaths.modules + 'common/presenter/menu.presenter.js',
			datagrid           : _pvtPaths.modules + 'economics/presenter/datagrid.presenter.js',
			
		}
	};

	var __Preloads = {};							// Struttura per il precaricamento dei dati da chiamate SaaS
