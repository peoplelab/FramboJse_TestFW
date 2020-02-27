//----------------------------------------------------------------------------------------
// File: config.sys.js
//
// Desc: Configuration file for SystemJS module - Framework core settings
// Path: /System/
//----------------------------------------------------------------------------------------

	var filename = 'system';
		
	// ** System variables **
	var __SYS_consoleLog   = true;												// Enables the system console logs
	var __SYS_consoleClear = false;												// Enables the console clearing when loading new pages
	var __SYS_redirect400  = false;												// Enables the redirect on 400's family errors
	var __SYS_showBreaks   = false;												// Show the label of the current Bootstrap viewport size


	// ** Declare main paths **
	var _sysRoot      = '/System/';												// System folder root
	var _sys3rdParts  = _sysRoot + '3rd-parties/';								// Path: libraries/frameworks of 3rd parties
	var _sysFrameWork = _sysRoot + 'FramboJSe_Test.fw/';								// Path: our framework
	var _sysWrappers  = _sysRoot + 'wrappers/';									// Path: wrappers (drivers for 3rd parties libraries)
	var _sysTemplates = _sysRoot + 'templates/';								// System templates path

	var _loginRoot    = '/public/modules/login/';								// Login management folder root


	// ** Builds system data configuration **
	__SYS_config = {
	//var mapping = {
		
		baseURL: "/",
		defaultExtensions: 'js',
		map: {

			// ** 3rd-parties **
			bootstrap         : _sys3rdParts + 'bootstrap/js/bootstrap.budle.min.js',
			colorBox          : _sys3rdParts + 'colorbox/jquery.colorbox-min.js',
			fontawesome       : _sys3rdParts + 'fontawesome/js/fontawesome-all.min.js',
			jCropMin          : _sys3rdParts + 'jcrop/js/jquery.Jcrop.min.js',
			jquery            : _sys3rdParts + 'jquery/jquery.min.js',
			jquery_ui         : _sys3rdParts + 'jquery-ui/jquery-ui.min.js',
			jsCookie          : _sys3rdParts + 'jscookie/js.cookie.js',
			md5               : _sys3rdParts + 'md5/md5.js',
			tSorterMin        : _sys3rdParts + 'tablesorter/jquery.tablesorter.min.js',
			tSorterWidgets    : _sys3rdParts + 'tablesorter/jquery.tablesorter.widgets.min.js',
			bs_datepicker     : _sys3rdParts + 'datepicker/bootstrap-datepicker.min.js',
			bs_datepicker_it  : _sys3rdParts + 'datepicker/bootstrap-datepicker.it.min.js',
				
			// ** Framework **
			// Base:
			base_controller   : _sysFrameWork + 'controller/base.controller.js',
			base_model        : _sysFrameWork + 'model/base.model.js',
			base_presenter    : _sysFrameWork + 'presenter/base.presenter.js',
			// Libs:
			mainJs            : _sysFrameWork + 'libs/js/main.sys.js',
			// Modals:
			modals            : _sysFrameWork + 'presenter/modals.presenter.js',
			// Router:
			router            : _sysFrameWork + 'controller/router.controller.js',
			// Sitemap:
			sitemap           : _sysFrameWork + 'presenter/sitemap.presenter.js',
			sitemap_ctrl      : _sysFrameWork + 'controller/sitemap.controller.js',
			// Snippets:
			snippets          : _sysFrameWork + 'presenter/snippetsHandler.presenter.js',
            dd_base           : _sysFrameWork + 'presenter/snippets/dd_base.js',
            input_kernel      : _sysFrameWork + 'presenter/snippets/input_kernel.js',
            input_text        : _sysFrameWork + 'presenter/snippets/input_text.js',
            input_hidden      : _sysFrameWork + 'presenter/snippets/input_hidden.js',
			snippetsList_sys  : _sysFrameWork + 'presenter/snippets/snippetsList.sys.js',
			widgetsList_sys   : _sysFrameWork + 'presenter/widgets/widgetsList.sys.js',
			// default (empty file):
			default			  : _sysFrameWork + '/presenter/default.presenter.js',
			// Templates:
			templatesHandler  : _sysFrameWork + 'presenter/templatesHandler.presenter.js',
			templatesList_sys : _sysTemplates + 'templatesList.sys.js',


			// ** Wrappers **
			tableSorter       : _sysWrappers + 'wrapper.tablesorter.js',
			jCrop             : _sysWrappers + 'wrapper.jcrop.js',
			googleMaps        : _sysWrappers + 'wrapper.google_maps.js',
			datepicker        : _sysWrappers + 'wrapper.datepicker.js',


			// ** Login management **
			loginController   : _loginRoot + 'controller/login.controller.js',
			loginModel        : _loginRoot + 'model/login.model.js',
			loginPresenter    : _loginRoot + 'presenter/login.presenter.js',


			// ** Page management **
			currentController : '',
			currentModel      : '',
			currentPresenter  : '',
			currentDashboard  : '',
		}
	}


//	// ** Merge System & Application configurations **
//	if ( __PUB_config != undefined && __PUB_config != '' ) {
//		$.extend(__SYS_config.map, __PUB_config.map);
//	}
//	if (__PageScope == 'private') {
//		if ( __PVT_config != undefined && __PVT_config != '' ) {
//			$.extend(__SYS_config.map, __PVT_config.map);
//		}
//	}
//	if (__PageScope == 'reserved') {
//		if ( __RSV_config != undefined && __RSV_config != '' ) {
//			$.extend(__SYS_config.map, __RSV_config.map);
//		}
//	}



//	// ** Initialize Configuration and resets the global var**
//	SystemJS.config(__SYS_config);
//	__SYS_config = {
//		current: {
//			module: '',
//			page  : '',
//			code  : ''
//		}
//	}
//
//	if (__SYS_consoleLog) {
//		if (__SYS_consoleClear) {console.clear()}
//		console.log('%cFramboJSe_Test.fw initialized...', 'background: #e0e0e0; color: #c00; font-weight: bold; padding: 3px 10px; display: block;');
//	}

