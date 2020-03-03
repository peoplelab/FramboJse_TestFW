//----------------------------------------------------------------------------------------
// File: login.model.js
//
// Desc: Model for loginpage
// Path: /public/modules/login/model
//----------------------------------------------------------------------------------------

define([
	'base_model'
], function (mBase) {


	// Web services endpoint constant definition
	var _ENDPOINT_GET = '/api/config/General_Get';
	var _ENDPOINT_LOGIN = '/api/login';
	//'https://192.168.11.40/login';
	//'https://192.168.11.32:45457/login';
	//'https://localhost:8082/public/ws/reports.asmx/Economics';
	//'/public/ws/General.asmx/Set';
	//'https://localhost:44345/login';


	return {
		//	GetSettings   : wsGetSettings,
		SaveSettings: wsSaveSettings,
		wsGetSettings: wsGetSettings,
	}


	//FUNCTION: wsGetSettings
	//	Chiamata web service per: Get Setting generali
	function wsGetSettings(params) {
		if (params.data.ResponseCode == 0) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(params.data.RawData, "text/xml");
			var _auth = xmlDoc.getElementsByTagName("AccessToken")[0].childNodes[0].nodeValue;
		}
		console.log("params " + params);
		params.dataSource = '';
		params.token = '41111111252222224015000011333353';
		params.endpoint = _ENDPOINT_GET;
		params.auth = _auth;
		params.fields = [];
		params.body = mBase.BuildsRequestBody(params);

		return mBase.ExecuteRequest(params);
	}

	// FUNCTION: wsSaveSettings
	//	Chiamata web service per: Save/create Setting generali
	//function wsSaveSettings(params) {
	//
	//	params.dataSource = '';
	//	params.endpoint   = _ENDPOINT_SET;
	//	params.fields     = ['Nome', 'Logo'];											// Campo specificato manualmente
	//	params.body       = mBase.BuildsRequestBody(params);
	//
	//	return mBase.ExecuteRequest(params);
	//}
	function wsSaveSettings(params) {

		params.dataSource = 'data';
		params.endpoint = _ENDPOINT_LOGIN;
		params.fields = ['Username', 'Password'];											// Campo specificato manualmente
		params.body = mBase.BuildsRequestBody(params);

		return mBase.ExecuteRequest(params);
	}


	// FUNCTION: wsUpdateSettings
	//	Chiamata web service per: Update Setting generali
	//function wsUpdateSettings(params) {

	//	params.dataSource = 'data';
	//	params.endpoint   = _ENDPOINT_UPDATE;
	//	params.fields     = Object.keys(params.data);							// Campi letti da template tramite "pBase.BuildsJson4Save(...)"
	//	params.body       = mBase.BuildsRequestBody(params);

	//	return mBase.ExecuteRequest(params);
	//}



});