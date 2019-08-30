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
var SHOW_WARPS = true;
var DO_BLINK = false;
var POST_RENDER = true;

/*var maps = [
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
];*/
var maps = [null];

var mapWidth = 11, mapHeight = 13;
var mapOpacity = 1.0, isMapFading = false;
var map = null;
// 0000 0000
// 0 = is available
// 1 = is a warp
// 2 = print over characters
var mapLimit;
var mapWarps;
var currentRX = 0, currentRY = 0;
var currentSprite = 0;
var mapX = 0;
var mapY = 0;
var brushMode = 1; // 1 = sprite, 2 = limit, 3 = over character
var blinkOn = true;

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
  cx.fillRect(0,0, cv.width, cv.height);
}

function drawMap(over) {
  for(var i = 0; i < currentMap.length; i++) {
    var x = i % mapWidth;
    var y = Math.floor(i / mapWidth);
    
    var oct = currentMap[i];

    var xx = mapX + (x * SQ_WIDTH);
    var yy = mapY + (y * SQ_HEIGHT);

    // console.log(oct * SRC_WIDTH);

    cx.drawImage(sprTerrain,
      oct * SRC_WIDTH, 0, SRC_WIDTH, SRC_HEIGHT, 
      Math.floor(xx), Math.floor(yy), SQ_WIDTH, SQ_HEIGHT);

    if(blinkOn === true) {
      if(RED_LIMITS === true && mapLimit[i] === 0) {
        //cx.globalAlpha = 0.2;
        cx.setLineDash([0,0]);
        cx.strokeStyle = '#f00';
        cx.beginPath();
        cx.moveTo(xx, yy);
        cx.lineTo(xx + SQ_WIDTH, yy + SQ_HEIGHT);
        cx.moveTo(xx + SQ_WIDTH, yy);
        cx.lineTo(xx, yy + SQ_HEIGHT);
        cx.stroke();
      }

      if(SHOW_WARPS === true && mapLimit[i] & HAS_WARP) {
        cx.fillStyle = '#0f0';
        cx.globalAlpha = 0.4;
        cx.fillRect(xx, yy, SQ_WIDTH, SQ_HEIGHT);
        cx.globalAlpha = 1.0;
      }

      if(POST_RENDER === true && mapLimit[i] & DRAW_AFTER) {
        cx.strokeStyle = '#00f';
        cx.beginPath();
        cx.moveTo(xx + SQ_WIDTH / 2, yy);
        cx.lineTo(xx + SQ_WIDTH / 2, yy + SQ_HEIGHT);
        cx.moveTo(xx, yy + SQ_HEIGHT / 2);
        cx.lineTo(xx + SQ_WIDTH, yy + SQ_HEIGHT / 2);
        cx.stroke();
      }
    }

    cx.fillStyle = '#f00';
    //cx.fillRect(mapX, mapY, mapWidth * SQ_WIDTH, mapHeight * SQ_HEIGHT);
  }
}

function drawHoverSquare(x, y) {
  cx.globalAlpha = 0.3;
  cx.fillStyle = '#ffffff';
  cx.fillRect(x * SQ_WIDTH + mapX, y * SQ_HEIGHT + mapY, SQ_WIDTH, SQ_HEIGHT);
  cx.globalAlpha = 1.0;
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
  cx.strokeStyle = '#fff';
  cx.setLineDash([1,2]);
  for(var x = 1; x < mapWidth; x++) {
    cx.beginPath();
    cx.moveTo(x * SQ_WIDTH + mapX, mapY);
    cx.lineTo(x * SQ_WIDTH + mapX, mapHeight * SQ_HEIGHT + mapY);
    cx.lineWidth = 1.0;
    cx.stroke();
  }

  for(var y = 1; y < mapHeight; y++) {
    cx.beginPath();
    cx.moveTo(mapX, y * SQ_HEIGHT + mapY);
    cx.lineTo(mapWidth * SQ_WIDTH + mapX, y * SQ_HEIGHT + mapY);
    cx.lineWidth = 1.0;
    cx.stroke();
  }
  
}

function refresh() {
  drawBackground();
  drawMap();
  //drawCoords();
  if(SHOW_GRID === true) {
    drawGrid();
  }
  drawHoverSquare(currentRX, currentRY);
}

function moveOnMap(event) {
  var x = event.clientX - cv.offsetLeft - mapX,
      y = event.clientY - cv.offsetTop - mapY;

  if(x < 0 || y < 0
    || x > mapWidth * SQ_WIDTH
    || y > mapHeight * SQ_HEIGHT
  ) {
    return;
  }
  var rx = Math.floor(x / SQ_WIDTH),
      ry = Math.floor(y / SQ_HEIGHT);
  if(rx == currentRX && ry == currentRY) {
    return;
  }

  currentRX = rx;
  currentRY = ry;
  if(event.buttons === 1) {
    applyBrush();
  }

  refresh();
}

function blink() {
  if(DO_BLINK) {
    blinkOn = !blinkOn;
    refresh();
  }
  setTimeout(blink, 500);
}

function applyBrush() {
  if(brushMode === 1) {
    currentMap[currentRX + currentRY * mapWidth] = currentSprite;
    return refresh();
  }
  if(brushMode === 2) {
    mapLimit[currentRX + currentRY * mapWidth] = 
      mapLimit[currentRX + currentRY * mapWidth] ^ 1;
    return refresh();
  }
  if(brushMode === 3) {
    mapLimit[currentRX + currentRY * mapWidth] = 
      mapLimit[currentRX + currentRY * mapWidth] ^ 4;
  }
}

function mouseDownOnMap(event) {
  applyBrush();
}

function updateMapCoords() {
  mapX = (cv.width / 2) - (mapWidth * SQ_WIDTH / 2);
  mapY = (cv.height / 2) - (mapHeight * SQ_HEIGHT / 2);
}

window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'maps/house_1.json');
  xhr.onload = function() {
    maps[0] = JSON.parse(this.responseText);
    currentMap = maps[0].sprites;
    mapLimit   = maps[0].limits;
    mapWarps   = maps[0].warps;
    mapWidth = maps[0].width;
    mapHeight = maps[0].height;

    document.getElementById('mapWidth').value = mapWidth.toString();
    document.getElementById('mapHeight').value = mapHeight.toString();

    blink();
    refresh();
  };
  xhr.send(null);

  sprMono = new Image();
  sprMono.src = 'mono2.png';

  sprTerrain = new Image();
  sprTerrain.src = 'terreno.png';

  // Prepare key map
  for(var i = 0; i < 256; i++)
    keys.push(false);

  // Create canvas from js
  cv = document.createElement('canvas');
  cv.width = window.innerWidth; // mapWidth * SQ_WIDTH;
  cv.height = window.innerHeight; //mapHeight * SQ_HEIGHT;
  // cv.addEventListener('click', clickOnMap);
  cv.addEventListener('mousemove',  moveOnMap);
  cv.addEventListener('mousedown', mouseDownOnMap);
  document.body.appendChild(cv);

  cx = cv.getContext('2d');
  cx.font = 'Arial 10px';

  updateMapCoords();

  // Prepare editor
  var editor = document.createElement('div');
  editor.style.overflow = 'hidden';
  editor.style.width = '400px';
  editor.style.position = 'fixed';
  editor.style.bottom = '0px';
  editor.style.padding = '15px';
  editor.style.width = '100%';
  for(var i = 0; i < 60; i++) {
    var sq = document.createElement('div');
    sq.style.width = SQ_WIDTH.toString() + 'px';
    sq.style.height = SQ_HEIGHT.toString() + 'px';
    sq.style.display = 'inline-block';
    sq.spriteIndex = i;
    sq.style.backgroundPosition =
      '-' + (i * SQ_WIDTH).toString() + 'px 0px';
    sq.onclick = function() {
      currentSprite = this.spriteIndex;
    };
    sq.style.backgroundImage = 'url(terreno.png)';
    editor.appendChild(sq);
  }
  document.body.appendChild(editor);

  // show values
  
  document.getElementById('changeSize').onclick = function() {
    var sx = parseInt(document.getElementById('mapWidth').value);
    var sy = parseInt(document.getElementById('mapHeight').value);
    if(sx > mapWidth) {
      var dx = sx - mapWidth;
      for(var i = 0; i < mapHeight; i++) {
        for(var n = 0; n < dx; n++) {
          currentMap.splice((mapWidth * (i+1)) + i * dx, 0, 0);
          mapLimit  .splice((mapWidth * (i+1)) + i * dx, 0, 0);
        }
      }
    }
    maps[0].width = sx;
    maps[0].height = sy;
    mapWidth = sx;
    mapHeight = sy;
    updateMapCoords();
    refresh();
  };

  document.getElementById('showLimits').onchange = function() {
    RED_LIMITS = this.checked;
    refresh();
  };

  document.getElementById('showGrid').onchange = function() {
    SHOW_GRID = this.checked;
    refresh();
  };

  document.getElementById('brushLimits').onchange = function() {
    brushMode = 2;
  };

  document.getElementById('showWarps').onchange = function() {
    SHOW_WARPS = this.checked;
    refresh();
  };

  document.getElementById('blink').onchange = function() {
    DO_BLINK = this.checked;
    if(!DO_BLINK) {
      blinkOn = true;
    }
    refresh();
  };

  document.getElementById('export').onclick = function() {
    console.log(JSON.stringify(maps[0]));
  };
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