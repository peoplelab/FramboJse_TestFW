// base.controller.js : base for controller modules

define([
    'base_presenter'
],
    function (presenter) {


        return {

            OnGenericFailure: onGenericFailure,          // handler for generic communication failure with Saas
            EscapeXml       : escapeXml
        };



        function onGenericFailure(result) {
            var response_code = result.ResponseCode;            // response code -> -1 on failure
            var response_message = result.ResponseMessage;      // response message -> '' on failure
            var failure_code = result.FailureCode;              // failure code -> server status code
            var rawdata = result.RawData;                       // raw data -> jqXHR object

            presenter.OnGenericFailure(result);
        }

        function escapeXml(str) {
            var parsed = $.parseXML(str);
            escapeDocument(parsed);
            return parsed.childNodes[0].outerHTML;
        }

        function escapeDocument(node) {
            if (node.children && node.children.length === 0) {
                node.textContent = escapeString(node.textContent);
            }
            $.each(node.childNodes, function (key, child) {
                return escapeDocument(child);
            });
        }

        function escapeString(str) {
            var tag = document.getElementById('tempDiv');
            tag.textContent = decodeURIComponent(str);
            var cleanedStr = tag.innerHTML;
            tag.textContent = "";
            return cleanedStr;
        }

    });

