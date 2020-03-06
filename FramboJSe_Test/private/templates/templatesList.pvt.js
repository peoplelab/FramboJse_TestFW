//----------------------------------------------------------------------------------------
// File: templatesList.pvt.js
//
// Desc: List of PRIVATE templates
// Path: /Private/templates
//----------------------------------------------------------------------------------------

define (function () {

	return {

		List: buildList
	}


	// FUNCTION: buildList
	//  Builds the list of defined templates' path
	// PARAMS: 
	//  none
	// RETURN:
	//  templatesList : list of templates
	function buildList() {

		var templatesPath = _pvtPaths.templates;                                // Main path of the templates is defined in "config.pvt"
		var templatesList = {  

			// Section "Demo page" (group id: 100)
			101: __demopage.templates + 'index.html',
			// Section "Demo react page" (group id: 100)
			105: __homepage.templates + 'hybridhome.html',

			// Section "Home page" (group id: 100)
			201: __homepage.templates + 'home.html',
			// Section "Login page" (group id: 100)
			205: __homepage.templates + 'new_home.html',
			// Section "Login page" (group id: 100)
			301: __loginpage.templates + 'login.html',
			// Section "Login page" (group id: 100)
			305: __loginpage.templates + 'new_home.html'

		};

		return templatesList;
	}

});