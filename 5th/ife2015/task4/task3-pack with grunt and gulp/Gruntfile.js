/*global module:false*/
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/src',//js目录下
          src: '**/*.js',//所有js文件
          dest: 'dist/'//输出到此目录下
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: [{
          expand: true,
          src: ['src/**/*.js'],
          dest: 'dist/'

        }]
      }
    },
    cssmin: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.css'],
        dest: 'dist/'
      }
    },
    htmlmin: {
      options: {
        removeComments: true,                     // 去除注释信息 
        collapseWhitespace: true,                   // 去除空白字符  
        removeEmptyAttributes: true,            // 去除标签的空属性
        removeCommentsFromCDATA: true, // 去除 CDATA 的注释信息
        removeRedundantAttributes: true     // 去除标签的冗余属性
      },
      // 具体任务配置
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },
    browserify: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.js',
          dest: 'dist/a'
        }]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'babel', 'cssmin', 'htmlmin', 'browserify']);

};
