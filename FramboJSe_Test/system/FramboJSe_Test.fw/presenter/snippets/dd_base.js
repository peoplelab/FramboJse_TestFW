// dd_base.js -> snippet "base" for drop down

define([
    "base_controller"
], function (
    cBase
) {

	return {
		RenderXml: renderFromXml,           // render html code from xml data (xml data are from Saas)
		RenderJson: renderFromJson          // render html code from json data (json data are local in the app)
	}

        
	// FUNCTION: renderFromXml
	//	Builds drop down html code from xml data.
	// PARAMS
	//	xml_raw : xml data to render
	//	tPars   : "data-pars" attributes
	//	pbAttrs : (additionally) public attributes for rendering
	// RETURN:
	//	select : string representing the drop down rendered.
	function renderFromXml(xml_raw, tPars, pbAttrs) {

        var xmlDoc = $.parseXML(cBase.EscapeXml(xml_raw));
		var $xml   = $(xmlDoc);
		var codice = 0;
		var descrizionexml;
		var row_code = '';
		var row_desc = '';
		var select   = '';
		var options  = '';

		// Creates the first item in the options list, optionally with a label/value
		if (tPars.emptyItem != 'none') {
			options  = '<option';
			options += ((tPars.emptyValue != null)? ' value="' + tPars.emptyValue + '" ' : '') + '>';
			options += (tPars.emptyLabel != null)? tPars.emptyLabel: '';
			options += '</option>';
		}

		$($xml).each(function () {

            codice = $(this).find("Response>Result>Codice").text().length > 0 ? parseInt($(this).find("Response>Result>Codice").text()) : parseInt($(this).find("response>result>codice").text());       //da sistemare
			descrizionexml = decodeURIComponent($(this).find("Response>Result>Descrizione").text());
			if (codice > 0) {
				return;
			}

            var $rows = $(this).find("Element").length > 0 ? $(this).find("Element") : $(this).find("element");             // da sistemare

			$($rows).each(function () {

                row_code = $(this).find("Codice").text().length > 0 ? $(this).find("Codice").text() : $(this).find("codice").text();
				selected = (row_code == tPars.value) ? ' selected="selected" ' : '';
                row_desc = $(this).find("Descrizione").text().length > 0 ? $(this).find("Descrizione").text() : $(this).find("descrizione").text();

				options += '<option value="' + row_code + '" ' + selected + '>';
				options += decodeURIComponent(row_desc);
				options += '</option>';

			});
		});

		// Builds finally "select" tag
		select  = '<select class="form-control ' + tPars.itemName + pbAttrs[0] + ' " ';
		select += (tPars.value != null)? ' ov="' + tPars.value + '" ' : '';
		if (tPars.key != null) {
			select += ' id="'  + tPars.key + '" ';								// id
			select += ' key="' + tPars.key + '" ';								// key
		}
		select += pbAttrs[1] + '>';
		select += options;														// Aggiunge le opzioni
		select += '</select>';

		return select;

	}
	// FUNCTION: renderFromJson
	//	Render drop down html code from json data.
	// PARAMS: 
	//	json_raw : json data to render
	//	tPars    : "data-pars" attributes
	//	pbAttrs  : (additionally) public attributes for rendering
	// RETURN;
	//	select : string representing the drop down rendered.
	function renderFromJson(json_raw, tPars, pbAttrs) {

		var row_code = '';
		var row_desc = '';
		//var options  = (tagPars.emptyItem == 'none')? '' : '<option></option>';
		var options;

		if (tPars.emptyItem != 'none') {
			options  = '<option';
			options += ((tPars.emptyValue != null)? ' value="' + tPars.emptyValue + '" ' : '') + '>';
			options += (tPars.emptyLabel != null)? tPars.emptyLabel: '';
			options += '</option>';
		}



		$(json_raw.items).each(function (index, item) {

			row_code = item.Value;
			row_desc = item.Text;
			selected = (row_code == tPars.value) ? ' selected="selected" ' : '';
                                
			options += '<option value="' + row_code + '" ' + selected + '>';
			options += decodeURIComponent(row_desc);
			options += '</option>';
		});

		// Builds finally "select" tag
		select  = '<select class="form-control ' + tPars.itemName + pbAttrs[0] + ' " ';
		select += (tPars.value != null)? ' ov="' + tPars.value + '" ' : '';
		if (tPars.key != null) {
			select += ' id="'  + tPars.key + '"';								// id
			select += ' key="' + tPars.key + '"';								// key
		}
		select += pbAttrs[1] + '>';
		select += options;														// Aggiunge le opzioni
		select += '</select>';

		return select;

	}

});
