# PICO-8 Analog Joystick

This script will take input from one analog gamepad/joystick and present it to PICO-8 as binary d-pad input from 8 virtual controllers.
The matching lua function will then decode this into analog input within your pico8 cartridge.

![animation of analog movement on screen](https://github.com/sparr/pico8_analog_joystick/blob/master/pico8_analog_joystick.gif?raw=true)

## Usage

* Drop [pico8_analog_joystick.js](https://raw.githubusercontent.com/sparr/pico8_analog_joystick/master/pico8_analog_joystick.js) in the same directory with your game's HTML and JS.
* In your HTML file, add the following, right before the first `<script type="text/javascript">` tag:

```
  <script src="pico8_analog_joystick.js"></script>
```

* In your p8 cart, copy the [`abtn`](https://github.com/sparr/pico8_analog_joystick/blob/master/pico8_analog_joystick.p8#L7-L17) function, then use it in place of `btn` to get analog values from 0 to 1 instead of boolean false/true.

## Configuration

If you like, you can edit the configuration at the top of `pico8_analog_joustick.js` to suit your needs (defaults should be fine most of the time):

* `mapXXX` - you can choose whether different types of buttons on the controller should be mapped to PICO-8's O and X
* `stickDeadzone` - controls how far you have to push an analog stick for it to register as non-zero input.
