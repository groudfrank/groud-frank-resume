$(document).ready(function(){

    $pseudo_body = $('#pseudo-body');
    $nav_btn = $('.nav-btn-d');
    $desktop_nav = $('#desktop-nav');
    $nav_bar_content = $('.navbar-content');
    $nav_btn_m = $('.nav-btn-m');
    $nub_row_1 = $('#nub-row-1');
    $nub_row_3 = $('#nub-row-3');
    $nav_btn_nubs = $('.nav-btn-nubs');
    $hideable =$('.hideable');
    $mobile_nav = $('#mobile-nav');
    $window = $(window);
    $window_width = $(window).width();
    $work_history_btn = $('#work-history-btn');
    $work_history_btn_txt = $('#work-history-btn p');
    $work_history_container = $('.work-history-container');
    $fading_divider = $('.fading-divider');


    // Ensures the pseudo body is displaced to the right width when
    // the size of the browser is changed. This ensures that the 
    // navigation bar hidden beneath is properly exposed.
    $window.on('resize', function(){
        $window_width = $window.width();
    });

    // closes the navigation bar and removes transition styling for 
    // the navigation button(DESKTOP).
    function closeNav(){
        nubDetransition();
        pseudoBodyOrigin();

    };

    // closes the navigation bar and removes transition styling for 
    // the navigation button(DESKTOP).
    function closeNavMobile(){
        TweenMax.to($mobile_nav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
    }
    
    function nubTransition(){
        if($nav_btn_nubs.hasClass("hideable")){
            $nav_btn_nubs.addClass("transform-nub");
        }
    }

    function nubDetransition(){
        if($nav_btn_nubs.hasClass("hideable")){
            $nav_btn_nubs.removeClass("transform-nub");
        }
    }

    // closes the navigation section when the man page content is clicked
    $pseudo_body.on('click', function(){
        if($desktop_nav.hasClass('navigation-closed') == false){
            nubDetransition();
            pseudoBodyOrigin();
        }
    })

    // scroll to animation
    $("a").on('click', function(event) {
        
            if (this.hash !== "") {
            
              event.preventDefault();
              var hash = this.hash;
              // close mobile navigation element before animation
              closeNavMobile();
        
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
                window.location.hash = hash;
                // close mdesktop navigation element after animation
                closeNav();
              });
            } 
          });

    // Returns navbar to original position
    var pseudoBodyOrigin = function(){
        $desktop_nav.addClass('navigation-closed');
        TweenMax.to($pseudo_body, 0.2, {x: 0});
    }

    // On navigation button click(if class is hidden move the )
    // navigation bar into view and change the color of the navigation bar
    // icon.
    $nav_btn.on('click', function(){
        if($desktop_nav.hasClass('navigation-closed')){
            $desktop_nav.removeClass('navigation-closed');
            nubTransition();
            TweenMax.to($pseudo_body, 2.4, {ease: Elastic.easeOut.config(1, 0.3), x: ($window_width * 0.23)});
        }
        else{
            nubDetransition();
            pseudoBodyOrigin();
        }
    });

    function noDisplay(){
        $mobile_nav.addClass('no-display');
    }

     // Returns navbar to original position
     var navbarOriginMobile = function(){
        $mobile_nav.addClass('no-display');
        TweenMax.to($mobile_nav, 0, {opacity: 1, scale: 1});
    }


    // Mobile navigation bar transition.
    $nav_btn_m.on('click', function(){
        if($mobile_nav.hasClass('no-display')){
            $mobile_nav.removeClass('no-display');
            TweenMax.from($mobile_nav, 0.2,{opacity: 0, scale: 0.9});
        }
        else{
            TweenMax.to($mobile_nav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
        }
    });

// Display/hide work histroy botton
    $work_history_btn.on('click', function(){
        if($work_history_container.hasClass('close-content')){
            $fading_divider.removeClass('close-divider');
            $work_history_container.removeClass('close-content');
            $work_history_btn_txt.text('Hide work history');
        }
        else{
            $fading_divider.addClass('close-divider');
            $work_history_container.addClass('close-content');
            $work_history_btn_txt.text('Show work history');
        }
    })


}); //Document
