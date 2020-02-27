// --------------------------------------------------------
// File: MAIN.JS 
// Main js function for initial Default.Master page
// 
// Scope: framework
// --------------------------------------------------------

	// ** Builds the hashmap of the querystring parameters **
	var urlParams = {} ;  												// Initialize hashmap
	(window.onpopstate = function () {
		var match,
			search = /([^&=]+)=?([^&]*)/g,								// Regexp: searchs text between "=" and next "&" occourrence
			decode = function(s) { 
				return decodeURIComponent(s.replace(/\+/g, " "));		// Regexp: replaces addition symbol with a space
			},
			query = window.location.search.substring(1);				// Substring(1): excludes the "?" char

		urlParams = {};
		while (match = search.exec(query)) { urlParams[decode(match[1])] = decode(match[2]) };
	})();
