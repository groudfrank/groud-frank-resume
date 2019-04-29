$(document).ready(function(){

    $pseudoBody = $('#pseudo-body');
    $navBtn = $('.nav-btn-d');
    $desktopNav = $('#desktop-nav');
    $navBarContent = $('.navbar-content');
    $navBtnMobile = $('.nav-btn-m');
    $navBtnNubs = $('.nav-btn-nubs');
    $hideable =$('.hideable');
    $mobileNav = $('#mobile-nav');
    $window = $(window);
    $windowWidth = $(window).width();


    // Ensures the pseudo body is displaced to the right width when
    // the size of the browser is changed. This ensures that the 
    // navigation bar hidden beneath is properly exposed.
    $window.on('resize', function(){
        $windowWidth = $window.width();
    });

    // closes the navigation bar and removes transition styling for 
    // the navigation button(DESKTOP).
    function closeNav(){
        nubDetransition();
        pseudoBodyOrigin();

    };

    // closes the navigation bar and removes transition styling for 
    // the navigation button(MOBILE).
    function closeNavMobile(){
        TweenMax.to($mobileNav, 0.2,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
    }
    
    // CSS transitions the nubs on the navigation button.
    function nubTransition(){
        if($navBtnNubs.hasClass("hideable")){
            $navBtnNubs.addClass("transform-nub");
        }
    }

    // Returns nub on the navigation button to their original state
    function nubDetransition(){
        if($navBtnNubs.hasClass("hideable")){
            $navBtnNubs.removeClass("transform-nub");
        }
    }

    // closes the navigation section when the man page content is clicked
    $pseudoBody.on('click', function(){
        if($desktopNav.hasClass('navigation-closed') == false){
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
              }, 900, function(){
                window.location.hash = hash;
                // close mdesktop navigation element after animation
                closeNav();
              });
            } 
          });

    // Returns navbar to original position
    var pseudoBodyOrigin = function(){
        $desktopNav.addClass('navigation-closed');
        TweenMax.to($pseudoBody, 0.2, {x: 0});
    }

    // On navigation button click(if class is hidden move the )
    // navigation bar into view and change the color of the navigation bar
    // icon.
    $navBtn.on('click', function(){
        if($desktopNav.hasClass('navigation-closed')){
            $desktopNav.removeClass('navigation-closed');
            nubTransition();
            TweenMax.to($pseudoBody, 2.4, {ease: Elastic.easeOut.config(1, 0.3), x: ($windowWidth * 0.23)});
        }
        else{
            nubDetransition();
            pseudoBodyOrigin();
        }
    });

     // Returns navbar to original position
     var navbarOriginMobile = function(){
        $mobileNav.addClass('no-display');
        TweenMax.to($mobileNav, 0, {opacity: 1, scale: 1});
    }


    // Mobile navigation bar transition.
    $navBtnMobile.on('click', function(){
        if($mobileNav.hasClass('no-display')){
            $mobileNav.removeClass('no-display');
            TweenMax.from($mobileNav, 0.05,{opacity: 0, scale: 0.9});
        }
        else{
            TweenMax.to($mobileNav, 0.05,{opacity: 0, scale: 0.9, onComplete:navbarOriginMobile});
        }
    });

    // Page button code that toggles hidden content
    $('.pg-btn').on('click', function(){
        $currentPageBtn = $(this);

        // Targets the .resizable-container class
        $resizableContainer = $currentPageBtn.siblings('.resizable-container');
        // Targets the special-seperator class
        $fadingDivider = $currentPageBtn.siblings('.special-seperator');

        // Opens and closes hiden content as necessary
        if($resizableContainer.hasClass('close-content')){
            $fadingDivider.removeClass('close-divider');
            $resizableContainer.removeClass('close-content');
            $currentPageBtn.text('Hide content');
        }
        else{
            $resizableContainer.addClass('close-content');
            $fadingDivider.addClass('close-divider');
            $currentPageBtn.text('Show content');

            // $(".pg-btn").on('click', function(event) {
        
            //     if (this.hash !== "") {
                
            //       event.preventDefault();
            //       var hash = this.hash;
            
            //       $('html, body').animate({
            //         scrollTop: $(hash).offset().top
            //       }, 800, function(){
            //         window.location.hash = hash;
            //       });
            //     } 
            //   });
            
        }
    })


}); //Document