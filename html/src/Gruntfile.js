'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var appConfig = {
    app: require('./bower.json').appPath || 'client/app',
    dist: 'dist'
  };
  grunt.initConfig({
    yeoman: appConfig,
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:server']
      },
      js: {
        files: [
          '<%= yeoman.app %>/modules/**/{,*/}*.js'
        ],
        tasks: ['includeSource:server', 'wiredep:server']
      },
      styles: {
        files: ['<%= yeoman.app %>/css/{,*/}*.css'],
        tasks: [
          'newer:copy:styles',
          'autoprefixer',
          'includeSource:server',
          'wiredep:server'
        ]
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      includeSource: {
        files: ['<%= yeoman.app %>/index.tpl.html'],
        tasks: ['includeSource:server']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/modules/**/{,*/}*.js'
        ]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp',
      less: ['<%= yeoman.app %>/css/less.css']
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css | {,*/}*.less',
          dest: '.tmp/css/'
        }]
      }
    },
    includeSource: {
      options: {
        basePath: 'client/app',
        baseUrl: '',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}" />',
            less: '<link rel="stylesheet/less" type="text/css" href="{filePath}" />'
          },
          less: {
            less: '@import "{filePath}";',
            css: '@import "{filePath}";',
          }
        }
      },
      server: {
        files: {
          '<%= yeoman.app %>/index.html': '<%= yeoman.app %>/index.tpl.html'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index.tpl.html'
        }
      },
      server2: {
        files: {
          '<%= yeoman.app %>/index.html': '<%= yeoman.app %>/index2.tpl.html'
        }
      },
      dist2: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index2.tpl.html'
        }
      }
    },
    wiredep: {
      server: {
        src: ['<%= yeoman.app %>/index.html'],
       
        ignorePath: /\.\.\//
      },
      dist: {
        src: ['<%= yeoman.dist %>/index.html'],
        ignorePath: '../client/app/'
      }
    },
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          //'<%= yeoman.dist %>/fonts/*'
        ]
      },
      distImg: {
        src: [
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        ]
      },
      distJs: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js'
        ]
      },
      distCss: {
        src: [
          '<%= yeoman.dist %>/styles/{,*/}*.css',
        ]
      }
    },
    useminPrepare: {
      html: '<%= yeoman.dist %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        root: '<%= yeoman.app %>',
        flow: {
          html: {
            steps: {
              js: [
                'concat',
                'uglifyjs'
              ],
              css: [
                'cssmin'
              ]
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/modules/{,*/**/*}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{scripts,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images'
        ],
        patterns: {
          js: [
            [/(images\/\w*.(jpg|png|gif))/g, 'Replacing reference to image.png']
          ]
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: [
            '*.html',
            'modules/**/views/{,*/}*.html'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: [
            '*.js',
            '!lb-services.js',
            '!config.js',
            '!oldieshim.js'
          ],
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'modules/**/{,*/}*.html',
            'images/{,*/}*.*',
            //'css/{,*/}*.*',
            'fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/css',
          dest: '<%= yeoman.dist %>/css',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/ionicons',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/components-font-awesome',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/simple-line-icons',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/angular-ui-grid',
          src: ['ui-grid.ttf','ui-grid.woff'],
          dest: '<%= yeoman.dist %>/styles'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: 'player/**',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css | {,*/}*.less'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    docular: {
      useHtml5Mode: true,
      docular_webapp_target: 'docs',
      showAngularDocs: true,
      showDocularDocs: true,
      groups: [{
        groupTitle: 'Admin',
        groupId: 'loopbackApp',
        sections: [{
          id: 'loopbackApp',
          title: 'LoopBack Services',
          scripts: ['<%= yeoman.app %>/modules/**/{,*/}*.js']
        }]
      }, {
        groupTitle: 'LoopBack',
        groupId: 'loopback',
        sections: [{
          id: 'lbServices',
          title: 'LoopBack Services',
          scripts: ['<%= yeoman.app %>/js/lb-services.js']
        }]
      }]
    },
    "jsbeautifier": {
      "default": {
        src: [
          "client/app/js/app.js",
          "client/app/modules/**/*.js",
          "common/**/*.js",
          "server/**/*.js"
        ],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      "git-pre-commit": {
        src: ["src/**/*.js"],
        options: {
          mode: "VERIFY_ONLY"
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: 'dist',
          timestamp: false,
          hash: true
        },
        src: [
          //'modules/**/views/{,*/}*.html',
          //'images/*.*',
          'styles/*.css',
          'scripts/*.js',
          //'index.html'
        ],
        dest: 'dist/yf.appcache'
      }
    },
    less: {
      development: {
        options: {
          paths: ['<%= yeoman.app %>/css']
        },
        files: {
          '<%= yeoman.app %>/css/less.css': '<%= yeoman.app %>/css/(\S*)\.less'
        }
      }
    }

  });

  grunt.registerTask('test', [
    'clean:server',
    'includeSource:server',
    'wiredep:server',
    'concurrent:test',
    'autoprefixer'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'less:development',
    'test',
    'includeSource:dist',
    'wiredep:dist',
    'useminPrepare',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev:distImg',
    'usemin:html',
    'usemin:css',
    'usemin:js',
    'filerev:distJs',
    'filerev:distCss',
    'usemin',
    'htmlmin',
    'manifest',
    'clean:less'
  ]);

  grunt.registerTask('pro', [
    'clean:dist',
    'clean:server',
    'includeSource:server2',
    'wiredep:server',
    'concurrent:test',
    'autoprefixer',
    'includeSource:dist2',
    'wiredep:dist',
    'useminPrepare',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev:distImg',
    'usemin:html',
    'usemin:css',
    'usemin:js',
    'filerev:distJs',
    'filerev:distCss',
    'usemin',
    'htmlmin',
    'manifest'
  ]);

  grunt.registerTask('default', [
    //'newer:jshint',
    'test',
    'docular',
    'build'
  ]);
};