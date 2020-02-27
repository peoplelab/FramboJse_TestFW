﻿//----------------------------------------------------------------------------------------
// File  : drawerTitle.js
//
// Desc  : Costruisce una label prelevando il testo dal nodo XML richiesto
// Path  : /Private/FramboJSe_Test.ext/snippets
// target:  <dd_elenchiQA />
// output:  label
//----------------------------------------------------------------------------------------
define ([
    'dd_base',
//    '/private/modules/common/model/resources.model.js',
//], function (base, resources) {
], function (base) {

    var _ITEMNAME = 'drawerTitle';
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
        
        tagPars.itemName = _ITEMNAME;

		var xml    = __Preloads.economics;
    	var myHtml = '';
		var val    = (tagPars.title  != null)? tagPars.title  : '0';
		var attr   = (tagPars.attr   != null)? tagPars.attr   : 'codiceUI';
		var expand = (tagPars.expand != null)? tagPars.expand : 'false';
		var icon   = '';

		// Step 1: Costruzione HTML titolo e 
		myHtml += '<a class="' + _ITEMNAME + pbAttrs[0] + '" href="#drw" ';
		myHtml += 'data-toggle="collapse" data-target="#' + tagPars.ref + '" aria-expanded="' + expand + '" ';
		myHtml += 'ref="' + tagPars.ref + '" ';
		myHtml += pbAttrs[1] + '>';
		myHtml += '<i class="fa fa-times-circle ico-error"></i>';
		myHtml += '<i class="fa fa-exclamation-circle ico-warning"></i>';
		switch (tagPars.mode.toLowerCase()) {
			case 'edit':
				icon = 'fa fa-pencil-alt';
				break;
			case 'calc':
				icon = 'fa fa-cogs';
				break;
			case 'prosp':
				icon = 'fa fa-list-alt';
				break;
		}
		myHtml += '<i class="' + icon + ' margin-h-10"></i>';

		// Step 2: Risoluzione etichetta letta da XML
		var xmlNode = base.GetXmlNode({
			xmlRaw : xml.RawData,
			element: '[' + attr + '=' + val + ']',
		});

		if (xmlNode.length > 0) {
			var txt = xmlNode[0].textContent;
		} else {
			var txt = val;
		}
		myHtml += '<span class="text">';
		myHtml += (txt != '')? decodeURIComponent(txt) : '[xml]';
		myHtml += '</span>';

		// Step 3: Inserimento icone stato cassetto e chiusura tag
		myHtml += '<span class="ico">';
		myHtml += '<i class="fa fa-chevron-right ico-close"></i>';
		myHtml += '<i class="fa fa-chevron-down ico-open"></i>';
		myHtml += '</span>';
		myHtml += '</a>';

		//return myHtml;
		return new Promise((resolve, reject) => { resolve(myHtml) });

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
