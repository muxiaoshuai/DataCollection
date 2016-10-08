/**
 * Configurations
 */
angular.module('excel')
    .constant('excel', {
        /**
         * App name
         */
        'name': 'Lifecycle Excel',
        /**
         * App version
         */
        'version': '1.0.0',
        /**
         * APP | WECHAT | ONLINE
         */
        'clientMode': 'ONLINE'
        /**
         * For APP mode only
         */
       /* 'update': {
            'baseUrl': 'http://b2b.mg-pen.com:89/phone/updates/',
            'packages': [
                'res.lcz',
                'lib.lcz',
                'app.lcz'
            ]
        }*/
    })
    .constant('portal', {
        /**
         * Portal address.
         * E.g.
         *     'http://localhost',
         *     'http://192.168.100.18:10170'
         */
        'address': 'http://localhost:8080',
        /**
         * '/servlets/binserv/Rest'
         */
        'restPath': '/servlets/binserv/Rest',
        /**
         * '/servlets/binserv/Phone'
         */
        'phonePath': '/servlets/binserv/Phone',
        'requestPath': '/servlets/binserv/Request',
        'fairPath':'/servlets/binserv/Fair',

        /**
         * Qualified class name for MiscCmd
         */
     /*    'b2bFairCmd' :'com.agilecontrol.fair.FairCmd',
         'b2bMiscCmd':'com.agilecontrol.fair.MiscCmd',
        'miscCmd': 'com.agilecontrol.phone.MiscCmd',*/
        "B2BCmd":"com.agilecontrol.phone.B2BCmd",
        /**
         * Key to get Query Config List
         */
        'qlcKey': 'phone',
        /**
         * Key to get table's additional properties
         */
        'propKey': 'phone2' ,
        /**
         * tableName: storing current user info
         */
        'userInfoTableName': 'users_one'
    })
    .constant('client', {
        /**
         * Path for functions' icon
         */
        'fnImagePath': 'images/func/',
        /**
         * Key to get userSchema from LocalStorage
         */
        'lsUserSchema': 'userSchema',
        /**
         * Key to get packages last modified dates from LocalStorage
         */
        'keyLastUpdates': 'lastUpdates'
    });
