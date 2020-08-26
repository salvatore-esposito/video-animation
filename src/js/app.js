
var VideoMotion = function(options) {

  let step = function(timestamp) {
    if (!ObjectParams.start) ObjectParams.start = timestamp;
    var progress = timestamp -   ObjectParams.start;

    ObjectParams.element.style.opacity = ObjectParams.startValue + progress *
                                        (ObjectParams.finalValue-ObjectParams.startValue)/ObjectParams.time;

    if (progress < ObjectParams.time) {
      opacityAnimationRequest = window.requestAnimationFrame(step);
    }
  },
  opacityAnimation = function (element, startValue, finalValue, time)
  {

    ObjectParams = {
      start: null,
      element : element,
      startValue: startValue,
      finalValue: finalValue,
      time: time
    };
    let animation = window.requestAnimationFrame(step.bind(ObjectParams));
  },
   baseElements = document.querySelector('#video-background').children,
   subElements = {},
   subElementsLength = baseElements.length;
   var defaultOptions = {
     opacity : {
       start : 0,
       final : 0.75,
       color : 'black'
     },
     text : {
       start: 0,
       final: 1,
       duration: 2000
     }
   };

   for (let i = 0; i < subElementsLength; i++) {
    subElements[baseElements[i].className.split("__")[1]] = baseElements[i];
   }

    var mergeOptions= function(defaultOptions, customOptions)
       {
         for (var prop in customOptions) {
           if (defaultOptions.hasOwnProperty(prop)) {
             if(typeof defaultOptions[prop] === 'object'){
               mergeOptions(defaultOptions[prop], customOptions[prop]);
             }
             else {
               defaultOptions[prop] = customOptions[prop];
             }
           }
         }
       };

    if(options) mergeOptions(defaultOptions, options);

  subElements.video.addEventListener( 'play', function() {
    subElements.opacity.style.backgroundColor = defaultOptions.opacity.color;
    subElements.opacity.style.opacity = defaultOptions.opacity.start;

    subElements.text.style.opacity = defaultOptions.text.start;

    const duration = subElements.video.duration;

    opacityAnimation(subElements.opacity, subElements.opacity.style.opacity, defaultOptions.opacity.final, 1000*duration);
  });

  subElements.video.addEventListener( 'ended', function(){
     opacityAnimation(subElements.text, subElements.text.style.opacity, defaultOptions.text.final, defaultOptions.text.duration);
  });

};

VideoMotion({ opacity : {
   start : 0,
   final : 0.75,
   color : 'orange',
 }});
