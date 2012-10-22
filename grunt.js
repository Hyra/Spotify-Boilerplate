module.exports = function(grunt){
 
  grunt.initConfig({
    coffee: {
      def: {
        dir: 'coffee/*.coffee',
        dest: 'js/'
      }
    },
    watch: {
      def: {
        files: 'coffee/*.coffee',
        tasks: 'coffee:def ok'
      }
    }
  });
 
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'coffee ok');
 
};