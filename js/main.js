$(document).ready(function(){

    $pseudo_body = $('#pseudo-body');
    $nav_btn = $('.nav-btn');
    $nav_dropdown_desktop = $('.nav-dropdown-desktop');
    $nav_btn_m = $('.nav-btn-m');
    $mobile_nav = $('#mobile-nav');

    function closeNav(){
        setTimeout(function(){
            $nav_btn.removeClass('nav-btn-transition');
        }, 1000);
        TweenMax.to($nav_dropdown_desktop, 0.2, {y: -100, opacity: 1, delay:1, onComplete: navbarOrigin});

    };

    function closeNavMobile(){
        $nav_btn_m.removeClass('make-transparent');
        TweenMax.to($mobile_nav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
    }

    $pseudo_body.on('click', function(){
        if($nav_dropdown_desktop.hasClass('hide-me') == false){
            $nav_btn.removeClass('nav-btn-transition');
            TweenMax.to($nav_dropdown_desktop, 0.2, {y: -100, opacity: 1, onComplete: navbarOrigin});
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

    // Returns navbar to origginal position
    var navbarOrigin = function(){
        $nav_dropdown_desktop.addClass('hide-me');
        TweenMax.to($nav_dropdown_desktop, 0, {y: 0});
    }

    $nav_btn.on('click', function(){
        if($nav_dropdown_desktop.hasClass('hide-me')){
            $nav_dropdown_desktop.removeClass('hide-me');
            $nav_btn.addClass('nav-btn-transition');
            TweenMax.from($nav_dropdown_desktop, 0.2, {y: -100, opacity: 0});
        }
        else{
            $nav_btn.removeClass('nav-btn-transition');
            TweenMax.to($nav_dropdown_desktop, 0.2, {y: -100, opacity: 1, onComplete: navbarOrigin});
        }
    });

    function noDisplay(){
        $mobile_nav.addClass('no-display');
    }

     // Returns navbar to origginal position
     var navbarOriginMobile = function(){
        $mobile_nav.addClass('no-display');
        TweenMax.to($mobile_nav, 0, {opacity: 1, scale: 1});
    }

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
