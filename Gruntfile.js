module.exports = function(grunt) {
    var appfiles = ['*.js','lib/*.js', 'models/*.js', 'test/*.js'];

    grunt.initConfig({
        jshint: {
            files: appfiles
        },
        watch: {
            files: appfiles,
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};