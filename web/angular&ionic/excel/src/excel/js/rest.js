angular.module('excel').service('rest', function ($http) { // injectables go here
    var self = this; // Save reference
    this._appKey = null;
    this._appSecret = null;
    this._serverURL = null;
    this._sipStatusMsg = {
        "0000": "\u670d\u52a1\u8bf7\u6c42\u5931\u8d25",
        "9999": "\u670d\u52a1\u8bf7\u6c42\u6210\u529f",
        "1001": "\u7b7e\u540d\u65e0\u6548",
        "1002": "\u8bf7\u6c42\u8fc7\u671f",
        "1003": "\u7528\u6237\u7ed1\u5b9a\u5931\u8d25",
        "1004": "\u9700\u8981\u7ed1\u5b9a\u7528\u6237",
        "1005": "/\u9700\u8981\u63d0\u4f9bAppKey",
        "1006": "\u9700\u8981\u63d0\u4f9b\u670d\u52a1\u540d",
        "1007": "\u9700\u8981\u63d0\u4f9b\u7b7e\u540d",
        "1008": "\u9700\u8981\u63d0\u4f9b\u65f6\u95f4\u6233",
        "1009": "\u7528\u6237\u8ba4\u8bc1\u5931\u8d25",
        "1010": "\u65e0\u6743\u8bbf\u95ee\u670d\u52a1",
        "1011": "\u670d\u52a1\u4e0d\u5b58\u5728",
        "1012": "\u9700\u8981\u63d0\u4f9bSessionId",
        "1013": "\u9700\u8981\u63d0\u4f9b\u7528\u6237\u540d"
    };

    this.init = function (appKey, appSecret, serverURL) {
        self._appKey = appKey;
        self._appSecret = appSecret;
        self._serverURL = serverURL;
    };

    this.clear = function () {
        self._appKey = null;
        self._appSecret = null;
        self._serverURL = null;
    };

    this._digit2 = function (n) {
        if (n < 10) return "0" + n;
        return String(n);
    };

    this._createResponse = function (sipStatus, content) {
        var ret = {isok: false};
        try {
            ret.code = parseInt(sipStatus);
            if (sipStatus == "9999") {
                if (typeof content == 'string' || content.constructor == String) content = (new Function("return " + content))();
                ret.data = content;
                ret.message = self._sipStatusMsg[sipStatus];
                ret.isok = true;
            } else {
                ret.message = self._sipStatusMsg[sipStatus];
            }
            if (ret.message == null) {
                ret.message = "网络请求异常";
            }
        } catch (ex) {
            ret.code = 0;
            ret.message = ex;
            ret.data = null;
        }
        return ret;
    };

    this._sendRest = function (content, callback) {
        var url = self._serverURL;
        /*
         * Add header to the request to post transactions as a form
         * Modified by zhangbh on 20151014
         * Switch withCredentials on, to send CORS request with cookies
         * Modified by zhangbh on 20151021
         */
        $http.post(url, content, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            withCredentials: true
        }).then(
            function success(response) {
                //alert(typeof data);
                var res = self._createResponse(response.headers("sip_status"), response.data);
                callback(res);
            },
            function error(response) {
                var res = self._createResponse("0000", null);
                callback(res);
            }
        );
    };

    this.sendOneRequest = function (transaction, callback) {
        var req = {};
        if (self._appKey != null) {
            var d = new Date();
            req.sip_appkey = self._appKey;
            req.sip_timestamp = d.getFullYear() + "-" + self._digit2(d.getMonth() + 1) + "-" + self._digit2(d.getDate()) + " " +
                self._digit2(d.getHours()) + ":" + self._digit2(d.getMinutes()) + ":" + self._digit2(d.getSeconds()) + ".111";
            req.sip_sign = hex_md5(req.sip_appkey + req.sip_timestamp + self._appSecret);
        }
        var transactions = new Array(1);
        transactions[0] = transaction;
        /*
         * Portal Rest can not accept json request, send json as request parameter
         * Modified by zhangbh on 20151014
         */
        req = "transactions=" + encodeURIComponent(angular.toJson(transactions));
        return self._sendRest(req, callback);
    };
});
