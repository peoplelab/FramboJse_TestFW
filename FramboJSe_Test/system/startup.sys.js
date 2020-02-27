//----------------------------------------------------------------------------------------
// File: namespaces.sys.js
//
// Desc: Definizione dei namespaces e startup del framework
// Path: /System/
//----------------------------------------------------------------------------------------

	// ** Definizioni di sistema **
	var __SYS_config;																					// System configuration: Core (framework) definitions

	var namespacesDefs = {																				// Definizione dei namespaces riconosciuti
		names: {
			system: {																					// Spacename: system [mandatory]
				root: '/System/',
				ref : 'sys',
			},
			public: {																					// Spacename: public
				root: '/public/',
				ref : 'pub',
			},
			reserved: {																					// Spacename: reserved
				root: '/reserved/', 
				ref : 'rsv',
			},
		},
		loaded: {																						// Flag degli stati di caricamento dei file di definizione dei namespace
			system  : -1,																				// Stato -1 : non processato
			public  : -1,
			reserved: -1,
		}
	};



	// ** Caricamento dei namespaces **
	for (var i = 0; i < __SYS_namespaces.length; i++){

		var nsName = __SYS_namespaces[i];
		var nsDefs = namespacesDefs.names[nsName];

		namespacesDefs.loaded[nsName] = 0;																// Stato 0 : in caricamento
		$.getScript(nsDefs.root + 'config2.' + nsDefs.ref + '.js', function(result) {

			eval(result);																				// Risoluzione script (dichiarazioni variabili di sistema e mapping)
			namespacesDefs.loaded[filename] = 1;														// Stato 1 : caricato e risolto

			if (filename != 'system') {
				var settings = {
					map : mapping.map,
					name: filename
				}
				setEnvironment(settings);
			}
		});
		
	}

	// FUNCTION: setEnvironment
	//	Aggiunge le definizioni del namespace caricato e, al termine, avvia l'inizializzazione di SystemJS e del routing
	// PARAMS:
	//	params.map : mappautura risorse da riportare in SystemJS
	// OTHER DATA:
	//	_Sector : (Inizializzato nella pagina aspx chiamante) nome del settore/modulo di appartenenza per la risoluzione del routing
	
	function setEnvironment(params){


		$.extend(__SYS_config.map, params.map);															// Aggiunge i mapping del namespace caricato

		if (Object.values(namespacesDefs.loaded).indexOf(0) < 0) {										// Se sono tutti caricati, allora esegue l'init

			// ** Startup del framework **
			SystemJS.config(__SYS_config);																// Inizializzazione di SystemJS
			__SYS_config = {																			// Reset di __SYS_config (riutilizzata i parametri di configurazione della pagina)
				current: {
					module: '',
					page  : '',
					code  : ''
				}
			}

			if (__SYS_consoleLog) {																		// Log di avvio framework
				if (__SYS_consoleClear) {console.clear()}
				console.log('%cNamespaces Loaded - FramboJSe_Test.fw initialized...', 'background: #e0e0e0; color: #c00; font-weight: bold; padding: 3px 10px; display: block;');
			}

			SystemJS.import('router').then(function(router) {											// Avvia l'esecuzione del router (punto d'ingresso del framework)
				router.init({
					Sector: _Sector
				});
			});

		}

	}

