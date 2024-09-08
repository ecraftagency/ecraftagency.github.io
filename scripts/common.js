window.onload = function() {
  document.getElementById('embed-html').addEventListener('mousedown', handleMouseDown, false);
  document.getElementById('embed-html').addEventListener('mouseup', handleMouseUp, false);
  document.getElementById('embed-html').addEventListener('touchstart', handleTouchStart, false);
  document.getElementById('embed-html').addEventListener('touchend', handleTouchEnd, false);
  FBInstant.initializeAsync()
  .then(onStart);
};

function onStart() {
  loadVideoReward()
  loadFullscreen()
  console.log("finish initialize")
}

function handleTouchStart(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = 'default';
  window.focus();
  window.blur();
}

function handleTouchEnd(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = '';
  window.focus();
  window.blur();
}

function handleMouseDown(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = 'default';
  window.focus();
  window.blur();
}

function handleMouseUp(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = '';
  window.focus();
  window.blur();
}
