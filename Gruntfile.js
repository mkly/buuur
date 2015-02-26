module.exports = function(grunt) {

  grunt.initConfig({
    bowerRequirejs: {
      all: {
        rjsConfig: 'app/config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.registerTask('default', ['bowerRequirejs:all']);
};
