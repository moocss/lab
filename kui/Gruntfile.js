module.exports = function(grunt) {
	var dir = '';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: dir+'src/*.js',
                dest: dir+'<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: dir+'<%= pkg.name %>.js',
                dest: dir+'<%= pkg.name %>_min.js'
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat','uglify']);

};