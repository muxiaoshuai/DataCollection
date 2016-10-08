/**
 * Created by chenmengqi on 2016/9/7.
 */
angular.module('excel')
    .factory('miscCmd',['rest','portal',function(rest,portal){
        var serverURL=portal.address + portal.requestPath;
        var sendRequest = function (command,params,successCallback,errorCallback){
            rest.init(null,null,serverURL);

        // params.token = "14:6F0T3a0VQ5KcTeSpbEpMOA";

            var trans = {
                id     : 1,
                command: command,
                params : params
            };
            rest.sendOneRequest(trans, function (response) {
                console.info(trans,response)   ;
                var code = response.code;
                if (9999 == code && response.data != undefined && response.data.length > 0) {
                    // Request successful
                    if (response.data[0].code && response.data[0].code != 0) {
                        if (errorCallback) {
                            errorCallback(response.data[0], response.data[0].code, response.data[0].message);
                        } else {
                            console.error(response.data[0].message ? response.data[0].message : "服务器错误");
                        }
                    } else {
                        successCallback(response.data[0], response.code, response.message);
                    }
                } else if (1009 == code || 1005 == code) {
                    // User is not logged in, try login using local credential
                    login.autoLogin(function (result, code, message) {
                        // Login successful
                        // Re-send original request
                        rest.init(null, null, serverURL);
                        rest.sendOneRequest(trans, function (response1) {
                            if (9999 == response1.code && response1.data && response1.data.length > 0) {
                                // Request successful
                                if (response1.data[0].code && response1.data[0].code != 0) {
                                    if (errorCallback) {
                                        errorCallback(response1.data[0], response1.data[0].code, response1.data[0].message);
                                    } else {
                                        alert(response1.data[0].message ? response1.data[0].message : "服务器错误");
                                        //console.error(response1.data[0].message ? response1.data[0].message : "服务器错误");
                                    }
                                } else {
                                    successCallback(response1.data[0], response1.code, response1.message);
                                }
                            } else if (errorCallback) {
                                errorCallback(response1.data[0], response1.code, response1.message);
                            } else {
                                alert(response1.message);
                              //  console.error(response1.message);
                            }
                        });
                    }, function (result, code, message) {
                        // TODO If auto-login failed, show login dialog
                        // login.showLoginDialog();
                    });
                } else if (errorCallback) {
                    // Request unsuccessful
                    errorCallback(response.data[0], response.code, response.message);
                } else {
                    console.info(response)
                    alert(response.message);
                   // console.error(response.message);
                }

            });


        };


        var demo=function(params,successCallback, errorCallback){
            sendRequest(portal.B2BCmd,params,function(result, code, message){
                successCallback(result, code, message);
            }, errorCallback ? function(result, code, message) {
                errorCallback(result, code, message);
            } : undefined)
        };

        return {
            demo:demo
        }

    }]);