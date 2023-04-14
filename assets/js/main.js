
const painter = new Painter()
painter.init()

// Assign
const dom = painter.getDOM()
const canvas = painter.getCanvas()
const context = painter.getContext()

canvas.addEventListener('contextmenu', event => event.preventDefault());

dom.bgColor.addEventListener('change', function (e) {
    painter.setBgColor(dom.bgColor.value)
})

dom.lineColor.addEventListener('change', function (e) {
    painter.setLineColor(dom.lineColor.value)
})

var text = document.querySelector('.tools-list__item-size-text')
text.textContent = dom.lineWidth.value

dom.lineWidth.addEventListener('change', function (e) {
    text.textContent = dom.lineWidth.value
    painter.setLineWidth(dom.lineWidth.value)
})

dom.width.addEventListener('change', function (e) {
    canvas.width = dom.width.value
    painter.width = dom.width.value
    painter.load()
})

dom.height.addEventListener('change', function (e) {
    canvas.height = dom.height.value
    painter.setHeight(dom.height.value)

    painter.load()
})

var isHold = false
canvas.addEventListener('mousedown', function (e) {
    isHold = true
    var {x, y} = painter.getPosition(e)
    painter.createPath(x, y)
})

window.addEventListener('mousemove', function (e) {
    if (isHold) {
        var {x, y} = painter.getPosition(e)
        painter.draw(x, y)
    }
})

window.addEventListener('mouseup', function (e) {
    isHold = false
})