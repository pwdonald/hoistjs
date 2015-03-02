module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: 'hoist.ts',
                outDir: 'dist',
                options: {
                    module: 'amd'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts']);
    grunt.registerTask('make', ['default']);
};