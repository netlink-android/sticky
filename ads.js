var autoplayAllowed = false;
var autoplayRequiresMute = false;
var player;
var wrapperDiv;

function checkUnmutedAutoplaySupport() {
  canAutoplay.video({ timeout: 100, muted: false }).then(function (response) {
    if (response.result === false) {
      // Unmuted autoplay is not allowed.
      checkMutedAutoplaySupport();
    } else {
      // Unmuted autoplay is allowed.
      autoplayAllowed = true;
      autoplayRequiresMute = false;
      initPlayer();
    }
  });
}

function checkMutedAutoplaySupport() {
  canAutoplay.video({ timeout: 100, muted: true }).then(function (response) {
    if (response.result === false) {
      // Muted autoplay is not allowed.
      autoplayAllowed = false;
      autoplayRequiresMute = false;
    } else {
      // Muted autoplay is allowed.
      autoplayAllowed = true;
      autoplayRequiresMute = true;
    }
    initPlayer();
  });
}

function initPlayer() {
  var vjsOptions = {
    autoplay: autoplayAllowed,
    muted: autoplayRequiresMute,
    debug: true,
  };
  var btn_remove = document.getElementById("delete");
  var mainContainer = document.getElementById("mainContainer");
  btn_remove.addEventListener("click", function () {
    mainContainer.style.display = "none";
  });
  player = videojs("content_video", vjsOptions);

  var imaOptions = {
    id: "content_video",
    adTagUrl:
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,52958642/video_outstream_campain&description_url=https%3A%2F%2Fnetlink.vn%2F&tfcd=0&npa=0&sz=1x1%7C300x250%7C640x480%7C1920x1080&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
  };
  player.ima(imaOptions);

  if (!autoplayAllowed) {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)
    ) {
      startEvent = "touchend";
    }

    wrapperDiv = document.getElementById("content_video");
    wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);
  }
}

function initAdDisplayContainer() {
  player.ima.initializeAdDisplayContainer();
  wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
}

var startEvent = "click";
checkUnmutedAutoplaySupport();
