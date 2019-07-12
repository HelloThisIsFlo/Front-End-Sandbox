/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {
  // 1. All configuration goes here
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: "im",
          sizes: [
            {
              width: 400,
              quality: 100
            },
            {
              width: 800,
              quality: 80
            },
            {
              width: 1200,
              quality: 50
            },
            {
              width: 1600,
              quality: 40
            }
          ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [
          {
            expand: true,
            src: ["*.{gif,jpg,png}"],
            cwd: "images_src/",
            dest: "images/"
          }
        ]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ["images"]
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ["images"]
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks("grunt-responsive-images");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-mkdir");

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask("default", ["clean", "mkdir", "responsive_images"]);
};
