$(document).ready(function(){

    $pseudo_body = $('#pseudo-body');
    $nav_btn = $('.nav-btn-d');
    $desktop_nav = $('#desktop-nav');
    $nav_bar_content = $('.navbar-content');
    $nav_btn_m = $('.nav-btn-d-m');
    $mobile_nav = $('#mobile-nav');
    $window_width = $(window).width();

    function closeNav(){
        setTimeout(function(){
            $nav_btn.removeClass('nav-btn-d-transition');
        }, 1000);
        // TweenMax.to($nav_dropdown_desktop, 0.2, {y: -100, opacity: 1, delay:1, onComplete: navbarOrigin});
        pseudoBodyOrigin();

    };

    function closeNavMobile(){
        $nav_btn_m.removeClass('make-transparent');
        TweenMax.to($mobile_nav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
    }

    $pseudo_body.on('click', function(){
        if($desktop_nav.hasClass('navigation-closed') == false){
            $nav_btn.removeClass('nav-btn-d-transition');
            pseudoBodyOrigin();
        }
    })

    $("a").on('click', function(event) {
        
            if (this.hash !== "") {
            
              event.preventDefault();
              var hash = this.hash;
        
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
                window.location.hash = hash;
                closeNav();
                closeNavMobile();
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
            $nav_btn.addClass('nav-btn-d-transition');
            TweenMax.to($pseudo_body, 0.2, {x: ($window_width * 0.25)});
        }
        else{
            $nav_btn.removeClass('nav-btn-d-transition');
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
            $nav_btn_m.addClass('make-transparent');
            TweenMax.from($mobile_nav, 0.2,{opacity: 0, scale: 0.9});
        }
        else{
            $nav_btn_m.removeClass('make-transparent');
            TweenMax.to($mobile_nav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
        }
    });


}); //Document
