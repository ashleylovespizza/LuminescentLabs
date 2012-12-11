(function($) {
      
        var app = $.sammy('#main', function() {
      	  this.use('Template');

          this.get('#/', function(context) {
          	context.app.swap('');
      		this.partial('templates/landing.template');
          });

          this.get('#/science', function(context) {
          	context.app.swap('');
           // var science_css = '<link rel="stylesheet" href="css/jquery.tooltip.css" media="screen" type="text/css" />';

            context.render('templates/science.template')
               .appendTo(context.$element());


            context.render('templates/footer.template')
               .appendTo("#content");
      		//this.partial('templates/science.template');
          });

          this.get('#/labbers', function(context) {
            context.app.swap('');
            context.render('templates/labbers.template')
               .appendTo(context.$element());


            context.render('templates/footer.template')
               .appendTo("#content");

          });

      
        });
      
        $(function() {
          app.run('#/');
        });
      
    })(jQuery);