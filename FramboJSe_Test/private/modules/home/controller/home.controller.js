//----------------------------------------------------------------------------------------
// File: home.controller.js
//
// Desc: Controller della pagina "home"
// Path: /Private/modules/login/controller
//----------------------------------------------------------------------------------------

define([
	'base_controller',
	'base_presenter',
	'currentModel',
	'currentPresenter'
], function (cBase, pBase, model, presenter) {

	var _onInit = true;																				// Monitoring first time executing code...
	var _pageID = '';																				// Page ID (for presenter)
	var _templateID = '';																				// ID of the page template
	var _initPars = '';																				// Set dei parametri iniziali della Setup (usati per il re-setup dopo il save)

	return {
		init: setup
	}

	// FUNCTION: setup
	//  Init function for controller. Setup UI and default values.
	// PARAMS:
	//  params.pageID : page ID
	// RETURN:
	//  none
	function setup(params) {

		_initPars = params;																			// Set di parametri (pageParams) definito in "routerList"
		_pageID = (params == undefined) ? _pageID : params.pageID;
		_templateID = (params == undefined) ? _templateID : params.templateID;

		// Step 1: Inizializzazione della UI (setup)
		presenter.Init({
			pageID: _pageID,
			templateID: _templateID
		});

		// Step 2: Interrogazione SAAS per il recupero dati
		// [* NOTA: 
		//		Il popolamento della pagina dipende generalmente dall'esecuzione di un servizio (lettura dati da db o altro)
		//		La funzione di render (RenderPage) viene quindi invocata dalla funzione "onSuccess" della chiamata al servizio, passando i dati ottenuti
		// *]

		// Step 2: Interrogazione SAAS per il recupero dati
		return model.wsGetSettings({

			data: __WACookie.result,
			onFailure: function (response) {
				console.log();
				location.href = "/public/login/login.html";
			},
			onSuccess: function (response) {
				if (response.ResponseCode == 0) {
					presenter.RenderPage({
						wsGetSettings: response.RawData
					});
				} else {
					location.href = "/public/login/login.html";
				}
			}
		});
	}

	// *** Sezione HANDLERS: 
	// ***	definizione delle funzioni di controllo (specifiche della sezione) 
	// ***
	//
	// Esempio:
	//
	//	// FUNCTION: saveData
	//	//  Saves elements (calling Saas and handle response)
	//	// PARAMS:
	//	//  none
	//	// RETURN:
	//	//  none
});
