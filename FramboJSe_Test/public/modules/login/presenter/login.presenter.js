//----------------------------------------------------------------------------------------
// File: login.presenter.js
//
// Desc: Presenter della pagina "login"
// Path: /public/modules/login/presenter
//----------------------------------------------------------------------------------------

define([
	'base_presenter',
	'templatesHandler',
	'snippets',
	'modals',
	//	'currentDashboard',
], function (pBase, th, snippets, modals, dashboard) {

	// ** Module management **
	var _module = {};																					// Mapping of the current module
	var _resources = {}																					// Mapping of the additional resources (.css and/or .js files)
	var _pippolocale;
	// ** Global variables **
	var _xml = '';																					// XML data (to show)
	var _pageID = '';																					// Sitemap/page ID
	var _templateID = '';																				// Template ID (for presenter)
	var _modalsContainer = '#modalsContainer';															// Target container (ID) for the modal windows
	var _menuContainer = '#menuContainer';															// Target container (ID) for the filter template
	var _pageContainer = '#pageContainer';															// Target container (ID) for the list template 


	return {

		Init: init,																				// Initializes (setup) the page
		RenderPage: renderPage,																			// Render del contenuto pagina
		GetData4Saving: function () {																	// Gets data from page controls for saving
			return pBase.BuildsJson4Save('')
		},
		Show_ok_modal: function () {																	// "Ok" modal window's handler
			modals.ShowOK({
				target: _modalsContainer
			})
		},
		Show_ko_modal: function (code, msg) {															// "Error" modal window's handler
			modals.ShowErr({
				target: _modalsContainer,
				errCode: code,
				errMsg: msg
			})
		},
		Show_ko: function (code, msg) {																	// "Error" handler
			pBase.RedirectToErrorPage(code, msg);
		}

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

		// Initializes Pagedashboard
		//dashboard.Init({ container: "dashboard" });

		// Initializes Menu
		//menu.Init({ container: _menuContainer });
	}


	// FUNCTION: renderPage
	//  Starts process of getting the HTML template, fills it with XML values and initializes its custom elements
	// PARAMS:
	//  params.rawData             : XML raw data.
	//  params.onDeleteButtonClick : event handler (callback) for "Delete" button click.
	// RETURN:
	//  none
	function renderPage(params) {

		_module.fn = pBase.fnName(arguments);															// Traces the current function
		_xml = $.parseXML(params.RawData);														// Transforms raw XML data into an XML document
		_pippolocale=params.pippo;
		th.Render({
			code: _templateID[0],
			XML: _xml,
			//	onSuccess: function (result) {																// NOTA: gestione presa da Yeap, dove prima della render_template doveva essere eseguita un'altra funzione asincrona
			//	
			//		var html = result;
			//
			//		resources.XmlEconomics({
			//			onSuccess: function(result) {
			//				__Preloads.economics = result;
			//		
			//				render_template_page({ 
			//					templateHtml  : html,
			//					xmlDocument   : _xml,
			//				});
			//				render_snippet({
			//					domain: _pageContainer,														// Define the range for snippets' resolution. (Default: _templateContainer -> Applies to the template container. Should be also: "" -> Applies to the whole document)
			//				//	onSaveCallBack: params.OnSave,												// Callback per salvataggio dati.
			//				//	onCompile     : params.Compile,												// Callback per salvataggio dati.
			//				});
			//				pBase.LoadResources(_resources);												// Loads additional resources (.css and/or .js)
			//
			//			}
			//		});
			//	},
			onSuccess: function (result) {
				render_template_page({																	// Carica il template nel DOM
					templateHtml: result,
					pippo:_pippolocale
//dafaresulclick:_pippolocale
				});
				render_template_values({																// Costruisce il contenuto del template
				});
				render_snippet({																		// Risoluzione degli snippet
					domain: _pageContainer,																// Define the range for snippets' resolution. (Default: _templateContainer -> Applies to the template container. Should be also: "" -> Applies to the whole document)
					onSaveCallBack: params.OnSave,														// Callback per salvataggio dati.
				});
				pBase.LoadResources(_resources);														// Carica eventuali risorse aggiuntive (.css and/or .js)
			},
			onFailed: function (result) {
				pBase.RedirectToErrorPage(result.code, result.descr, _module);
			}
		});

		// Renders the Dashboard
		//dashboard.Render({});

		// Renders the menu
		//menu.Render({active: _pageID});

	}

	// FUNCTION: render_template_page
	//  Initializes the custom elements in the page.
	// PARAMS:
	//  params.templateHtml : the precompiled HTML template
	// RETURN:
	//  none
	function render_template_page(params) {

		$(_pageContainer).html(params.templateHtml);													// Fills the HTML's case with the precompiled HTML template
		jQuery.noConflict();																			// Prevent jquery and bootstrap scripts conflicting because declared twice

		$('#cammelloLogin').click(function() {
 _pippolocale({Username:$('#username').val(),Password:$('#password').val()})
});
		// ***
		// *** Funzioni per elementi statici del DOM (es. handler eventi), da questo momento esistenti 
		// ***
		//
		// Esempio:
		//	$('#btn-generic').click(function(e) {
		//	
		//		e.preventDefault();
		//		//... Do something with $(this)
		//	});

	}


	// FUNCTION: render_template_values
	//  Initializes the custom elements in the page.
	// PARAMS:
	//  params.onSave : event handler (callback) for "Save" button click.
	// RETURN:
	//  none
	function render_template_values(params) {

		//var saveCallBack = params.onSave;
		// ...

		$('#preloader').attr('style', 'display:none');													// Hides the "preloader" layer
		//	modals.ShowOK({target: _modalsContainer});

		if (location.hash != '') {
			y = $(location.hash).offset();
			if (!isNaN(y)) window.scrollTo(0, $(location.hash).offset().top)
		}

		$('h3.card-header').click(function () {
			x = $(this).attr('aria-expanded');
			if (x == 'false') {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});


		$('.ground').click(function () {
			var c = $(this).css('background');
			var vals = c.substring(c.indexOf('(') + 1, c.length - 1).split(', ');
			var hexString = '[ Codice: #';
			for (i = 0; i < 3; i++) {
				var h = parseInt(vals[i]).toString(16);
				if (h.length % 2) { h = '0' + h; }
				hexString += h
			}
			hexString += ' ]';

			var pDiv = $(this).parents()[2];
			$(pDiv).find('.colorCode').html(hexString);
			$(pDiv).find('.ground').removeClass('selected');
			$(this).addClass('selected');
		});


		$('.fontSizes').change(function () {
			var target = $(this).attr('ref');
			var oldVal = $(this).attr('current');
			var newVal = $(this).val();

			//$(target + ' span').removeClass(oldVal).addClass(newVal);
			$(target + ' ul').removeClass(oldVal).addClass(newVal);
			$(this).attr('current', newVal);
		});

	}


	// FUNCTION: render_snippet
	//  Resolves snippet and assigns callback functions to the new DOM elements
	// PARAMS:
	//  params.domain           : name of the domain (container ID) the snippet belongs to
	//  params.onDeleteCallback : event handler (callback) for "Delete" button click.
	// RETURN:
	//  none
	function render_snippet(params) {

		var saveCallBack = params.onSaveCallBack														// Pulsante "Salva"
		var myXml = params.xmlData;

		// Invokes the snippets resolution
		snippets.Render({
			domain: params.domain,
			callBack: snippetsCallBack,
			others: myXml,
		});


		// FUNCTION: snippetsCallBack
		//  Handles the callbacks for the new DOM elements (snippets replacement)
		// PARAMS:
		//  params.domain  : name of the domain (container ID) the snippet belongs to
		//  params.snippet : name of the snippet to be processed
		// RETURN:
		//  none
		function snippetsCallBack(params) {

			var domain = params.domain;											// Default: _templateContainer or "" (empty)
			var snippet = params.snippet;

			switch (snippet) {

				//	case '(nome snippet)':
				//	break;
				//
				default:

			}
		}
	}

});