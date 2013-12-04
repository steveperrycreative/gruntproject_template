module.exports = function(grunt) {

    grunt.initConfig({

        // Watches for changes and runs tasks
        watch : {
            sass : {
                files : ['scss/**/*.scss'],
                tasks : ['sass:dev'],
                options : {
                    livereload : true
                }
            },
            js : {
                files : ['js/**/*.js'],
                tasks : ['jshint'],
                options : {
                    livereload : true
                }
            },
            php : {
                files : ['**/*.php'],
                options : {
                    livereload : true
                }
            }
        },

        // JsHint your javascript
        jshint : {
            all : ['js/*.js', '!js/modernizr.js', '!js/*.min.js', '!js/vendor/**/*.js'],
            options : {
                browser: true,
                curly: false,
                eqeqeq: false,
                eqnull: true,
                expr: true,
                immed: true,
                newcap: true,
                noarg: true,
                smarttabs: true,
                sub: true,
                undef: false
            }
        },

        // Dev and production build for sass
        sass : {
            production : {
                files : [
                    {
                        src : ['**/*.scss', '!**/_*.scss'],
                        cwd : 'scss',
                        dest : 'css',
                        ext : '.css',
                        expand : true
                    }
                ],
                options : {
                    compass : true,
                    style : 'compressed'
                }
            },
            dev : {
                files : [
                    {
                        src : ['**/*.scss', '!**/_*.scss'],
                        cwd : 'scss',
                        dest : 'css',
                        ext : '.css',
                        expand : true
                    }
                ],
                options : {
                    compass : true,
                    style : 'expanded'
                }
            }
        },

        // Image min
        imagemin : {
            production : {
                files : [
                    {
                        expand: true,
                        cwd: 'imgs',
                        src: '**/*.{png,jpg,jpeg}',
                        dest: 'dist/imgs'
                    }
                ]
            }
        },

        // SVG min
        svgmin: {
            production : {
                files: [
                    {
                        expand: true,
                        cwd: 'imgs',
                        src: '**/*.svg',
                        dest: 'dist/imgs'
                    }
                ]
            }
        },

        // Concat
        concat: {
            html: {
                files: [{
                    cwd: '.',
                    src: 'index.html',
                    dest: 'dist/index.html'
                }]
            }
        },

        // Usemin
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html'],
            options: {
                dirs: ['dist']
            }
        },

        // Clean
        clean: {
            dist: ['.tmp']
        }

    });

    // Default task
    grunt.registerTask('default', ['watch']);

    // Build task
    grunt.registerTask('build', ['jshint', 'imagemin:production', 'svgmin:production', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin', 'clean:dist']);

    // Clean task
    grunt.registerTask('clean');

    // Template Setup Task
    grunt.registerTask('setup', ['sass:dev', 'bower-install'])

    // Load up tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Run bower install
    grunt.registerTask('bower-install', function() {
        var done = this.async();
        var bower = require('bower').commands;
        bower.install().on('end', function(data) {
            done();
        }).on('data', function(data) {
                console.log(data);
            }).on('error', function(err) {
                console.error(err);
                done();
            });
    });

};
