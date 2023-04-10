
const painter = new Painter()
painter.init()

// Assign
const dom = painter.getDOM()
const canvas = painter.getCanvas()
const context = painter.getContext()

dom.bgColor.addEventListener('change', function (e) {
    painter.setBgColor(dom.bgColor.value)
})

dom.lineColor.addEventListener('change', function (e) {
    painter.setLineColor(dom.lineColor.value)
})

dom.width.addEventListener('change', function (e) {
    canvas.width = dom.width.value
    painter.load()
})

dom.height.addEventListener('change', function (e) {
    canvas.height = dom.height.value
    painter.load()
})

var isHold = false
canvas.addEventListener('mousedown', function (e) {
    isHold = true
    var {x, y} = painter.getPosition(e)
    painter.createPath(x, y)
    console.log('down pass')
})

window.addEventListener('mousemove', function (e) {
    if (isHold) {
        var {x, y} = painter.getPosition(e)
        painter.draw(x, y)
        console.log('move pass')
    }
})

window.addEventListener('mouseup', function (e) {
    isHold = false
    console.log('up pass')
})