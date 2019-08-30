var cx, cv;
var currentMap = null;
var sprMono, sprTerrain;

var SQ_HEIGHT = 16;
var SQ_WIDTH  = 16;
var SRC_WIDTH = 16;
var SRC_HEIGHT = 16;

var WIDTH  = 534;
var HEIGHT = 330;

var VIEW_WIDTH = 25;
var VIEW_HEIGHT = 18;

var DIR_UP = 1;
var DIR_LEFT = 2;
var DIR_RIGHT = 3;
var DIR_DOWN = 4;

var LEFT = 0, RIGHT = 1, UP = 2, DOWN = 3;
var AXIS_X = 4, AXIS_Y = 5;

var INTERVAL = 20;
var MOVE_DELAY = 200;

var MONO_WIDTH = 16;
var MONO_HEIGHT = 32;
var MONO_SPR_ACT = 0;

var HAS_WARP = 2;
var DRAW_AFTER = 4;

var COLOR_HEX_BLACK = '#000';

// Debug options
var RED_LIMITS = false;
var SHOW_GRID  = false;
var SHOW_EDITOR = true;

/*
var Map = {
  SPRITE: 1,
  LIMIT: 2,
  WARP: 3,
  width: 100,
  height: 100,
  sprites: [],
  limits: [],
  warps: [],
  get: function(type, x, y) {
    var ar;
    if(type === this.SPRITE) {
      ar = this.sprites;
    }
    if(type === this.LIMIT) {
      ar = this.limits;
    }
    if(type === this.WARP) {
      ar = this.warps;
    }
    return ar[x + y * this.width];
  }
};
*/

var maps = [
  {
    name: 'house_1',
    defaultSpawn: {x: 5, y: 5},
    width: 11, height: 13,
    limits: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 0, 2, 0, 1, 1, 1, 0
    ],
    sprites: [
      0,1,1,1,1,1,1,1,1,1,2,
      3,4,4,4,5,6,7,4,4,4,8,
      3,9,9,9,10,11,12,9,9,9,8,
      3,13,13,13,14, 15, 16, 13, 13, 13, 8,
      3,17,17,17,18, 19, 20, 17, 17, 17, 8,
      3,21,21,22,22,22,21,21,23,24,8,
      25,26,27,27,27,27,27,27,28,29,8,
      42,30,27,27,31,32,33,27,40,41,8,
      3,43,27,27,34,35,36,27,44,45,8,
      3,46,27,27,37,38,39,27,53,53,8,
      3,22,27,27,27,27,27,27,27,27,8,
      3,22,27,27,47,48,49,27,27,27,8,
      25,51,51,51,54,15,55,51,51,51,52
    ],
    warps: [
      {x: 5, y: 11, mapName: 'house_2'}
    ]
  },
  {
    name: 'house_2',
    defaultSpawn: {x: 5, y: 5},
    width: 15, height: 13,
    limits: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0
    ],
    sprites: [
      0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x02, 27, 27, 27, 27,
      0x03, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x08, 27, 27, 27, 27,
      0x03, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x09, 0x08, 27, 27, 27, 27,
      0x03, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x0D, 0x08, 27, 27, 27, 27,
      0x03, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x08, 27, 27, 27, 27,
      3, 21,21,22,22,22,21,21,53,53, 27, 27, 27, 27, 8,
      25,26,27,27,27,27,27,27,53,53, 27, 27, 27, 27, 8,
      42,30,27,27,31,32,33,27,53,53, 27, 27, 27, 27, 8,
      3,43,27,27,34,35,36,27, 27,27, 27, 27, 27, 27, 8,
      3,46,27,27,37,38,39,27, 27,27, 27, 27, 27, 27, 8,
      3,22,27,27,27,27,27,27,27,27, 27, 27, 27, 27, 8, 
      3,22,27,27,47,48,49,27,27,27, 27, 27, 27, 27, 8,
      25,51,51,51,54,15,55,51,51,51, 27, 27, 27, 27, 52
    ],
    warps: [
      //{x: 5, y: 11, mapName: 'house_2'}
    ]
  }
];

var mapWidth = 11, mapHeight = 13;
var mapOpacity = 1.0, isMapFading = false;
var map = maps[0].sprites;
// 0000 0000
// 0 = is available
// 1 = is a warp
// 2 = print over characters
var mapLimit;
var mapWarps;

var mono = {
  x: 5, y: 5,
  'isMoving' : function(what) {
    if(what === AXIS_X) {
      return (this.moving[LEFT] || this.moving[RIGHT])
        ? true: false;
    }
    if(what === AXIS_Y) {
      return (this.moving[UP] || this.moving[DOWN])
        ? true: false;
    }
    return (this.moving[LEFT] || this.moving[RIGHT]
      || this.moving[UP] || this.moving[DOWN])
        ? true : false;
  },
  'moving': [false, false, false, false],
  'moveSpeed' : {'x': 0, 'y': 0},
  'movePhase'  : 0,
  'moveDelayed': 0,
};

var center = {};

var keys = [], totalPressedKeys = 0;

function drawBackground(color) {
  cx.fillStyle = color ? color : COLOR_HEX_BLACK;
  cx.fillRect(0,0,WIDTH,HEIGHT);
}

function drawMap(over) {
  for(var i = 0; i < currentMap.length; i++) {
    if(!over && (mapLimit[i] & DRAW_AFTER) === DRAW_AFTER) {
      continue;
    }
    if(over && (mapLimit[i] & DRAW_AFTER) != DRAW_AFTER) {
      continue;
    }
    var x = i % mapWidth;
    var y = Math.floor(i / mapWidth);
    
    var oct = currentMap[i];

    var xx = (x * SQ_WIDTH) + (WIDTH/2-SQ_WIDTH/2)
        - (mono.x * SQ_WIDTH) - Math.round(mono.movePhase*mono.moveSpeed.x*SQ_WIDTH);
    var yy = (y * SQ_HEIGHT)+ (HEIGHT/2-SQ_HEIGHT/2)
        - (mono.y * SQ_WIDTH) - Math.round(mono.movePhase*mono.moveSpeed.y*SQ_HEIGHT)

    //cx.fillStyle = 'rgb('+oct+','+oct+','+oct+')';
    //cx.fillRect(xx, yy, SQ_WIDTH, SQ_HEIGHT);
    cx.globalAlpha = mapOpacity;
    cx.drawImage(sprTerrain,
      oct*SRC_WIDTH, 0, SRC_WIDTH, SRC_HEIGHT, 
      xx, yy, SQ_WIDTH, SQ_HEIGHT);
    cx.globalAlpha = 1.0;

    if(RED_LIMITS === true && mapLimit[i] === 0) {
      cx.fillStyle = '#f00';
      cx.fillRect(xx, yy, SQ_WIDTH, SQ_HEIGHT);
    }
  }
}

function fadeOutMap() {

}

function checkWarps() {
  var value = mapLimit[mono.x + mono.y * mapWidth];
  if((value & HAS_WARP) === HAS_WARP) {
    for(var i = 0; i < mapWarps.length; i++) {
      if((mapWarps[i].x === mono.x) && (mapWarps[i].y === mono.y)) {
        for(var j = 0; j < maps.length; j++) {
          if(maps[j].name === mapWarps[i].mapName) {
            currentMap = maps[j].sprites;
            mapLimit = maps[j].limits;
            mapWarps = maps[j].warps;
            mapWidth = maps[j].width;
            mapHeight = maps[j].height;
            mono.x = maps[j].defaultSpawn.x;
            mono.y = maps[j].defaultSpawn.y;
            return;
          }
        }
      }
    }
  }
}

function drawCoords() {
  var scord = 'x: ' + mono.x + ' y:' + mono.y;
  var s = cx.measureText(scord);
  cx.fillStyle = '#fff';
  cx.fillText(scord, WIDTH-s.width-10, HEIGHT-10);
}

function drawGrid() {
  cx.strokeStyle = '#c0c0c0';
  for(var x = 1; x < WIDTH / SQ_WIDTH; x++) {
    cx.beginPath();
    cx.moveTo(x*SQ_WIDTH, 0);
    cx.lineTo(x*SQ_WIDTH, HEIGHT);
    cx.lineWidth = 0.3;
    cx.stroke();
  }

  for(var y = 1; y < HEIGHT / SQ_HEIGHT; y++) {
    cx.beginPath();
    cx.moveTo(0, y*SQ_HEIGHT);
    cx.lineTo(WIDTH, y*SQ_HEIGHT);
    cx.lineWidth = 0.3;
    cx.stroke();
  }
  
}

function refresh() {
  drawBackground();
  drawMap();
  drawCoords();
  if(SHOW_GRID === true) {
    drawGrid();
  }
  // Dibujar el personaje
  var spr;
  if(mono.moveDelayed > 0) {
    if(mono.moveDelayed >= (MOVE_DELAY/3)) {
      spr = 1;
    } else if(mono.moveDelayed >= (MOVE_DELAY/2)) {
      spr = 2;
    } else{
      spr = 0;
    }
  } else {
    spr = 0;
  }

  cx.drawImage(sprMono,
    MONO_WIDTH*spr,0,MONO_WIDTH,MONO_HEIGHT,
    WIDTH  / 2 - SQ_WIDTH  / 2,
    HEIGHT / 2 - SQ_HEIGHT / 2 - MONO_HEIGHT / 2,
    MONO_WIDTH,MONO_HEIGHT);

  // over player sprites
  drawMap(true);
}

function time() {

  if(isMapFading === true) {
    mapOpacity -= 0.06;
    if(mapOpacity > 0) {
      refresh();
      return step();
    }
    isMapFading = false;
  } 

  if(mono.isMoving() === false) {
    if(keys[65] === true || keys[97] === true) {
      mono.moving[LEFT] = true;
    }
    if(keys[68] === true || keys[100] === true) {
      mono.moving[RIGHT] = true;
    }
    if(keys[83] === true || keys[115] === true) {
      mono.moving[DOWN] = true;
    }
    if(keys[87] === true || keys[119] === true) {
      mono.moving[UP] = true;
    }
  }

  /*
  if(mono.isMoving(AXIS_X)) {
    if(mono.delayed === 0) {
      if((mono.moving[LEFT] === true && mono.x > 0)
      ||(mono.moving[RIGHT] === true && mono.x < (mapWidth-1)) ) {
        mono.movePhase = 0;
        mono.moveSpeedX = (INTERVAL / MOVE_DELAY)
          * (mono.moving[LEFT] ? -1 : 1);
      } else {
        mono.moving[LEFT]  = false;
        mono.moving[RIGHT] = false;
      }
    } 
    if(mono.moveDelayed >= MOVE_DELAY) {
      mono.moving[(mono.moving[LEFT] === true)
        ? LEFT : RIGHT] = true;
      mono.moveDelayed = 0;
      mono.movePhase   = 0;
      mono.x += (mono.moving[LEFT] === true)
        ? -1 : 1;
    } else {
      mono.moveDelayed = INTERVAL;
      mono.movePhase  += 1;
    }
  }
  */

  if(mono.isMoving() === true) {

    // LEFT
    if((mono.moving[LEFT] === true) && (mono.x > 0)
    && mapLimit[(mono.x-1)+mono.y*mapWidth] >= 1) {
      if(mono.moveDelayed === 0) {
        mono.movePhase = 0;
        mono.moveSpeed.x = -(INTERVAL / MOVE_DELAY);
      }
      if(mono.moveDelayed >= MOVE_DELAY) {
        mono.moving[LEFT] = false;
        mono.moveDelayed = 0;
        mono.movePhase = 0;
        mono.moveSpeed.x = 0;
        mono.x -= 1;
        checkWarps();
      } else {
        mono.moveDelayed += INTERVAL;
        mono.movePhase += 1;
      }
    }

    // RIGHT
    else if((mono.moving[RIGHT] === true) && mono.x < (mapWidth-1)
    && (mapLimit[(mono.x+1)+mono.y*mapWidth] >= 1)) {
      if(mono.moveDelayed === 0) {
        mono.movePhase = 0;
        mono.moveSpeed.x = (INTERVAL / MOVE_DELAY);
      }
      if(mono.moveDelayed >= MOVE_DELAY) {
        mono.moving[RIGHT] = false;
        mono.moveDelayed = 0;
        mono.movePhase = 0;
        mono.moveSpeed.x = 0;
        mono.x += 1;
        checkWarps();
      } else {
        mono.moveDelayed += INTERVAL;
        mono.movePhase += 1;
      }
    }

    // UP
    else if((mono.moving[UP] === true) && (mono.y > 0)
    && (mapLimit[mono.x+(mono.y-1)*mapWidth] >= 1)) {
      if(mono.moveDelayed === 0) {
        mono.movePhase = 0;
        mono.moveSpeed.y = -(INTERVAL / MOVE_DELAY);
      }
      if(mono.moveDelayed >= MOVE_DELAY) {
        mono.moving[UP] = false;
        mono.moveDelayed = 0;
        mono.movePhase = 0;
        mono.moveSpeed.y = 0;
        mono.y += -1;
        checkWarps();
      } else {
        mono.moveDelayed += INTERVAL;
        mono.movePhase += 1;
      }
    }

    // DOWN
    else if((mono.moving[DOWN] === true) && mono.y < (mapHeight-1)
    && (mapLimit[mono.x+(mono.y+1)*mapWidth] >= 1)) {
      if(mono.moveDelayed === 0) {
        mono.movePhase = 0;
        mono.moveSpeed.y = (INTERVAL / MOVE_DELAY);
      }
      if(mono.moveDelayed >= MOVE_DELAY) {
        mono.moving[DOWN] = false;
        mono.moveDelayed = 0;
        mono.movePhase = 0;
        mono.moveSpeed.y = 0;
        mono.y += 1;
        checkWarps();
      } else {
        mono.moveDelayed += INTERVAL;
        mono.movePhase += 1;
      }
    } else {
      mono.moving[LEFT]  = false;
      mono.moving[RIGHT] = false;
      mono.moving[UP]    = false;
      mono.moving[DOWN]  = false;
    }
  }

  // --------------- //
  // ***  DRAW   *** //
  // --------------- //

  // Dibujar el fondo
  refresh();
  step();
}

function step() {
  setTimeout(time, INTERVAL);
  return false;
}

window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'maps/house_1.json', true);
  xhr.onreadystatechange = function() {

  };
  xhr.onload = function() {
    maps[0] = JSON.parse(this.responseText);
    currentMap = maps[0].sprites;
    mapLimit   = maps[0].limits;
    mapWarps   = maps[0].warps;
    mapWidth = maps[0].width;
    mapHeight = maps[0].height;
  };
  xhr.send();

  sprMono = new Image();
  sprMono.src = 'mono2.png';

  sprTerrain = new Image();
  sprTerrain.src = 'terreno.png';

  // Prepare key map
  for(var i = 0; i < 256; i++)
    keys.push(false);

  // Create canvas from js
  cv = document.createElement('canvas');
  cv.width = WIDTH;
  cv.height = HEIGHT;
  document.body.appendChild(cv);

  cx = cv.getContext('2d');

  cx.font = 'Arial 10px';

  currentMap = maps[0].sprites;
  mapLimit   = maps[0].limits;
  mapWarps   = maps[0].warps;

  time();
};

window.onkeydown = function(ev) {
  if(keys[ev.keyCode] === false) {
    keys[ev.keyCode] = true;
    totalPressedKeys += 1;
  }
};

window.onkeyup = function(ev) {
  if(keys[ev.keyCode] === true) {
    keys[ev.keyCode] = false;
    totalPressedKeys -= 1;
  }
};