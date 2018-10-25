/*
 Project name:       TREND
 Project author:     ModelTheme
 File name:          Custom JS
*/

jQuery( document ).ready(function() {

    // Comma, not colon ----^

$('img').on('click', function() {
			$('.enlargeImageModalSource').attr('src', $(this).attr('src'));
			$('#enlargeImageModal').modal('show');
		});

    //Begin: MailChimp JS
    jQuery('#subscribe').ketchup().submit(function(evt) {
        evt.preventDefault();
        if (jQuery(this).ketchup('isValid')) {
            var action = jQuery(this).attr('action');

            jQuery.ajax({
                url: action,
                type: 'POST',
                data: {
                    email: jQuery('#address').val()
                },
                success: function(data){
                    jQuery('#result').html(data).css('color', '#35cf76');
                },
                error: function() {
                    jQuery('#result').html('Sorry, an error occurred.').css('color', '#e74c3c');
                }
            });
        }else{
            jQuery('#result').html('Please enter an valid email address.').css('color', '#e74c3c');
        }
        return false;
    });
    //End: MailChimp JS
    

    //Begin: Validate and Submit contact form via Ajax
    jQuery("#contact_form").validate({
        //Ajax validation rules
        rules: {
            user_name: {
                required: true,
                minlength: 2
            },
            user_message: {
                required: true,
                minlength: 10
            },
            user_subject: {
                required: true,
                minlength: 5
            },
            user_email: {
                required: true,
                email: true
            }
        },
        //Ajax validation messages
        messages: {
            user_name: {
                required: "Please enter a name",
                minlength: "Your name must consist of at least 2 characters"
            },
            user_message: {
                required: "Please enter a message",
                minlength: "Your message must consist of at least 10 characters"
            },
            user_subject: {
                required: "Please provide a subject",
                minlength: "Your subject must be at least 5 characters long"
            },
            user_email: "Please enter a valid email address"
        },
        //Submit via Ajax Form
        submitHandler: function() {
            jQuery('#contact_form').ajaxSubmit();
            jQuery('.success_message').fadeIn('slow');
        }
    });
    //End: Validate and Submit contact form via Ajax


    //Begin: Sticky Head
    // jQuery("#trend-main-head").sticky({
    //     topSpacing:0
    // });
    //End: Sticky Head


    //Begin: Smooth Scroll
    jQuery(function(){
      jQuery.scrollIt({
          upKey:        38,         // key code to navigate to the next section
          downKey:      40,         // key code to navigate to the previous section
          easing:       'linear',   // the easing function for animation
          scrollTime:   1000,       // how long (in ms) the animation takes
          activeClass:  'active',   // class given to the active nav element
          onPageChange: null,       // function(pageIndex) that is called when page is changed
          topOffset:    -80         // offste (in px) for fixed top navigation
        });
    });
    //End: Smooth Scroll


    //Begin: Search Form
    if ( jQuery( "#trend-search" ).length ) {
        new UISearch( document.getElementById( 'trend-search' ) );
    }
    //End: Search Form

    //Begin: Flat icons
    if (jQuery('body[class*=skin_]').length){
        var skin_color       = jQuery('body[class*=skin_]').attr('class').split(' ');
        var skin_color_class = skin_color.filter(  function(elem){ return elem.match(/skin_*/) } ).join('');
        var skin_color_hexa  = skin_color_class.replace("skin_", "#");

        jQuery(".flat-icon").flatshadow({
          fade: false,
          color: skin_color_hexa,
          boxShadow: "#00ADF1"
        });
    }
    //End: Flat icons

    //Begin: Parallax
    jQuery('.parralax-background').parallax("50%", 0.5);
    //End: Parallax

    /*Begin: Testimonials slider*/
    jQuery(".testimonials-container").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : true,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    /*End: Testimonials slider*/

    /*Begin: Testimonials slider*/
    jQuery(".post_thumbnails_slider").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    var owl = jQuery(".post_thumbnails_slider");
    jQuery(".next").click(function(){
        owl.trigger('owl.next');
    })
    jQuery(".prev").click(function(){
        owl.trigger('owl.prev');
    })
    /*End: Testimonials slider*/
    
    /*Begin: Testimonials slider*/
    jQuery(".testimonials_slider").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : true,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    /*End: Testimonials slider*/

    /* Animate */
    $('.animateIn').animateIn();

    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.back-to-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('trend-is-visible') : $back_to_top.removeClass('trend-is-visible trend-fade-out');
        if( $(this).scrollTop() > offset_opacity ) { 
            $back_to_top.addClass('trend-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

    //Begin: Skills
    jQuery('.statistics').appear(function() {
        jQuery('.percentage').each(function(){
            dataperc = jQuery(this).attr('data-perc');
            console.log('Starting the counter');
            jQuery(this).find('.skill-count').delay(6000).countTo({
                from: 0,
                to: dataperc,
                speed: 5000,
                refreshInterval: 100
            });
        });
    }); 
    //End: Skills 

    /* Youtube Video */
    if ($('.player').length){
        $(".player").mb_YTPlayer({});
        $('.player').on("YTPStart",function(){
           $('.video-bg').animate({opacity: 1}, 5000,function(){});
        });
    }
});