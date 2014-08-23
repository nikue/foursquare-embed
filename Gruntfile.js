module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      build: {
        options: {
          style: "expanded"
        },
        files: [{
          'build/styles.css': 'public/styles.scss',
        }]
      }
    },

    watch: {
      scss: {
        files: ['public/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
      javascript: {
        files: 'public/*.js',
        tasks: ['copy:javascript'],
        options: {
          livereload: true,
        }
      },

      html: {
        files: 'public/*.html',
        tasks: ['copy:html'],
        options: {
          livereload: true,
        }
      },
    },

    copy: {
      html: {
        src: 'public/index.html',
        dest: 'build/index.html'
      },

      javascript: {
        src: 'public/script.js',
        dest: 'build/script.js'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'build/index.html': 'build/index.html'
        }
      }
    },

    inline: {
      dist: {
        options: {
          tag: '',
          cssmin: true,
          uglify: true
        },
        src: ['build/index.html'],
        dest: ['build/']
      }
    },

    clean: {
      release: ["build/script.js", "build/styles.css"]
    },
  });

  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['copy', 'sass', 'inline', 'htmlmin'/*, 'clean'*/]);

};