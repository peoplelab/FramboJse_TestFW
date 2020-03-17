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
		_wsGetSettings = params.wsGetSettings;
		_wsGetSettingsYeap = params.wsGetSettingsYeap;
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
	function objectIsEmpty(object) {
		if (Object.keys(object.result).length === 0 && object.result.constructor === Object) {
			console.log(" " + object + " is empty!");
			return false;
		} else {
			console.log(" " + object + " is not empty !");
			return true;
		}
	}

	function render_template_values(params) {

		$("#btn_Chiamata-Yeap").click(function (e) {
			e.preventDefault();
			alert("you click me");
		});


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