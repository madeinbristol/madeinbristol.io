
/* =======      FOR DOCUMENT LOAD             ====== */

$( document ).ready( function () {

	$('.btn--flipper').on('click', function(){
		$('.feature').toggleClass('active');
	});
	console.log('%c🤖 - Hello-o-o-o-o.  If you\'re interested in what makes me tick, you will love going down to the next Made in Bristol meetup!', 'font-size:60px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* Preloader */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
        
    var support = { animations : Modernizr.cssanimations },
        container = document.getElementById( 'bigWrapper' ),
        header = container.querySelector( '.ip-header' ),
        intro = $("feature"),
        animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
        // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
    if(intro != null){
        var loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) );
    }

    function init() {
        var onEndInitialAnimation = function() {
            if( support.animations ) {
                this.removeEventListener( animEndEventName, onEndInitialAnimation );
            }

            startLoading();
        };

        // disable scrolling
        window.addEventListener( 'scroll', noscroll );

        // initial animation
        
        $('#bigWrapper').addClass('loading');

        if( support.animations ) {
            container.addEventListener( animEndEventName, onEndInitialAnimation );
        }
        else {
            onEndInitialAnimation();
        }
    }
    
    function startLoading() {
        // simulate loading something..
        var simulationFn = function(instance) {
            var progress = 0,
                interval = setInterval( function() {

                    progress = Math.min( progress + Math.random() * 0.1, 1 );

                    instance.setProgress( progress );
                    console.log( '-> '+ progress + ' <-');
                    // reached the end
                    if( progress === 1 ) {
                        $('#bigWrapper').removeClass('loading');
                        $('#bigWrapper').addClass('loaded');
                        clearInterval( interval );

                        var onEndHeaderAnimation = function(ev) {
                            if( support.animations ) {
                                if( ev.target !== header ) return;
                                this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                            }

                            $('body').addClass('layout-switch');
                            window.removeEventListener( 'scroll', noscroll );

                        };

                        if( support.animations ) {
                            header.addEventListener( animEndEventName, onEndHeaderAnimation );
                        }
                        else {
                            onEndHeaderAnimation();
                        }

                    }
                }, 80 );
        };

        var loadprog = function(instance){

            var $imgs = $('img'),
                progress = 0,
                totalimages = $imgs.length,
                increment = 1/totalimages;

            function countHome(){
                totalHome++;
                if(totalHome >= totalimages){
                    // we're done;
                }
            }   
            var stop = false;
            $imgs.one("load", function() {
                progress =  Math.round((progress+increment)*100)/100 ;
                if(progress > 1){
                    progress = 1;
                }
                instance.setProgress( progress );
                console.log(progress);
                if( progress === 1 && !stop) {
                    stop = true;
                    var interval = setInterval( function() {
                        if(document.readyState === "complete"){
                            $('#bigWrapper').removeClass('loading');
                            $('#bigWrapper').addClass('loaded');

                            clearInterval( interval );

                            var onEndHeaderAnimation = function(ev) {
                                if( support.animations ) {
                                    if( ev.target !== header ) return;
                                    this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                                }

                                $('body').addClass('layout-switch');
                                window.removeEventListener( 'scroll', noscroll );

                            };

                            if( support.animations ) {
                                header.addEventListener( animEndEventName, onEndHeaderAnimation );
                            }
                            else {
                                onEndHeaderAnimation();
                            }


                            setTimeout(function() {
                                window.removeEventListener( 'scroll', noscroll );
                                $('.feature').toggleClass('active');
                            }, 600);


                        }
                    }, 25 );
                }
            }).each(function() {
              if(this.complete) $(this).load();
            });

        };

        loader.setProgressFn( loadprog );
    }
    
    function noscroll() {
        window.scrollTo( 0, 0 );
    }


    //launch the page loader
    init();


});

