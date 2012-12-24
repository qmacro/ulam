/**
* Ulam Spirals
* See http://en.wikipedia.org/wiki/Ulam_spiral
*
* Main function is ulam(w, h, x, y)
* 
* Note: w, h, (p)x and (p)y are all values that
*       start at 1, not 0. Coordinate 1,1 is in
*       the top left corner.
*/

/** 
* Width (w) and height (h) of a spiral matrix must be 
* either the same, or the height may be one less than
* the width. So 2x2, 3x2, 3x3 and 4x3 are valid
* but 3x4 is not.
*/
function validWidthAndHeight_(w, h) {
  return w == h || w == h + 1;
}

/**
* The specified px and py coordinates must lie within
* the chosen w x h spiral matrix, obviously.
*/
function validXandYCoords_(w, h, px, py) {
  return px > 0 && px <= w && py > 0 && py <= h;
}

/**
* Given the width and height of the chosen spiral matrix
* we need to determine where to start drawing the spiral.
* In the example 5x5 matrix below, the start (1) is at 
* coordinate 3,3.
*
*/
function determineStartCoords_(w, h) {
  return [Math.floor(w / 2) + (w % 2), Math.floor(h / 2) + 1];
}

/**
* - Work out starting position for '1'
* - Assume anticlockwise, 1st move to the right
* - pattern is: (Move <count>, turn 'left') x 2
* - where <count> is 1, 2, 3 etc
*
* Example 5x5 spiral matrix:
*
* 17 16 15 14 13
* 18  5  4  3 12
* 19  6  1  2 11
* 20  7  8  9 10
* 21 22 23 24 25
*
*/
function ulam(w, h, px, py) {
  if (! validWidthAndHeight_(w, h)) {
    console.log("Invalid W and H combination");
    return;
  }
  if (! validXandYCoords_(w, h, px, py)) {
    console.log("Invalid PX and PY combination");
    return;
  }
  var startCoords = determineStartCoords_(w, h);
  var x = startCoords[0], y = startCoords[1];

  var value = 1; // the value that increments (1, 2, 3 etc)
  var count = 1; // represents the <count> in the comment above

  // Starting directions, and previous directions
  var xdir = +1, ydir = 0;
  var xdirprev = +1, ydirprev = +1;

  do {

    // Do twice
    for (var i = 0; i < 2; i++) {

      // Do <count> times
      for (var c = 0; c < count; c++) {

        // Are we at the desired coords?
        if (x == px && y == py) return value;
        
        // Increment value
        value++;

        // Move
        x += xdir;
        y += ydir;

      }

      // Adjust direction
      if (xdir == 0) { xdir = xdirprev * -1; ydirprev = ydir; ydir = 0; } 
      else { ydir = ydirprev * -1; xdirprev = xdir; xdir = 0; }

    }

    count++;

  // Failsafe!
  } while (value < 9999999);

}
