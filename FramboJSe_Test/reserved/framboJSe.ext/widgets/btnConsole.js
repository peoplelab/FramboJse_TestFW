//----------------------------------------------------------------------------------------
// File  : btnConsole.js
//
// Desc  : Costruzione della console dei pulsante gestione pagg. economics
// Path  : /Private/FramboJSe_Test.ext/widgets
// target:  <widget_btnConsole />
// output:  label
//----------------------------------------------------------------------------------------
define ([
	'dd_base',
	'/private/modules/economics/model/economics.model.js',
], function (base, model) {

	var _ITEMNAME = 'btnConsole';
	var _ITEMTAG  = 'widget_';

	return {
		itemName : _ITEMNAME,													// Item's name
		itemTag  : _ITEMTAG,													// Item's tag prefix
		BuildHtml: buildHtml,													// Item's HTML
		Extend   : extend														// Callback function management
	}


	// FUNCTION: buildHtml
	//  builds the snippet's HTML code 
	// PARAMS:
	//  tagPars : tag's custom parameters (in JSON format)
	//  pbAttrs : the "public" attributes to be applied to the most external element of the snippet
	//              pbAttrs[0] : extension of "class" attribute,
	//              pbAttrs[1] : all others attributes 
	// RETURN:
	//  myHtml  : HTML formatted code as simple text (syncronous mode) or promise (asyncronous mode)
	function buildHtml(tagPars, pbAttrs) {

	return	model.Common_Get({																							// Invia richiesta a SAAS
			page     : 'menu',
			token    : __WACookie.Token,
			onSuccess: function () {}
		}).then(function(params){


			var data = $( $.parseXML(params.d) );																		// Parse dell'XML di ritorno
			var nome = decodeURIComponent(data.find('Nome').text());													// Nome del Business Plan
			var anni = eval(data.find('NumAnni').text()) / 1000;														// Riscala il nr. di anni
			var code = data.find('CodiceTipologia').text();																// Codice tipologia azienda
			var tipo = decodeURIComponent(data.find('Tipologia').text());												// Descrizione tipologia azienda
			var init = eval(data.find('AnnoInizio').text()) / 1000;														// Riscala il nr. di anni
			var BP   = data.find('StatusBP').text();																	// Status Business Plan: 0 = vuoto, 1 = salvato, 2 = compilato, 3 = inviato, 4 = elaborato (ok Leanus), 99 = errore
			var QA   = data.find('StatusQA').text();																	// Status Analisi Qualitativa: 0 = vuoto, 1 = salvato, 2 = calcolato.

			if (BP == 99) BP = 5;

			tagPars.itemName = _ITEMNAME;

			var pageID = __SYS_config.current.pageID;

			var myHtml = '';
			var Class  = 'padding-h-30 btn btn-action-light';
			var bpStat = ['Vuoto', 'Salvato', 'Compilato', 'Inviato', 'Elaborato', 'Compilato con errori'];
			var piano  = ['impostazioni', 'iva', 'ricavi','costiEsterni', 'costiVariabili', 'costiInterni', 'risorseUmane', 'fonti', 'investimenti', 'finanziamenti'];
			var prosps = ['contoEconomico', 'rendiconto', 'statoPatrimoniale', 'fontiFinanziarie'];
			var others = ['settings', 'qualitativa', 'leanus']

			var btnSave    = false;
			var btnCompile = false;
			var btnMessage = false;

			switch (true) {
				case piano.includes(pageID):
					btnSave    = true;
					btnCompile = true;
					btnMessage = true;
					break;

				case prosps.includes(pageID):
					btnMessage = true;
					break;

				case others.includes(pageID):
					btnSave    = true;
					break;
			}

		
			// Costruzione HTML
			myHtml += '<div class="margin-h-15 ' + _ITEMNAME + pbAttrs[0] + '" pageid="' + pageID + '">';
			myHtml +=   '<div id="statusInfo" class="floatLeft">';
			myHtml +=	  '<p class="margin-a-0">Status del Business Plan: <span class="status">' + bpStat[BP] + '</status></p>';			// Status del BP
			myHtml +=   '</div>';

			myHtml +=   '<div class="floatRight">';
			if (btnSave) {
				myHtml += '<a class="' + Class + '" href="#s" id="btn-save"   ><i class="far fa-save margin-r-5"></i> Salva e continua</a>';
			}
			if (btnCompile) {
				myHtml += '<a class="' + Class + ((BP < 1)? ' disabled' : '') + '" ';
				myHtml += 'href="#c" id="btn-compile"><i class="fa fa-cubes margin-r-5"></i>Salva e Compila</a>';
			}
			if (btnMessage) {
				myHtml += '<a class="' + Class + '" href="/economics/messaggi" id="btn-ricevi" ';
				//myHtml += '<i class="fa fa-download margin-r-5"></i>';
				if (__WACookie.showErr) {
					myHtml += ' title="Notifiche abilitate"><i class="fa fa-eye margin-r-5"></i>';
				} else {
					myHtml += ' title="Notifiche disabilitate"><i class="fa fa-eye-slash margin-r-5"></i>';
				}
				myHtml += 'Messaggi'
				//myHtml += '<span class="ico-notifiche ' + ((__WACookie.showErr)? 'on' : 'off') + '"></span></a>';
				myHtml += '</a>';
			}		
			myHtml +=   '</div>';
			myHtml +=	'<div class="clearRight"></div>';
			myHtml += '</div>';

			myHtml += '';

			return myHtml;

		});
	}


	// FUNCTION: extend
	//  extends functionality of snippet/widget after object creation in the DOM.
	// PARAMS:
	//  domain : html object container.
	// RETURN:
	//  Object's callback functions
	function extend(params) {
	
		// none
	
	}
})
