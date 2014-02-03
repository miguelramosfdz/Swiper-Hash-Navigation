'use strict';

/*global require:true, module:false*/
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var swiper = {
        filename: 'idangerous.swiper.hashnav'
    };

    // Project configuration.
    grunt.initConfig({
        swiper: swiper,
        // Metadata.
        pkg: grunt.file.readJSON('bower.json'),
        banner: '/*\n' +
          ' * Swiper Hash Navigation <%= pkg.version %>\n' +
          ' * Plugin for Swiper\n' +
          ' *\n' +
          ' * <%= pkg.homepage %>\n' +
          ' *\n' +
          ' * Copyright 2012-<%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
          ' * The iDangero.us\n' +
          ' * http://www.idangero.us/\n' +
          ' *\n' +
          ' * Licensed under <%= pkg.license.join(" & ") %>\n' +
          ' *\n' +
          ' * Released on: <%= grunt.template.today("mmmm d, yyyy") %>\n' +
          '*/\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            js: {
                src: ['lib/<%= swiper.filename %>.js'],
                dest: 'dist/<%= swiper.filename %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['dist/<%= swiper.filename %>.js'],
                dest: 'dist/<%= swiper.filename %>.min.js',
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: ['Gruntfile.js']
            },
            lib: {
                src: ['lib/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib']
            }
        }
    });

    // Default task.
    this.registerTask('default', 'build');

    // Build a new version of the library
    this.registerTask('build', 'Builds a distributable version of <%= pkg.name %>', [
        'concat:js',
        'jshint:lib',
        'uglify'
    ]);

};
