//----------------------------------------------------------------------------------------
// File: routerList.rsv.js
//
// Desc: List of routing definitions for the current web application- Private area
// Path: /reserved/FramboJSe_Test.ext/router
//----------------------------------------------------------------------------------------

define (function(){

	var _routeList = [];														// Routes list

	return {
		List: buildsRouteList
	}


	// FUNCTION: buildsRouteList
	//  Builds the list of defined routes
	// PARAMS:
	//  none
	// RETURN:
	//  routeList : list of the routes
	function buildsRouteList() {

		var newModule;															// Used for new module settings
		var pageDefinitions;													// Used for page definitions


		// ---
		// Step 1: Declaration of modules with their main data
		// ---
		// Note:
		// Each new module will be first defined and added to the route list,
		// then it will be possible adding the specific routes
		// ---

		// 0: Module "Home"
		newModule = {
			module: 'home',														// Module name (the same as in the virual URL)
			sectors: [{
				sectorName: 'homePage',											// Module logical subset (external param from the "master" .aspx)
				modulePath: __homepage.modules,									// Path of the module files
				dashboard: 'configuration.dboard.presenter.js',					// Common dashbord of the module
				sectorPages: []													// Pages' definitions (initially empty array)

			}]
		};
		_routeList.push(newModule);												// Appends the new module's main data


		// 2: Module "Settings"
		newModule = {
			module: 'settings',													// Module name (the same as in the virual URL)
			sectors: [{
				sectorName: 'settings',											// Module logical subset (external param from the "master" .aspx)
				modulePath: __settings.modules,									// Path of the module files
				dashboard: 'configuration.dboard.presenter.js',					// Common dashbord of the module
				sectorPages: []													// Pages' definitions (initially empty array)

			}]
		};
		_routeList.push(newModule);												// Appends the new module's main data


		// 1: Module "Qualitativa"
		newModule = {
			module : 'qa',														// Module name (the same as in the virual URL)
			sectors: [{
				sectorName : 'qualitativa',										// Module logical subset (external param from the "master" .aspx)
				modulePath : __qualitativa.modules,								// Path of the module files
				dashboard  : 'configuration.dboard.presenter.js',				// Common dashbord of the module
				sectorPages: []													// Pages' definitions (initially empty array)

			}]
		};
		_routeList.push(newModule);												// Appends the new module's main data


		// 2: Module "Economics"
		newModule = {
			module : 'economics',												// Module name (the same as in the virual URL)
			sectors: [{
				sectorName : 'economics',										// Module logical subset (external param from the "master" .aspx)
				modulePath : __economics.modules,								// Path of the module files
				dashboard  : 'configuration.dboard.presenter.js',				// Common dashbord of the module
				sectorPages: []													// Pages' definitions (initially empty array)

			}]
		};
		_routeList.push(newModule);												// Appends the new module's main data
		


		// ---
		// Step 2: routes setup (adds pages definitions to the modules)
		// ---
		// Note: 
		// Useful for logical grouping of pages: it's possible add several pageDefinitions 
		// to the same module/sector, by defining a logical group or functionality 
		// (e.g. Configuration > timesheet)
		// ---

		// 0: Home page
		pageDefinitions = {
			title: 'homepage',													// Not used (reference only)
			owner: {module: 'home', sector: 'homePage'},
			pages: [
				{
					alias: ['welcome'],
					data: {
						pageID    : 'welcome',
						controller: 'home.controller.js',
						model     : 'home.model.js',
						presenter : 'home.presenter.js',
						templateID: [503]
					}
				}
			]
		}
		addRoutes(pageDefinitions);

		// 1.1 Settings
		pageDefinitions = {
			title: 'Settings',													// Not used (reference only)
			owner: { module: 'settings', sector: 'settings' },
			pages: [
				{
					alias: ['settings'],
					data: {
						pageID    : 'settings',
						controller: 'settings.controller.js',
						model     : 'settings.model.js',
						presenter : 'settings.presenter.js',
						templateID: [504]
					}
				}
			]
		}
		addRoutes(pageDefinitions);

		// 1: Analisi qualitativa
		pageDefinitions = {
			title: 'Qualitativa',												// Not used (reference only)
			owner: {module: 'qa', sector: 'qualitativa'},
			pages: [
				{
					alias: ['qualitativa'],										// timesheet malattie edit
					data: {
						pageID    : 'qualitativa',
						controller: 'qualitativa.controller.js',
						model     : 'qualitativa.model.js',
						presenter : 'qualitativa.presenter.js',
						templateID: [601]
					}
				}
			]
		}
		addRoutes(pageDefinitions);


		// 2: Economic
		pageDefinitions = {
			title: 'Economics',													// Not used (reference only)
			owner: {module: 'economics', sector: 'economics'},
			pages: [
				{
					alias: ['impostazioni'],									// Ricavi
					data: {
						pageID    : 'impostazioni',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'impostazioni.presenter.js',				// §§ normalizzare a economics
						templateID: [751]
					}
				}, {
					alias: ['ricavi'],											// Ricavi
					data: {
						pageID    : 'ricavi',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [752]
					}
				}, {
					alias: ['costi-esterni'],									// Costi interni
					data: {
						pageID    : 'costiEsterni',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [753]
					}
				}, {
					alias: ['costi-variabili'],									// Costi interni
					data: {
						pageID    : 'costiVariabili',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [754]
					}
				}, {
					alias: ['costi-interni'],									// Costi interni
					data: {
						pageID    : 'costiInterni',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [755]
					}
				}, {
					alias: ['risorse-umane'],									// Risorse umane
					data: {
						pageID    : 'risorseUmane',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [756]
					}
				}, {
					alias: ['fonti'],											// Capex
					data: {
						pageID    : 'fonti',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [757]
					}
				}, {
					alias: ['investimenti'],									// Capex
					data: {
						pageID    : 'investimenti',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [758]
					}
				}, {
					alias: ['finanziamenti'],									// Capex
					data: {
						pageID    : 'finanziamenti',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [759]
					}
			//	}, {
			//		alias: ['altro'],											// Capex
			//		data: {
			//			pageID    : 'altro',
			//			controller: 'economics.controller.js',
			//			model     : 'economics.model.js',
			//			presenter : 'economics.presenter.js',
			//			templateID: [760]
			//		}
				}, {
					alias: ['iva'],												// Capex
					data: {
						pageID    : 'iva',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [761]
					}

				}, {
					alias: ['conto-economico'],									// Conto economico
					data: {
						pageID    : 'contoEconomico',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [705]
					}
				}, {
					alias: ['rendiconto-finanziario'],							// Rendiconto finanziario
					data: {
						pageID    : 'rendiconto',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [706]
					}
				}, {
					alias: ['stato-patrimoniale'],								// Stato patrimoniale
					data: {
						pageID    : 'statoPatrimoniale',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [707]
					}
				}, {
					alias: ['fonti-finanziarie'],								// Stato patrimoniale
					data: {
						pageID    : 'fontiFinanziarie',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'economics.presenter.js',
						templateID: [708]
					}
			//	}, {
			//		alias: ['working-capital'],									// Stato patrimoniale
			//		data: {
			//			pageID    : 'workingCapital',
			//			controller: 'economics.controller.js',
			//			model     : 'economics.model.js',
			//			presenter : 'economics.presenter.js',
			//			templateID: [709]
			//		}
				}, {
					alias: ['messaggi'],
					data: {
						pageID    : 'messaggi',
						controller: 'economics.controller.js',
						model     : 'economics.model.js',
						presenter : 'messaggi.presenter.js',
						templateID: [780]
					}
				}, {
					alias: ['analisi-leanus'],
					data: {
						pageID    : 'repLeanus',
						controller: 'leanus.controller.js',
						model     : 'economics.model.js',
						presenter : 'leanus.presenter.js',
						templateID: [781]
					}
				}
			]
		}
		addRoutes(pageDefinitions);



		// ** Returns the updated list **
		return _routeList;

	}


	// FUNCTION: addRoutes
	//	Adds the new page definitions (routes) to the router list, 
	// PARAMS:
	//	params.owner : defines the module and the sector to which the pageDefinitions are to be added
	//	params.pages : pages definitions
	// OUTPUT:
	//	none
	function addRoutes(params) {

		var module = params.owner.module;										// Module name
		var sector = params.owner.sector;										// Sector name
		var pages  = params.pages;												// Pages definitions

		var tmpModule;
		var tmpSector;

		// Searches for the corresponding module/sector
		for (var i = 0; i < _routeList.length; i++) {							// Level 1: scans the modules
			tmpModule = _routeList[i];											// Temporary var: current module
			if (tmpModule.module == module) {									// Compare module name:

				// Module found: now scans for sectors
				tmpSector = tmpModule.sectors;									// Temporary var: current sector
				for (var j = 0; j < tmpSector.length; j++) {					// Level 2: scans the sector
					if (tmpSector[j].sectorName == sector) {

						// Module/sector found: adds new pages definitions
						_routeList[i].sectors[j].sectorPages = _routeList[i].sectors[j].sectorPages.concat(pages);

					}
				}

			}
		}

	}


});
