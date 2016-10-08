/**
 * Created by chenmengqi on 2016/9/7.
 */
'use strict';

// Declare app level module which depends on views, and components
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('excel', [
    'agGrid',
    'ui.router',
    'angularFileUpload',
    'pascalprecht.translate'
])

    .config(['$stateProvider','$urlRouterProvider', '$translateProvider',
        function($stateProvider,$urlRouterProvider,$translateProvider) {

            /**
             * Default route addresses
             */
            $urlRouterProvider
                .when('', '/init')
                .otherwise('/404');

            $stateProvider
                .state("init", {
                    url:"/init/:tableId",
                    templateUrl: "templates/init.html",
                    controller:"initCtrl"
                })
                .state("define", {
                    url:"/define/:id",
                    templateUrl: "templates/define.html",
                    controller:"defineCtrl"
                })
                .state("transform", {
                    url:"/transform/:transformId",
                    templateUrl: "templates/transform.html",
                    controller:"transformCtrl"
                })
                .state("review", {
                    url:"/review",
                    templateUrl: "templates/review.html"
                })
                .state("modify", {
                    url:"/modify",
                    templateUrl: "templates/modify.html"
                });
            /**
             * Log delegate
             */
           /* $provide.decorator('$exceptionHandler', ['$log', '$delegate',
                function($log, $delegate) {
                    return function(exception, cause) {
                        // TODO Handle exception
                        $log.debug(exception);
                        $delegate(exception, cause);
                    };
                }
            ]);

            $httpProvider.interceptors.push(function($rootScope) {
                return {
                    request: function(config) {
                        $rootScope.$broadcast('loading:show')
                        return config
                    },
                    response: function(response) {
                        $rootScope.$broadcast('loading:hide')
                        return response
                    }
                }
            });*/



/*            $translateProvider.translations('en', {
                TITLE: 'Login',
                UserName: 'UserName',
                Pwd: 'Password',
                BUTTON_Login: 'Login',
                BUTTON_Cancel: 'Cancel',
                PleaseMobile: 'Please input your mobile No.',
                Pwd_tips: 'Please input your password'
            });
            $translateProvider.translations('cn', {
                TITLE: '登录',
                UserName: '用户名',
                Pwd: '密码',
                BUTTON_Login: '登录',
                BUTTON_Cancel: '取消',
                PleaseMobile: '请输入注册手机号',
                Pwd_tips: '请输入密码'
            });*/
            $translateProvider
                .registerAvailableLanguageKeys(['en', 'zh-Hans', 'zh-Hant'], {
                    'en':       'en',
                    'en-US':    'en',
                    'en-UK':    'en',
                    'en-*':     'en',
                    'zh':       'zh-Hans',
                    'zh-CN':    'zh-Hans',
                    'zh-SG':    'zh-Hans',
                    'zh-CHS':   'zh-Hans',
                    'zh-Hans':  'zh-Hans',
                    'zh-Hans-*':'zh-Hans',
                    'zh-TW':    'zh-Hant',
                    'zh-HK':    'zh-Hant',
                    'zh-CHT':   'zh-Hant',
                    'zh-Hant':  'zh-Hant',
                    'zh-Hant-*':'zh-Hant',
                    'zh-*':     'zh-Hans',
                    'fil':      'fil',
                    'fil-PH':   'fil',
                    '*':        'en'
                });

            $translateProvider.preferredLanguage('en');
           /* $translate.use(langKey)*/    //设置样式

            $translateProvider.useStaticFilesLoader({
                prefix:'languages/',
                suffix:'.json'
            });
        }
    ]);

