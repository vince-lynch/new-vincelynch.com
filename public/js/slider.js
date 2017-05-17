
  var layout_slider = (function() {
  'use-strict';
  // caching 
  var el = $('.layout_slider'),
    indicator = el.find('.indicator'),
    ind = indicator.find('.ind'),
    slideFrame = el.find('.slideFrame'),
    slide = slideFrame.children('.slide'),
    idx = 0,
    idxMax = slide.size() - 1,
    indScale = 1.3,
    anispeed = 0.4,
    animating = false;

  // init ///////////////////////////////////////////////////////////////////////////////////////
  TweenMax.set(ind.eq(0), {
    scale: indScale
  });

  // bind events ////////////////////////////////////////////////////////////////////////////////

  // keyboard event
  document.onkeydown = eventHandler;

  // mouse event 
  //EventListenerCrossBrowsing
  if (document.getElementById('layout_slider').addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.getElementById('layout_slider').addEventListener('mousewheel', eventHandler, false);
    // Firefox
    document.getElementById('layout_slider').addEventListener('DOMMouseScroll', eventHandler, false);
  }
  // IE 6/7/8
  else document.getElementById('layout_slider').attachEvent('onmousewheel', eventHandler);

  // indicator event
  ind.each(function(i) {
    $(this).on('click', function() {
      idx = i;
      moveFrameTo(idx);

      return false;
    });
  });

  // method /////////////////////////////////////////////////////////////////////////////////////
  function eventHandler(e) {
    e = e || window.event;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (delta == 1 || e.keyCode == '38') {
      toPrevSlide();
    }
    if (delta == -1 || e.keyCode == '40') {
      toNextSlide();
    }
    return false;
  }

  // moveFrame 
  function moveFrameTo(idx) {
    var slideSpeed = getSlideSpeed(idx);

    animating = true;
    TweenMax.to(slideFrame, slideSpeed, {
      top: idx * -slide.height(),
      ease: Power3.easeOut,
      onComplete: function() {
        animating = false;
      }
    });
    activeInd(idx);
  }
  // get slide speed -
  function getSlideSpeed(idx) {
    var prevIdx = indicator.find('.ind.active').index(),
      slideSpeed = Math.abs(prevIdx - idx) * anispeed;

    // console.log('from '+ prevIdx, 'to '+ idx, 'slideSpeed'+ slideSpeed);
    return slideSpeed;
  }
  // alert active ind
  function activeInd(idx) {
    var anispeed = 0.1;

    ind.removeClass('active');
    ind.eq(idx).addClass('active');

    // effect -
    TweenMax.to(ind, anispeed, {
      scale: 1
    });
    TweenMax.to(ind.eq(idx), anispeed, {
      scale: indScale
    });
  }
  // toNextSlide
  function toNextSlide() {
    if (!animating) {
      if (idx === idxMax) {
        idx = 0;
      } else {
        idx = idx + 1;
      }
      moveFrameTo(idx);
    }
  }
  // toPrevSlide
  function toPrevSlide() {
    if (!animating) {
      if (idx === 0) {
        idx = idxMax;
      } else {
        idx = idx - 1;
      }
      moveFrameTo(idx);
    }
  }

  // public method //////////////////////////////////////////////////////////////////////////////
  return {
    moveTo: moveFrameTo,
  };
})();