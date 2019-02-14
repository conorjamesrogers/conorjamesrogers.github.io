const css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
const ScrollMagic = require('ScrollMagic');
require('animation.gsap');
require('debug.addIndicators');
const TimelineMax = require('TimelineMax');



ReactDOM.render(
    <p> </p>,
    document.getElementById('root')
);


$(function(){
    // init controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });
    var navController = new ScrollMagic.Controller;

    // var slides = document.querySelectorAll(".panel");

    // create scene for every slide
    // for (var i = 0; i < slides.length; i++) {
    //     if(slides[i]==='.panel.content'){
    //
    //     }
    //     new ScrollMagic.Scene({
    //         triggerElement: slides[i],
    //
    //     })
    //         .setPin(slides[i])
    //         // .addIndicators() // add indicators (requires plugin)
    //         .addTo(controller);
    // }
        var wipeAnimation = new TimelineMax()
            .fromTo("section.panel.intro", 1, {
                y: "0"
            }, {
                y: "-100%",
                ease: Linear.easeNone
            }) // in from left
            .fromTo("section.panel.content", 1, {
                y: "0"
            }, {
                y: "-100%",
                ease: Linear.easeNone
            })
            .to("section.panel .additional_content", 1, {y: "-100%", ease: Linear.easeNone});// in from left

        // create scene to pin and link animation
        new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "600%"
        })
            .setPin("#pinContainer")
            .setTween(wipeAnimation)
            // .addIndicators() // add indicators (requires plugin)
            .addTo(controller);

        var banner = $('#nav-container');
        new ScrollMagic.Scene({
            triggerElement: 'header',
            triggerHook: 'onLeave',
            duration:0,
            offset: -150
        })
            .setPin('#nav-container')
            .setClassToggle(banner[0], 'fixed')
            .setTween(banner[0], 0.3, {top: 0, ease: Power2.EaseIn})
            // .addIndicators()
            .addTo(controller);


    // change svg to inline...
    activate('img[src*=".svg"]');

    function activate(string){
        jQuery(string).each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');
        });
    }

});

