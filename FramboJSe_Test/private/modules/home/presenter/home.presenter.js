//----------------------------------------------------------------------------------------
// File: home.presenter.js
//
// Desc: Presenter della pagina "Home - Index"
// Path: /Private/modules/home/presenter
//----------------------------------------------------------------------------------------

define([
	'base_presenter',
	'templatesHandler',
	'snippets',
	'modals',
	//	'currentDashboard',
], function (pBase, th, snippets, modals, dashboard) {

	// ** Module management **
	var _module = {};																				// Mapping of the current module
	var _resources = {};																					// Mapping of the additional resources (.css and/or .js files)
	var _wsGetSettings;
	var _wsGetSettingsYeap;
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
	function init(params) {

		_module.id = SystemJS.map.currentPresenter.replace(location.origin, '');						// Determina il 
		_pageID = params.pageID;
		_templateID = params.templateID;
	}

	function renderPage(params) {

		_module.fn = pBase.fnName(arguments);															// Traces the current function
		_xml = $.parseXML(params.RawData);														// Transforms raw XML data into an XML document
		_wsGetSettings = params.wsGetSettings;
		_wsGetSettingsYeap = params.wsGetSettingsYeap;
		th.Render({
			code: _templateID[0],
			XML: _xml,
			onSuccess: function (result) {
				render_template_page({																	// Carica il template nel DOM
					templateHtml: result,
					wsGetSettings: _wsGetSettings,
					wsGetSettingsYeap: _wsGetSettingsYeap,
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
	}

	function render_template_page(params) {

		$(_pageContainer).html(params.templateHtml);													// Fills the HTML's case with the precompiled HTML template
		jQuery.noConflict();																			// Prevent jquery and bootstrap scripts conflicting because declared twice
		$("#div_ContentAnswer").text(params.wsGetSettings.RawData);
		$("#Div_TimeAnswer").append(params.wsGetSettings.ResponseTime);
		$("#div_ContentAnswerYeap").text(params.wsGetSettingsYeap.RawData);
		$("#Div_TimeAnswerYeap").append(params.wsGetSettingsYeap.ResponseTime);



	}

	function render_template_values(params) {

	}



	function render_snippet(params) {

		var saveCallBack = params.onSaveCallBack														// Pulsante "Salva"
		var myXml = params.xmlData;

		// Invokes the snippets resolution
		snippets.Render({
			domain: params.domain,
			callBack: snippetsCallBack,
			others: myXml,
		});



		function snippetsCallBack(params) {

			var domain = params.domain;											// Default: _templateContainer or "" (empty)
			var snippet = params.snippet;

			switch (snippet) {

				default:

			}
		}
	}

});