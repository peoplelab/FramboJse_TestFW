//----------------------------------------------------------------------------------------
// File: hybridhome.presenter.js
//
// Desc: Presenter della pagina "hybridhome"
// Path: /Private/modules/hybrid/presenter
//----------------------------------------------------------------------------------------

define([
	'base_presenter',
	'templatesHandler',
	'snippets',
	'modals',
	//	'currentDashboard',
	'/private/bridge/hybrid/ReactBridge.jsx',
], function (pBase, th, snippets, modals, dashboard) {

	// ** Module management **
	var _module = {};																				// Mapping of the current module
	var _resources = {};																					// Mapping of the additional resources (.css and/or .js files)
	var _wsGetSettings;
	// ** Global variables **
	var _xml = '';																					// XML data (to show)
	var _pageID = '';																					// Sitemap/page ID
	var _templateID = '';																				// Template ID (for presenter)
	var _pageContainer = '#pageContainer';															// Target container (ID) for the list template 

	return {
		Init: init,																				// Initializes (setup) the page
		RenderPage: renderPage																	// renderizza la pagina
	}

	// FUNCTION: init
	//  Initializes the HTML page objects for UI render
	// PARAMS:
	//  params.page_id : page ID
	// RETURN:
	//  none
	function init(params) {
		_module.id = SystemJS.map.currentPresenter.replace(location.origin, '');						// Determina il 
		_pageID = params.pageID;
		_templateID = params.templateID;
	}

	// FUNCTION: renderPage
	//  Starts process of getting the HTML template, fills it with XML values and initializes its custom elements
	// PARAMS:
	//  params.rawData             : XML raw data.
	// RETURN:
	//  none
	function renderPage(params) {
		_module.fn = pBase.fnName(arguments);															// Traces the current function
		_xml = $.parseXML(params.RawData);														// Transforms raw XML data into an XML document
		_wsGetSettings = params.wsGetSettings;
		th.Render({
			code: _templateID[0],
			XML: _xml,
			onSuccess: function (result) {
				render_template_page({																	// Carica il template nel DOM
					templateHtml: result,
					wsGetSettings: _wsGetSettings,
				});
				render_template_values({ cookie: params.wsGetSettings });																// Costruisce il contenuto del template
				render_snippet();																		// Risoluzione degli snippet
				pBase.LoadResources(_resources);														// Carica eventuali risorse aggiuntive (.css and/or .js)
			},
			onFailed: function (result) {
				pBase.RedirectToErrorPage(result.code, result.descr, _module);
			}
		});
		}

	// FUNCTION: render_template_page
	//  Initializes the custom elements in the page.
	// PARAMS:
	//  params.templateHtml : the precompiled HTML template
	// RETURN:
	//  none
	function render_template_page(params) {
		$(_pageContainer).html(params.templateHtml);													// Fills the HTML's case with the precompiled HTML template
	}

	//function renderPage(params) {
	//}


	// FUNCTION: render_template_values
	//  Initializes the custom elements in the page.
	// PARAMS:
	//  params.onSave : event handler (callback) for "Save" button click.
	// RETURN:
	//  none
	function render_template_values({ cookie }) {
		document.getElementById('react-bridge').name = 'FramboJSe_TestWAPars';
		document.getElementById('react-bridge').value = cookie;
	}

	// FUNCTION: render_snippet
	//  Resolves snippet and assigns callback functions to the new DOM elements
	// PARAMS:
	//  params.domain           : name of the domain (container ID) the snippet belongs to
	//  params.onDeleteCallback : event handler (callback) for "Delete" button click.
	// RETURN:
	//  none
	function render_snippet(params) {
	}
});