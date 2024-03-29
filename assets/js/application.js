//random headline combinations



  var adjective = [
    'Creative', 
    'Futuristic', 
    'Game', 
    'Interaction', 
    'New Media', 
    'Humble',
    'Firm'
  ];

  var noun = [
    'Technologist', 
    'Designer', 
    'Artist', 
    'Architect', 
    'Inventionist', 
    'Coder',
    'Reader'
  ];

$(document).ready(function() {

    //http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
    var uniqueRandoms = [];
    var numRandoms = 7;
    function makeUniqueRandom() {
        // refill the array if needed
        if (!uniqueRandoms.length) {
            for (var i = 0; i < numRandoms; i++) {
                uniqueRandoms.push(i);
            }
        }
        var index = Math.floor(Math.random() * uniqueRandoms.length);
        var val = uniqueRandoms[index];

        // now remove that value from the array
        uniqueRandoms.splice(index, 1);

        return val;

    }

    //from http://stackoverflow.com/questions/5248721/jquery-replacewith-fade-animate
    function switchAdj() {
      $('.adjective-loop').fadeOut(100, function(){
        var nextAdj = $('<span class="adjective-loop">' + adjective[makeUniqueRandom()] + '</span>').hide();
        $(this).replaceWith(nextAdj);
        $('.adjective-loop').fadeIn(100);
      });
    }
    function switchNoun() {
      $('.noun-loop').fadeOut(100, function(){
        var nextNoun = $('<span class="noun-loop">' + noun[makeUniqueRandom()] + '</span>').hide();
        $(this).replaceWith(nextNoun);
        $('.noun-loop').fadeIn(100);
      });
    }

    setInterval(switchAdj, 4444);
    setInterval(switchNoun, 3250);


    $('.fr-navbar').localScroll({duration:800});
});
















/**
 * jQuery.LocalScroll
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 *
 * @projectDescription Animated scrolling navigation, using anchors.
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.2.7
 *
 * @id jQuery.fn.localScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @example $('ul.links').localScroll();
 *
 * @example $('ul.links').localScroll({ filter:'.animated', duration:400, axis:'x' });
 *
 * @example $.localScroll({ target:'#pane', axis:'xy', queue:true, event:'mouseover' });
 *
 * Notes:
 *  - The plugin requires jQuery.ScrollTo.
 *  - The hash of settings, is passed to jQuery.ScrollTo, so the settings are valid for that plugin as well.
 *  - jQuery.localScroll can be used if the desired links, are all over the document, it accepts the same settings.
 *  - If the setting 'lazy' is set to true, then the binding will still work for later added anchors.
  * - If onBefore returns false, the event is ignored.
 **/
;(function( $ ){
  var URI = location.href.replace(/#.*/,''); // local url without hash

  var $localScroll = $.localScroll = function( settings ){
    $('body').localScroll( settings );
  };

  // Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
  // @see http://flesler.demos.com/jquery/scrollTo/
  // The defaults are public and can be overriden.
  $localScroll.defaults = {
    duration:1000, // How long to animate.
    axis:'y', // Which of top and left should be modified.
    event:'click', // On which event to react.
    stop:true, // Avoid queuing animations 
    target: window, // What to scroll (selector or element). The whole window by default.
    reset: true // Used by $.localScroll.hash. If true, elements' scroll is resetted before actual scrolling
    /*
    lock:false, // ignore events if already animating
    lazy:false, // if true, links can be added later, and will still work.
    filter:null, // filter some anchors out of the matched elements.
    hash: false // if true, the hash of the selected link, will appear on the address bar.
    */
  };

  // If the URL contains a hash, it will scroll to the pointed element
  $localScroll.hash = function( settings ){
    if( location.hash ){
      settings = $.extend( {}, $localScroll.defaults, settings );
      settings.hash = false; // can't be true
      
      if( settings.reset ){
        var d = settings.duration;
        delete settings.duration;
        $(settings.target).scrollTo( 0, settings );
        settings.duration = d;
      }
      scroll( 0, location, settings );
    }
  };

  $.fn.localScroll = function( settings ){
    settings = $.extend( {}, $localScroll.defaults, settings );

    return settings.lazy ?
      // use event delegation, more links can be added later.   
      this.bind( settings.event, function( e ){
        // Could use closest(), but that would leave out jQuery -1.3.x
        var a = $([e.target, e.target.parentNode]).filter(filter)[0];
        // if a valid link was clicked
        if( a )
          scroll( e, a, settings ); // do scroll.
      }) :
      // bind concretely, to each matching link
      this.find('a,area')
        .filter( filter ).bind( settings.event, function(e){
          scroll( e, this, settings );
        }).end()
      .end();

    function filter(){// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
      return !!this.href && !!this.hash && this.href.replace(this.hash,'') == URI && (!settings.filter || $(this).is( settings.filter ));
    }
  };

  function scroll( e, link, settings ){
    var id = link.hash.slice(1),
      elem = document.getElementById(id) || document.getElementsByName(id)[0];

    if ( !elem )
      return;

    if( e )
      e.preventDefault();

    var $target = $( settings.target );

    if( settings.lock && $target.is(':animated') ||
      settings.onBefore && settings.onBefore.call(settings, e, elem, $target) === false ) 
      return;

    if( settings.stop )
      $target.stop(true); // remove all its animations

    if( settings.hash ){
      var attr = elem.id == id ? 'id' : 'name',
        $a = $('<a> </a>').attr(attr, id).css({
          position:'absolute',
          top: $(window).scrollTop(),
          left: $(window).scrollLeft()
        });

      elem[attr] = '';
      $('body').prepend($a);
      location = link.hash;
      $a.remove();
      elem[attr] = id;
    }
      
    $target
      .scrollTo( elem, settings ) // do scroll
      .trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
  }

})( jQuery );






/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 4/09/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.3.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *    The different options for target are:
 *    - A number position (will be applied to all axes).
 *    - A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *    - A jQuery/DOM element ( logically, child of the element to scroll )
 *    - A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *    - A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *    - A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *    - The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *   @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *   @option {Number, Function} duration The OVERALL length of the animation.
 *   @option {String} easing The easing method for the animation.
 *   @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *   @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *   @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *   @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *   @option {Function} onAfter Function to be called after the scrolling ends. 
 *   @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *      $('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *        alert('scrolled!!');                                   
 *      }});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
  
  var $scrollTo = $.scrollTo = function( target, duration, settings ){
    $(window).scrollTo( target, duration, settings );
  };

  $scrollTo.defaults = {
    axis:'xy',
    duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
    limit:true
  };

  // Returns the element that needs to be animated to scroll the window.
  // Kept for backwards compatibility (specially for localScroll & serialScroll)
  $scrollTo.window = function( scope ){
    return $(window)._scrollable();
  };

  // Hack, hack, hack :)
  // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
  $.fn._scrollable = function(){
    return this.map(function(){
      var elem = this,
        isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

        if( !isWin )
          return elem;

      var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
      
      return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
        doc.body : 
        doc.documentElement;
    });
  };

  $.fn.scrollTo = function( target, duration, settings ){
    if( typeof duration == 'object' ){
      settings = duration;
      duration = 0;
    }
    if( typeof settings == 'function' )
      settings = { onAfter:settings };
      
    if( target == 'max' )
      target = 9e9;
      
    settings = $.extend( {}, $scrollTo.defaults, settings );
    // Speed is still recognized for backwards compatibility
    duration = duration || settings.duration;
    // Make sure the settings are given right
    settings.queue = settings.queue && settings.axis.length > 1;
    
    if( settings.queue )
      // Let's keep the overall duration
      duration /= 2;
    settings.offset = both( settings.offset );
    settings.over = both( settings.over );

    return this._scrollable().each(function(){
      // Null target yields nothing, just like jQuery does
      if (target == null) return;

      var elem = this,
        $elem = $(elem),
        targ = target, toff, attr = {},
        win = $elem.is('html,body');

      switch( typeof targ ){
        // A number will pass the regex
        case 'number':
        case 'string':
          if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
            targ = both( targ );
            // We are done
            break;
          }
          // Relative selector, no break!
          targ = $(targ,this);
          if (!targ.length) return;
        case 'object':
          // DOMElement / jQuery
          if( targ.is || targ.style )
            // Get the real position of the target 
            toff = (targ = $(targ)).offset();

      }
      $.each( settings.axis.split(''), function( i, axis ){
        var Pos = axis == 'x' ? 'Left' : 'Top',
          pos = Pos.toLowerCase(),
          key = 'scroll' + Pos,
          old = elem[key],
          max = $scrollTo.max(elem, axis);

        if( toff ){// jQuery / DOMElement
          attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

          // If it's a dom element, reduce the margin
          if( settings.margin ){
            attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
            attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
          }
          
          attr[key] += settings.offset[pos] || 0;
          
          if( settings.over[pos] )
            // Scroll to a fraction of its width/height
            attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
        }else{ 
          var val = targ[pos];
          // Handle percentage values
          attr[key] = val.slice && val.slice(-1) == '%' ? 
            parseFloat(val) / 100 * max
            : val;
        }

        // Number or 'number'
        if( settings.limit && /^\d+$/.test(attr[key]) )
          // Check the limits
          attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

        // Queueing axes
        if( !i && settings.queue ){
          // Don't waste time animating, if there's no need.
          if( old != attr[key] )
            // Intermediate animation
            animate( settings.onAfterFirst );
          // Don't animate this axis again in the next iteration.
          delete attr[key];
        }
      });

      animate( settings.onAfter );      

      function animate( callback ){
        $elem.animate( attr, duration, settings.easing, callback && function(){
          callback.call(this, target, settings);
        })
      }

    }).end();
  };
  
  // Max scrolling position, works on quirks mode
  // It only fails (not too badly) on IE, quirks mode.
  $scrollTo.max = function( elem, axis ){
    var Dim = axis == 'x' ? 'Width' : 'Height',
      scroll = 'scroll'+Dim;
    
    if( !$(elem).is('html,body') )
      return elem[scroll] - $(elem)[Dim.toLowerCase()]();
    
    var size = 'client' + Dim,
      html = elem.ownerDocument.documentElement,
      body = elem.ownerDocument.body;

    return Math.max( html[scroll], body[scroll] ) 
       - Math.min( html[size]  , body[size]   );
  };

  function both( val ){
    return typeof val == 'object' ? val : { top:val, left:val }
  }

})( jQuery );






// // NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// // IT'S ALL JUST JUNK FOR OUR DOCS!
// // ++++++++++++++++++++++++++++++++++++++++++

// /*!
//  * JavaScript for Bootstrap's docs (http://getbootstrap.com)
//  * Copyright 2011-2014 Twitter, Inc.
//  * Licensed under the Creative Commons Attribution 3.0 Unported License. For
//  * details, see http://creativecommons.org/licenses/by/3.0/.
//  */


// !function ($) {

//   $(function () {

//     // IE10 viewport hack for Surface/desktop Windows 8 bug
//     //
//     // See Getting Started docs for more information
//     if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
//       var msViewportStyle = document.createElement('style')
//       msViewportStyle.appendChild(
//         document.createTextNode(
//           '@-ms-viewport{width:auto!important}'
//         )
//       )
//       document.querySelector('head').appendChild(msViewportStyle)
//     }


//     var $window = $(window)
//     var $body   = $(document.body)

//     var navHeight = $('.navbar').outerHeight(true) + 10

//     $body.scrollspy({
//       target: '.bs-docs-sidebar',
//       // offset: navHeight
//     })

//     $window.on('load', function () {
//       $body.scrollspy('refresh')
//     })

//     $('.bs-docs-container [href=#]').click(function (e) {
//       e.preventDefault()
//     })

//     // back to top
//     setTimeout(function () {
//       var $sideBar = $('.bs-docs-sidebar')

//       $sideBar.affix({
//         offset: {
//           top: function () {
//             var offsetTop      = $sideBar.offset().top
//             var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
//             var navOuterHeight = $('.bs-docs-nav').height()

//             return (this.top = offsetTop - navOuterHeight - sideBarMargin)
//           },
//           bottom: function () {
//             return (this.bottom = $('.bs-docs-footer').outerHeight(true))
//           }
//         }
//       })
//     }, 100)

//     setTimeout(function () {
//       $('.bs-top').affix()
//     }, 100)

//     // tooltip demo
//     $('.tooltip-demo').tooltip({
//       selector: '[data-toggle=tooltip]',
//       container: 'body'
//     })

//     $('.tooltip-test').tooltip()
//     $('.popover-test').popover()

//     $('.bs-docs-navbar').tooltip({
//       selector: 'a[data-toggle=tooltip]',
//       container: '.bs-docs-navbar .nav'
//     })

//     // popover demo
//     $('[data-toggle=popover]').popover()

//     // button state demo
//     $('#loading-example-btn')
//       .click(function () {
//         var btn = $(this)
//         btn.button('loading')
//         setTimeout(function () {
//           btn.button('reset')
//         }, 3000)
//       })
//   })

// }(jQuery)
