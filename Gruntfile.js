module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      bracket: {
        files: {
          'public/js/bracket.min.js': ['public/js/BracketClass.js', 'public/js/bracket.js'],
          'public/js/misc.min.js': ['public/js/misc.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/bracket.css': 'public/css/bracket.scss'
        }
      }
    },
    cssmin: {
      bracket: {
        files: {
          'public/css/bracket.min.css': ['public/css/bootswatch.css', 'public/css/bracket.css']
        }
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'public/js/jquery-1.9.1.min.js',
          'public/js/jquery.smooth-scroll.min.js',
          'public/js/bootstrap.min.js'

        ],
        dest: 'public/js/libs.js'
      },
      bracketlibs: {
        options: {
          separator: ';'
        },
        src: [
          'public/js/underscore-min.js',
          'public/js/backbone-min.js',
          'public/js/jade.min.js'
        ],
        dest: 'public/js/bracket-libs.js'
      },
      css: {
        src: [
          'public/css/bootstrap.css',
          'public/css/bootstrap-responsive.min.css',
          'public/css/bracket.min.css'
        ],
        dest: 'public/css/all.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'cssmin', 'concat']);

};