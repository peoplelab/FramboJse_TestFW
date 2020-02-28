//----------------------------------------------------------------------------------------
// File: login.controller.js
//
// Desc: Controller della pagina "login"
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
		// Esempio:
		//
		//return model.Common_Get({
		//
		//	page     : _pageID,
		//	token    : __WACookie.Token,
		//	onFailure: pBase.OnGenericFailure,
		//	onSuccess: function(params) {
		//		presenter.RenderPage({ 
		//			RawData: params.RawData,
		//			OnSave : saveData,
		//			Compile: compile,
		//			Reset  : reset,
		//		});
		//	},
		//});

		presenter.RenderPage({ pippo: pippoController });
	}

	function pippoController(v1) {
		//alert("username="+v1.v1+"\n password="+v1.v2);

		return model.SaveSettings({											// Builds XML data and sends them to the Saas...
			data: v1,
			onSuccess: onSaveElement,
			onFailure: onSaveElement
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
	//	function saveData() {
	//	
	//		var rawdata = presenter.GetData4Saving();
	//	
	//		return model.Common_Set({											// Builds XML data and sends them to the Saas...
	//			data     : rawdata,
	//			page     : _pageID,
	//			token    : __WACookie.Token,
	//			onSuccess: onSaveElement,
	//			onFailure: onSaveElement
	//		});
	//	
	//	}

	function onSaveElement(result) {
		if (result.ResponseCode == 0)
			callTokenAuthService(result);
		else
			alert("Error:\n\r" + result.ResponseMessage);

	}

	function callTokenAuthService(result) {
		console.log("callTokenAuthService results= " + result)

		return model.wsGetSettings({											// Builds XML data and sends them to the Saas...
			data: result,
			onSuccess: onSuccessCallToken,
			onFailure: onSuccessCallToken
		});
	}
	function onSuccessCallToken(result) {

		__WACookie = { 'result': result.RawData };
		Cookies.set('FramboJSe_TestWAPars', JSON.stringify(__WACookie), { expires: 1 });
		location.href = "/home/new_home";
	}
});
