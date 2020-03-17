
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');


    $("#click_button").click(function () {
        $('#preloader').attr('style', 'display:block');
        var username = $("#username").val();
        var password = $("#password").val();

        var savedAjaxOptions = {
            type: "POST",
            url: "/api/login",
            data: '{data : "<?xml version=\'1.0\' encoding=\'utf-8\' ?><Request ID=\'20200303082855863\'><General><Token>undefined</Token></General><Data><Username>' + username + '</Username><Password>' + password + '</Password></Data></Request>"}',

            contentType: "application/json",
            headers: {

                'Authorization': "BASIC QzFBMDNCMTAtN0Q1OS00MDdBLUE5M0UtQjcxQUIxN0FEOEMyOjE3N0UzMjk1LTA2NTYtNDMxNy1CQzkxLUREMjcxQTE5QUNGRg=="
            },

            dataType: "json",
            success: function (response) {
                $('#preloader').attr('style', 'display:none');
                var _ans = onAjaxResponse(response);
                if (_ans.ResponseCode == 0) {
                    onAjaxSuccess(_ans.RawData);
                } else {
                    alert(_ans.ResponseMessage);
                }
                console.log("ans: " + _ans);
            },
            error: function (jqXHR, textStatus, errorThrown, response) {
                $('#preloader').attr('style', 'display:none');
                var _ans = onAjaxResponse(response);
                alert("error");
                consoe.log(_ans);
                console.log(jqXHR, textStatus, errorThrown);
            },
            canRedirect: 1

        };
        $.ajax(savedAjaxOptions);
    });


    function onAjaxResponse(response) {

        var xmlDoc = $.parseXML(response.d);
        var data = $(xmlDoc);
        var responseCode = parseInt($(data).find("Response>Result>Codice").text());
        var responseMessage = decodeURIComponent($(data).find("Response>Result>Descrizione").text());
        return {
            ResponseCode: responseCode,
            ResponseMessage: responseMessage,
            RawData: response.d
        };
    }
    function onAjaxSuccess(data) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");
        var _auth = xmlDoc.getElementsByTagName("AccessToken")[0].childNodes[0].nodeValue;
        __WACookie = { 'result': _auth };
        setCookie("FramboJSe_TestWAPars", JSON.stringify(__WACookie), 1);
        location.href = "/home/new_home";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);