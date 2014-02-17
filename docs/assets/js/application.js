
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
    'Friend',
    'Reader'
  ];

  $(document).ready(function() {


      //from http://stackoverflow.com/questions/10756119/how-to-genrate-random-numbers-with-no-repeat-javascript
      function randomFrom(array, n) {
        var at = 0;
        var tmp, current, top = array.length;

        if(top) while(--top && at++ < n) {
            current = Math.floor(Math.random() * (top - 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array.slice(-n);
      }

      //from http://stackoverflow.com/questions/5248721/jquery-replacewith-fade-animate
      var adjList = randomFrom(adjective,7);
      function switchAdj() {
        var randomN = Math.floor(Math.random() * adjList.length);
        $('.adjective-loop').fadeOut(100, function(){
          var nextAdj = $('<span class="adjective-loop">' + adjList[randomN] + '</span>').hide();
          $(this).replaceWith(nextAdj);
          $('.adjective-loop').fadeIn(100);
        });
      }
      var nounList = randomFrom(noun,7);
      function switchNoun() {
        var randomN = Math.floor(Math.random() * nounList.length);
        $('.noun-loop').fadeOut(100, function(){
          var nextNoun = $('<span class="noun-loop">' + nounList[randomN] + '</span>').hide();
          $(this).replaceWith(nextNoun);
          $('.noun-loop').fadeIn(100);
        });
      }

      setInterval(switchAdj, 3333);
      setInterval(switchNoun, 4444);
  });












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
