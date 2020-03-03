This script will take input from one analog gamepad/joystick and present it to PICO-8 as binary d-pad input from 8 virtual controllers.
The matching lua function will then decode this into analog input.

## Usage

* Drop [pico8_analog_joustick.js](https://raw.githubusercontent.com/sparr/pico8_analog_joystick/master/pico8_analog_joystick.js) in the same directory with your game's HTML and JS.
* In your HTML file, add the following, right before the first `<script type="text/javascript">` tag:

```
  <script src="pico8_analog_joystick.js"></script>
```

* In your p8 cart, copy the [`abtn`](https://raw.githubusercontent.com/sparr/pico8_analog_joystick/master/pico8_analog_joystick.p8) function, the use it in place of `btn` to get analog values from 0 to 1 instead of boolean false/true.

## Configuration

If you like, you can edit the configuration at the top of `pico8_analog_joustick.js` to suit your needs (defaults should be fine most of the time):

* `mapXXX` - you can choose whether different types of buttons on the controller should be mapped to PICO-8's O and X
* `stickDeadzone` - controls how far you have to push an analog stick for it to register as non-zero input.

## License: zlib license

Copyright (c) 2020 Clarence "Sparr" Risher
Copyright (c) 2016 Jakub Wasilewski

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgement in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
