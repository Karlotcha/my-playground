// ************************************************************************************
// POINT CLASS
// ************************************************************************************
function Point (x, y, r, g, b, a) {
  this.x = x
  this.y = y
  this.r = r
  this.g = g
  this.b = b
  this.a = a

  this.index = Point.list.length
  Point.list[this.index] = this

  this.draw()
}

Point.prototype.move  = function () {
  this.x = this.x + rand (10) - rand (10)
  this.y = this.y + rand (10) - rand (10)

  this.r = rand(255)
  this.g = rand(255)
  this.b = rand(255)
  this.a = rand(255)

  this.draw()
}

Point.prototype.draw  = function () {
  drawPixel (this.x, this.y, this.r, this.g, this.b, this.a)
}

Point.list = []

// ************************************************************************************
// FUNCTIONS HELPERS
// ************************************************************************************
function rand (n) {
 return Math.floor(Math.random()*n)
}

function drawPixel (x, y, r, g, b, a) {
  var index = (x + y * width) * 4

  image.data[index + 0] = r
  image.data[index + 1] = g
  image.data[index + 2] = b
  image.data[index + 3] = a
}

function updateCanvas() {
    ctx.putImageData(image, 0, 0)
}

// ************************************************************************************
// MAIN SCRIPT
// ************************************************************************************
var c   = document.getElementById("canvas")
  , ctx = c.getContext("2d")
  , width = c.width
  , height = c.height
  , image = ctx.getImageData(0, 0, width, height)

  new Point(width/2, height/2, rand(255), rand(255), rand(255), rand(255))
setInterval(function() {
  Point.list.forEach(function(thiz, i){thiz.move()})
  updateCanvas()
}, 1)
