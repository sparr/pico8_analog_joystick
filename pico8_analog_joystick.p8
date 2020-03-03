pico-8 cartridge // http://www.pico-8.com
version 18
__lua__
-- analog joystick library
-- by sparr

-- analog button input
-- abtn(4) and abtn(5) poll x and o for player 1
-- abtn(0) through abtn(3) return an analog value 0.0-1.0
local function abtn(i)
 if (i>3) return btn(i)
 local val = 0
 for p = 0, 7 do
  val = val + shr(btn(i, p) and 1 or 0,p)
 end
 return shl(val, 7) / 255
end
