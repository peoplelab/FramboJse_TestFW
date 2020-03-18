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
	var _ENDPOINT_GETYeap = '/apiyeap/public/ws/config.asmx/General_Get';
//'https://test-yeap.people-manager.it:8082/public/ws/config.asmx/General_Get'



	return {

		wsGetSettings: wsGetSettings,
		wsGetSettingsYeap: wsGetSettingsYeap,
		
	}


	function wsGetSettings(params) {

		console.log("params " + params);
		params.dataSource = '';
		params.token = '41111111252222224015000011333353';
		params.endpoint = _ENDPOINT_GETYeap;
		params.auth = params.data;
		params.fields = [];
		params.body = mBase.BuildsRequestBody(params);

		return mBase.ExecuteRequest(params);
	}
	function wsGetSettingsYeap(params) {

		console.log("params " + params);
		params.dataSource = '';
		params.token = '41111111252222224015000011333353';
		params.endpoint = _ENDPOINT_GETYeap;
		params.auth = '';
		params.fields = [];
		params.body = mBase.BuildsRequestBody(params);

		return mBase.ExecuteRequest(params);
	}

});