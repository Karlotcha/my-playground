// using https://blog.mayflower.de/4584-Playing-around-with-pixel-shaders-in-WebGL.html
// and https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context

var ctx // WebGL context

window.onload = init

function init() {
  var canvas = document.getElementById("canvas")

  ctx = canvas.getContext("webgl")

  // Set clear color
  ctx.clearColor(0.0, 0.0, 0.0, 0.0)

  // Enable depth testing
  ctx.enable(ctx.DEPTH_TEST)

  // Near things obscure far things
  ctx.depthFunc(ctx.LEQUAL)

  // Clear the color as well as the depth buffer.
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT)

  // ctx.viewport(0, 0, ctx.drawingBufferWidth, ctx.drawingBufferHeight)

  var buffer = ctx.createBuffer()
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
  ctx.bufferData(
    ctx.ARRAY_BUFFER,
    new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0]),
    ctx.STATIC_DRAW
  )

  var vertex_shader_source   = document.getElementById("2d-vertex-shader").text
    , fragment_shader_source = document.getElementById("2d-fragment-shader").text
    , vertex_shader          = ctx.createShader(ctx.VERTEX_SHADER)
    , fragment_shader        = ctx.createShader(ctx.FRAGMENT_SHADER)

  ctx.shaderSource(vertex_shader, vertex_shader_source)
  ctx.shaderSource(fragment_shader, fragment_shader_source)

  ctx.compileShader(vertex_shader)
  ctx.compileShader(fragment_shader)

  var shader_program = ctx.createProgram()

  ctx.attachShader(shader_program, vertex_shader)
  ctx.attachShader(shader_program, fragment_shader)
  ctx.linkProgram(shader_program)
  ctx.useProgram(shader_program)

  var vertex_position_attribute = ctx.getAttribLocation(shader_program, "a_vertex_position")
  ctx.enableVertexAttribArray(vertex_position_attribute)

  ctx.vertexAttribPointer(vertex_position_attribute, 2, ctx.FLOAT, false, 0, 0)

  ctx.drawArrays(ctx.TRIANGLES, 0, 6)

  // init buffer
  // square_vertices_buffer = ctx.createBuffer()
  // ctx.bindBuffer(ctx.ARRAY_BUFFER, square_vertices_buffer)

  // var vertices = [
  //   1.0,  1.0,  0.0,
  //   -1.0, 1.0,  0.0,
  //   1.0,  -1.0, 0.0,
  //   -1.0, -1.0, 0.0
  // ]

  // ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW)

  // setInterval(drawScene, 15)
}

// function drawScene() {
//   ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT)

//   perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0)

//   loadIdentity()
//   mvTranslate([-0.0, 0.0, -6.0])

//   ctx.bindBuffer(ctx.ARRAY_BUFFER, square_vertices_buffer)
//   ctx.vertexAttribPointer(vertex_position_attribute, 3, ctx.FLOAT, false, 0, 0)
//   setMatrixUniforms()
//   ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4)
// }

// function loadIdentity() {
//   mvMatrix = Matrix.I(4)
// }

// function multMatrix(m) {
//   mvMatrix = mvMatrix.x(m)
// }

// function mvTranslate(v) {
//   multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4())
// }

// function setMatrixUniforms() {
//   var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix")
//   gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()))

//   var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix")
//   gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()))
// }
