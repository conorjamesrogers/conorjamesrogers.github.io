const css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ScrollMagic from 'scrollmagic';
// import 'animation.gsap';


ReactDOM.render(
    <p> </p>,
    document.getElementById('root')
);

// init controller
var controller = new ScrollMagic.Controller();

window.onscroll = function() {myFunction()};

var header = $('.header--links');
var sticky = header.offset().top;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.addClass("sticky",500);
        header.removeClass("header--wrapper",500);

    } else {
        header.removeClass("sticky",500);
        header.addClass("header--wrapper",500);

    }
}


// create a scene
new ScrollMagic.Scene({
    // duration: 100   // the scene should last for a scroll distance of 100px
    offset: 15    // start this scene after scrolling for 50px
})
    .setPin(".header--wrapper") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller



//ANIMATIONS
// Create Animation for 0.5s
var tween = TweenMax.to('#animation', 0.5, {
    backgroundColor: 'rgb(255, 39, 46)',
    scale: 7,
    rotation: 360
});

new ScrollMagic.Scene({
    triggerElement: '#canvas',
    offset: 150 /* offset the trigger 150px below #scene's top */
})
    .setTween(tween)
    .addTo(controller);