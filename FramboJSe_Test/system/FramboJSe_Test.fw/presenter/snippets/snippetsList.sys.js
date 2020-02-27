//----------------------------------------------------------------------------------------
// File: snippetsList.sys.js
//
// Desc: List of system snippets (default) - System
// Path: /system/FramboJSe_Test.fw/presenter/snippets
//----------------------------------------------------------------------------------------

define (function () {

	return {

		List: buildList
	}


	// FUNCTION: buildList
	//  Builds the list of defined snippets
	// PARAMS: 
	//  none
	// RETURN:
	//  snippetsList : list of snippets  
	function buildList() {

		var snippetsList = [  
            
			// Type: buttons    
			'button_add',									// Pulsante aggiungi
			'button_go',									// Pulsante esegui
			'button_delete',								// Pulsante di cancellazione voce
			'button_detail',								// Pulsante di visualizzazione dettaglio
			'button_edit',									// Pulsante per richiamare la pagina di modifica
			'button_next',									// Pulsante "Prossimo"
			'button_prev',									// Pulsante "Precedente"

			// Type: labels
			'label',										// Etichette campi di input

			// Type: glyphs
			//'glyph_info',									// Glyphicon InfoPoint generico
			'glyph_mandatory',								// Glyphicon campo obbligatorio
			'glyph_pageStatus',								// Glyphicon pagina di edit

			// Type: input
			'input_hidden',									// Campo testo nascosto
			'input_integer',								// Campo numerico intero
			'input_password',								// Campo password
			'input_range',									// Campo numerico intero
			'input_text',									// Campo testo semplice
			'textarea',										// Campo textarea
						
			// Type: dropdown lists
			'dd_calendar_days',								// DropDown giorni
			'dd_calendar_months',							// DropDown mesi
			'dd_calendar_years',							// DropDown anni
			'dd_operators_equal',							// DropDown operatori uguaglianza (<, >, >=, <=, ==, <>)
//			'dd_generic_select',							// DropDown "open" con elementi passati come parametri
            'dd_custom',									// DropDown "libera" con set delle opzioni passato come parametro
            'dropdown',                                     // Dropdown by jacopo

			// Type: gropups:
			'group_dashboard',								// Dashboard dei controlli delle pagine di edit

			// Others
			''												// Dummy (last element)
		];

		return snippetsList;
	}
});
