//----------------------------------------------------------------------------------------
// File: home.model.js
//
// Desc: Model for homepage
// Path: /Private/modules/home/model
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

		wsGetSettings: wsGetSettings,
	}


	//FUNCTION: wsGetSettings
	//	Chiamata web service per: Get Setting generali
	function wsGetSettings(params) {
		//if (params.data.ResponseCode == 0) {
		//	var parser = new DOMParser();
		//	var xmlDoc = parser.parseFromString(params.data.RawData, "text/xml");
		//	var _auth = xmlDoc.getElementsByTagName("AccessToken")[0].childNodes[0].nodeValue;
		//}
		console.log("params " + params);
		params.dataSource = '';
		params.token = '41111111252222224015000011333353';
		params.endpoint = _ENDPOINT_GET;
		params.auth = params.data;
		params.fields = [];
		params.body = mBase.BuildsRequestBody(params);

		return mBase.ExecuteRequest(params);
	}


});