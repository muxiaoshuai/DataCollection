module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    /*grunt.loadNpmTasks('grunt-karma');*/
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task.
    /*grunt.registerTask('default', ['jshint','build','karma:unit']);
    grunt.registerTask('build', ['clean','html2js','concat','recess:build','copy:assets']);
    grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets']);
    grunt.registerTask('test-watch', ['karma:watch']);*/
    grunt.registerTask('default', ['clean', 'html2js', 'copy:templates', 'concat', 'recess:build', 'copy']);

    // Print a timestamp (useful for when watching)
    /*grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });*/

    /*var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };*/

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        /*distdir: 'E:/portal5/jboss/server/default/deploy/ROOT.war/phone',*/
        pkg: grunt.file.readJSON('package.json'),
        banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n */\n',
        src: {
            js: ['src/excel/*.js'],
            jsTpl: ['<%= distdir %>/templates/*.js'],
            specs: ['test/*.spec.js'],
            scenarios: ['test/*.scenario.js'],
            html: ['src/index.html'],
            tpl: {
                app: ['src/excel/*.html']
            },
            less: ['src/excel.css', 'src/excel/**/*.less', 'src/excel/**/*.css'],
            lessWatch: ['src/**/*.less', 'src/**/*.css']
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            /*assets: {
                files: [{ dest: '<%= distdir %>', src : '**', expand: true, cwd: 'src/assets/' }]
            }*/
            index: {
                files: [
                    {dest: '<%= distdir %>/index.html', src: 'src/index.html'}
                ]
            },
            vendors: {
                files: [
                    {dest: '<%= distdir %>/js/angular.min.js', src: 'vendor/angular/angular.min.js'} ,
                    {dest: '<%= distdir %>/js/angular-ui-router.min.js', src: 'vendor/angular-ui-router/release/angular-ui-router.min.js'} ,
                    {dest: '<%= distdir %>/js/angular-file-upload.min.js', src: 'vendor/angular-file-upload/dist/angular-file-upload.min.js'} ,
                    {dest: '<%= distdir %>/js/bootstrap.min.js', src: 'vendor/bootstrap/dist/js/bootstrap.min.js'} ,
                    {dest: '<%= distdir %>/js/jquery.min.js', src: 'vendor/jquery/dist/jquery.min.js'} ,
                    {dest: '<%= distdir %>/js/ag-grid.min.js', src: 'vendor/ag-grid/dist/ag-grid.min.js'} ,
                    {dest: '<%= distdir %>/js/angular-translate.min.js', src: 'vendor/angular-translate/angular-translate.min.js'} ,
                    {dest: '<%= distdir %>/js/angular-translate-loader-static-files.min.js', src: 'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js'} ,
                    {dest: '<%= distdir %>/js/angular-translate-loader-url.min.js', src: 'vendor/angular-translate-loader-url/angular-translate-loader-url.min.js'} ,

                    {dest: '<%= distdir %>/css/bootstrap.min.css', src: 'vendor/bootstrap/dist/css/bootstrap.min.css'} ,
                    {dest: '<%= distdir %>/css/ag-grid.css', src: 'vendor/ag-grid/dist/styles/ag-grid.css'}



                ]
            },
            images: {
                files: [
                    {dest: '<%= distdir %>/images', src: 'excel/img/*', expand: true, cwd: 'src/',flatten: true}
                  /*  {dest: '<%= distdir %>/images/func', src: '**', expand: true, cwd: 'src/app/funcs/images/'}*/
                ]
            },
            fonts:{
                files: [
                 {dest: '<%= distdir %>/fonts', src: 'vendor/bootstrap/dist/fonts/*',expand: true,flatten: true}
                ]
            },
            templates: {
                files: [
                    {dest: '<%= distdir %>/templates', src: '**/*.html', expand: true, cwd: 'src/excel/'}
                ]
            }
          /*  report: {
                files: [
                    {dest: '<%= distdir %>/report', src: '**', expand: true, cwd: 'src/report'}
                ]
            }*/
            ,
            jsons: {
                files: [
                    {dest: '<%= distdir %>/jsons', src: '**/*.json', expand: true, cwd: 'src/excel/json',flatten: true}

                ]
            }
            /*,
            electron: {
                files: [
                    {dest: '<%= distdir %>/languages', src: '*.json',expand: true, cwd: 'src/languages/',flatten: true}

                ]
            }*/
        },
        /*karma: {
            unit: { options: karmaConfig('test/config/unit.js') },
            watch: { options: karmaConfig('test/config/unit.js', { singleRun:false, autoWatch: true}) }
        },*/
        html2js: {
            app: {
                options: {
                    base: 'src/excel'
                }
                /*src: ['<%= src.tpl.excel %>'],
                dest: 'temp/excel.tpl.js',
                module: 'excel.templates'*/
            }
        },
        concat:{
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['src/excel.js', 'src/config.js', 'src/excel/module.js', 'src/excel/js/*.js', '!src/excel/*.test.js', '!src/excel/*.spec.js'],
                dest:'<%= distdir %>/js/excel.js'
            },
            i18n_en:{

                src: 'src/excel/i18n/*-en.json' ,
                dest:'<%= distdir %>/languages/en.json'
            },
            i18n_zh_Hans:{

                src: 'src/excel/i18n/*-zh-Hans.json' ,
                dest:'<%= distdir %>/languages/zh-Hans.json'
            }/*,
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },
            angular: {
                src:[
                    'vendor/angular/angular.min.js',
                    'vendor/angular-route/angular-route.min.js'
                ],
                dest: '<%= distdir %>/js/angular.js'
            },
            bootstrap: {
                src:['vendor/angular-ui/bootstrap/!*.js'],
                dest: '<%= distdir %>/bootstrap.js'
            },
            jquery: {
                src:['vendor/jquery/!*.js'],
                dest: '<%= distdir %>/jquery.js'
            }*/
        },
        uglify: {
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },
            angular: {
                src:['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/angular.js'
            },
            bootstrap: {
                src:['vendor/angular-ui/bootstrap/*.js'],
                dest: '<%= distdir %>/bootstrap.js'
            },
            jquery: {
                src:['vendor/jquery/*.js'],
                dest: '<%= distdir %>/jquery.js'
            }
        },
        recess: {
            build: {
                files: {
                    '<%= distdir %>/css/excel.css': ['<%= src.less %>']

                },
                options: {
                    compile: true
                }
            },
            min: {
                files: {
                    '<%= distdir %>/css/excel.css': ['<%= src.less %>']
                },
                options: {
                    compress: true
                }
            }
        },
        watch:{
            all: {
                files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.my %>', '<%= src.tpl.biz %>', '<%= src.tpl.common %>', '<%= src.html %>'],
                tasks:['default','timestamp']
            },
            build: {
                files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.my %>', '<%= src.tpl.biz %>', '<%= src.tpl.common %>', '<%= src.html %>'],
                tasks:['build','timestamp']
            }
        },
        jshint:{
            files:['Gruntfile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                boss:true,
                eqnull:true,
                globals:{}
            }
        },
        compress: {
             /* all: {
                  options: {
                      archive: '<%= distdir %>/updates/all.lcz',
                      mode: 'zip'
                  },
                  files: [
                      {expand: true, cwd: '<%= distdir %>/', src: ['**'], dest: 'www/'}
                     *//* {src: ['temp/www'], dest: '<%= distdir %>/updates/'}*//*
                      *//*{src: ['path/!*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
                      {src: ['path/!**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
                      {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd
                      {flatten: true, src: ['path/!**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level*//*
                  ]
              }
              app: {
                  options: {
                      archive: '<%= distdir %>/updates/app.lcz',
                      mode: 'zip'
                  },
                  files: [
                      {expand: true, cwd: '<%= distdir %>/', src: ['index.html'], dest: 'www/'},
                      {expand: true, cwd: '<%= distdir %>/js/', src: ['app.js', 'wxshell.js'], dest: 'www/js/'},
                      {expand: true, cwd: '<%= distdir %>/css/', src: ['app.css'], dest: 'www/css/'},
                      {expand: true, cwd: '<%= distdir %>/templates/', src: ['**'], dest: 'www/templates/'}
                  ]
              },
              lib: {
                  options: {
                      archive: '<%= distdir %>/updates/lib.lcz',
                      mode: 'zip'
                  },
                  files: [
                      {expand: true, cwd: '<%= distdir %>/js/', src: ['**', '!app.js', '!wxshell.js'], dest: 'www/js/'},
                      {expand: true, cwd: '<%= distdir %>/css/', src: ['**', '!app.css'], dest: 'www/css/'},
                      {expand: true, cwd: '<%= distdir %>/fonts/', src: ['**'], dest: 'www/fonts/'}
                  ]
              },
              res: {
                  options: {
                      archive: '<%= distdir %>/updates/res.lcz',
                      mode: 'zip'
                  },
                  files: [
                      {expand: true, cwd: '<%= distdir %>/images/', src: ['**'], dest: 'www/images/'}
                  ]
              }*/
          }
    });

};
