//----------------------------------------------------------------------------------------
// File: namespaces.sys.js
//
// Desc: Definizione dei namespaces da caicare - Framework core settings
// Path: /System/
//----------------------------------------------------------------------------------------

/*============================================================================================================================================
console.log('__RSV_config',__RSV_config);

	// ** Definizione dei namespaces riconosciuti **
	var __SYS_namespacesDefs = {
		system: {																						// Spacename: system [mandatory]
			root: '/System/',
			ref : 'sys',
		},
		public: {																						// Spacename: public
			root: '/public/',
			ref : 'pub',
		},
		reserved: {																						// Spacename: reserved
			root: '/reserved/', 
			ref : 'rsv',
		}
	};
	var mapping;

	// ** Caricamento dei namespaces **
	for (var i = 0; i < __SYS_namespaces.length; i++){

		var defs = __SYS_namespacesDefs[__SYS_namespaces[i]];

		console.log('defs:',defs);
	}

/*---
	// ** Merge System & Application configurations **
	if ( __PUB_config != undefined && __PUB_config != '' ) {
		$.extend(__SYS_config.map, __PUB_config.map);
	}
	if (__PageScope == 'private') {
		if ( __PVT_config != undefined && __PVT_config != '' ) {
			$.extend(__SYS_config.map, __PVT_config.map);
		}
	}
	if (__PageScope == 'reserved') {
		if ( __RSV_config != undefined && __RSV_config != '' ) {
			$.extend(__SYS_config.map, __RSV_config.map);
		}
	}
---*/

/*
	$.getScript('/reserved/config2.rsv.js', function() {
		$.extend(__SYS_config.map, mapping.map);
		console.log('reserved');
	}).then(function(p){
		$.getScript('/public/config2.pub.js', function() {
			$.extend(__SYS_config.map, mapping.map);
			console.log('reserved');
		});
	});
	$.getScript('/System/config2.sys.js', function() {
		console.log('System');
	console.log('__SYS_config:',__SYS_config);
	});

============================================================================================================================================*/

	//var __SYS_config;
	var flags = {
		reserved: 0,
		public  : 0,
		system  : 0,
	}

/*-----------------------
	$.getScript('/reserved/config2.rsv.js', function() {
		var settings = {
			map : mapping.map,
			//map : mapping,
			name: 'reserved'
		}
		appendMap(settings);
	});
	$.getScript('/public/config2.pub.js', function() {
		var settings = {
			map : mapping.map,
			//map : mapping,
			name: 'public'
		}
		appendMap(settings);
	});
	$.getScript('/System/config2.sys.js', function() {
		var settings = {
			map : mapping.map,
			//map : mapping,
			name: 'system'
		}
		appendMap(settings);
	});
-----------------------*/

	$.getScript('/System/config2.sys.js', function() {
		//var settings = {
		//	map : mapping.map,
		//	//map : mapping,
		//	name: 'system'
		//}
		//appendMap(settings);
		flags['system'] = 1;
	}).then(function(){
		$.getScript('/reserved/config2.rsv.js', function() {
			var settings = {
				map : mapping.map,
				//map : mapping,
				name: 'reserved'
			}
			appendMap(settings);
		});
		$.getScript('/public/config2.pub.js', function() {
			var settings = {
				map : mapping.map,
				//map : mapping,
				name: 'public'
			}
			appendMap(settings);
		});
	});

function appendMap(params){

	console.log(params.name, '->',params.map)
	$.extend(__SYS_config.map, params.map);								// Aggiunge i mapping dei singoli namespaces
	//$.extend(__SYS_config, params.map);										// Aggiunge i mapping dei singoli namespaces
	flags[params.name] = 1;

	// ** Check caricamenti **
	if (Object.values(flags).indexOf(0) < 0) {							//	Verifica che non ci siano valori 0 all'interno di flags

		// ** Initialize Configuration and resets the global var**
		SystemJS.config(__SYS_config);
		__SYS_config = {
			current: {
				module: '',
				page  : '',
				code  : ''
			}
		}

		if (__SYS_consoleLog) {
			if (__SYS_consoleClear) {console.clear()}
			console.log('%cNamespaces Loaded - FramboJSe.fw initialized...', 'background: #e0e0e0; color: #c00; font-weight: bold; padding: 3px 10px; display: block;');
		}

		// TEST: prova a caricarla
		SystemJS.import('router').then(function(router) {
			router.init({
				Sector: _Sector
			});
		});

	}

}