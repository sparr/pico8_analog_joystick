// ====== [CONFIGURATION] - tailor to your specific needs

// These flags control whether or not different types of buttons should
// be mapped to PICO-8 O and X buttons.
var mapFaceButtons = true;
var mapShoulderButtons = true;
var mapTriggerButtons = false;
var mapStickButtons = false;

// How far you have to pull an analog stick before it register as a PICO-8 d-pad direction
var stickDeadzone = 0.05;

// ====== [IMPLEMENTATION]

// Array through which we'll communicate with PICO-8.
var pico8_buttons = [0,0,0,0,0,0,0,0];

// Ensure PICO-8 can't see the real gamepads.

// Start polling gamepads (if supported by browser)
if (navigator.getGamepads) {
  navigator._getGamepads = navigator.getGamepads;
  navigator.getGamepads = function() { return [] };
	requestAnimationFrame(updateGamepads);
}

// Workhorse function, updates pico8_buttons once per frame.
function updateGamepads() {
  var gamepads = navigator._getGamepads ? navigator._getGamepads() : [];
  if (!gamepads[0]) {
    requestAnimationFrame(updateGamepads);
    return;
  }
  // Reset the array.
  for (var p = 0; p < 8; p++)
  	pico8_buttons[p] = 0;
  // Gather input from all known gamepads.
  var xo_bitmask = 0;
  var gp = gamepads[0];
  var pressedO =
    (mapFaceButtons && (btn(gp,0) || btn(gp,2))) ||
    (mapShoulderButtons && btn(gp,5)) ||
    (mapTriggerButtons && btn(gp,7)) ||
    (mapStickButtons && btn(gp,11));
  var pressedX =
    (mapFaceButtons && (btn(gp,1) || btn(gp,3))) ||
    (mapShoulderButtons && btn(gp,4)) ||
    (mapTriggerButtons && btn(gp,6)) ||
    (mapStickButtons && btn(gp,10));
  xo_bitmask |= pressedO ? 16 : 0;
  xo_bitmask |= pressedX ? 32 : 0;
  var left = Math.floor(
      btn(gp,14) ? 255 :
      (axis(gp,0) < -stickDeadzone ? (axis(gp,0) + stickDeadzone) : axis(gp,2) < -stickDeadzone ? (axis(gp,2) + stickDeadzone) : 0)
      /
      (stickDeadzone - 1) * 255
    );
  var right = Math.floor(
      btn(gp,15) ? 255 :
      (axis(gp,0) > stickDeadzone ? (axis(gp,0) - stickDeadzone) : axis(gp,2) > stickDeadzone ? (axis(gp,2) - stickDeadzone) : 0)
      /
      (1 - stickDeadzone) * 255
    );
  var up = Math.floor(
      btn(gp,12) ? 255 :
      (axis(gp,1) < -stickDeadzone ? (axis(gp,1) + stickDeadzone) : axis(gp,3) < -stickDeadzone ? (axis(gp,3) + stickDeadzone) : 0)
      /
      (stickDeadzone - 1) * 255
    );
  var down = Math.floor(
      btn(gp,13) ? 255 :
      (axis(gp,1) > stickDeadzone ? (axis(gp,1) - stickDeadzone) : axis(gp,3) > stickDeadzone ? (axis(gp,3) - stickDeadzone) : 0)
      /
      (1 - stickDeadzone) * 255
    );
  for (var i = 7; i >= 0; i--) {
    pico8_buttons[i] |= xo_bitmask;
    pico8_buttons[i] |= (left  & 1) * 1;
    pico8_buttons[i] |= (right & 1) * 2;
    pico8_buttons[i] |= (up    & 1) * 4;
    pico8_buttons[i] |= (down  & 1) * 8;
    left  = left  >> 1
    right = right >> 1
    up    = up    >> 1
    down  = down  >> 1
  }

  requestAnimationFrame(updateGamepads);
}

// Helpers for accessing gamepad
function axis(gp,n) { return gp.axes[n] || 0.0; }
function btn(gp,b) { return gp.buttons[b] ? gp.buttons[b].pressed : false; }
