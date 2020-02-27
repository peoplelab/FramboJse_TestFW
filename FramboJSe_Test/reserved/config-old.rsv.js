//----------------------------------------------------------------------------------------
// File: config.rsv.js
//
// Desc: Configuration file for SystemJS module - Private settings
// Path: /private/
//----------------------------------------------------------------------------------------

/*-----
	// ** Loads cookie and converts data in JSON format **
	cookieRaw = Cookies.get('FramboJSe_TestWAPars');
	var __WACookie = (cookieRaw == undefined || cookieRaw == '')? '' : $.parseJSON(cookieRaw);

	// ** Declare external site URL
//	var __WPressSiteURL = 'https://www.yeapitaly.it';
//	var __WPressSiteURL = 'https://wwws.dev-yeap.it';
	var __WPressSiteURL = (location.href.indexOf('localhost:8082') > -1)? 'https://wwws.dev-yeap.it' : 'https://www.yeapitaly.it';
-----*/


	// ** Declare main paths **
	var _rsvRoot  = '/reserved/';
	var _rsvPaths = {
		framework: _rsvRoot + 'FramboJSe_Test.ext/',
		modules  : _rsvRoot + 'modules/',
		resources: _rsvRoot + 'resources/',
		templates: _rsvRoot + 'templates/',
		xml      : _rsvRoot + 'xml/',
	}

	// ** Declare application paths **
	var __common = {
		modules  : _rsvPaths.modules + 'common/',
		templates: _rsvPaths.templates,
	}
	var __dashboard = {
		presenter: _rsvPaths.modules   + 'dashboards/presenter/',
		modules  : _rsvPaths.modules   + 'dashboards/',
		templates: _rsvPaths.templates + 'dashboards/'
	}
	var __homepage = {
		modules  : _rsvPaths.modules   + 'home/',
		templates: _rsvPaths.templates + 'home/'
	}
	var __menu = {
		modules  : _rsvPaths.modules   + 'common/',
		templates: _rsvPaths.templates + 'menu/'
	}
	var __qualitativa = {
		modules  : _rsvPaths.modules   + 'qualitativa/',
		templates: _rsvPaths.templates + 'qualitativa/'
	}
	var __economics = {
		modules  : _rsvPaths.modules   + 'economics/',
		templates: _rsvPaths.templates + 'economics/'
	}
	var __settings = {
		modules  : _rsvPaths.modules   + 'settings/',
		templates: _rsvPaths.templates + 'settings/'
	}

	// ** Builds system data configuration **
	var __RSV_config = {
		map: {

			// ** Framework extensions **
			// Snippets:
			snippetsList_rsv   : _rsvPaths.framework + 'snippets/snippetsList.rsv.js',
			widgetsList_rsv    : _rsvPaths.framework + 'widgets/widgetsList.rsv.js',
			// Templates:
			templatesList_rsv  : _rsvPaths.templates + 'templatesList.rsv.js',
			// Router:
			routerList_rsv     : _rsvPaths.framework + 'routerList.rsv.js',
			// Sitemap
			customizeSitemap   : _rsvPaths.framework + 'sitemapCustomization.rsv.js',

			// ** "Private" settings **
			// Menu
			menu               : _rsvPaths.modules + 'common/presenter/menu.presenter.js',
			datagrid           : _rsvPaths.modules + 'economics/presenter/datagrid.presenter.js',
			
		}
	};

	var __Preloads = {};							// Struttura per il precaricamento dei dati da chiamate SaaS
