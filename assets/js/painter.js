class Option {
    constructor() {
        this.bgColor = config.backgroundColor
        this.lineColor = config.lineColor
        this.lineWidth = config.lineWidth
        this.width = config.width
        this.height = config.height
    }
}

class Painter extends Option {
    constructor() {
        super()
        this.dom = false
        this.context = false
        this.store = []
    }

    init() {
        var bgColor = document.getElementById('bg-color-input')
        var lineColor = document.getElementById('line-color-input')
        var width = document.getElementById('width-painter')
        var height = document.getElementById('height-painter')
        var canvas = document.getElementById('canvas')

        // SET DEFAULT VALUE
        bgColor.value = this.bgColor
        lineColor.value = this.lineColor
        width.value = this.width
        height.value = this.height

        canvas.width = this.width
        canvas.height = this.height

        // Canvas default options
        var context = canvas.getContext('2d')
        context.fillStyle = this.bgColor
        context.fillRect(0, 0, this.width, this.height)

        // Assign to class for use
        this.dom = {
            bgColor,
            lineColor,
            width,
            height,
            canvas
        }

        this.context = context
    }

    getContext() {
        return this.context
    }

    getDOM() {
        return this.dom
    }

    getCanvas() {
        return this.dom.canvas
    }

    setBgColor(bgcolor) {
        this.bgColor = bgcolor
        this.context.fillStyle = bgcolor
        this.context.fillRect(0, 0, this.width, this.height)

        this.load()
    }

    setLineColor(lineColor) {
        this.lineColor = lineColor
    }

    setStore(x, y, s, c) {
        this.store.push({
            x, y, s, c
        })
    }

    getStore() {
        return this.store
    }

    getPosition(e) {
        var rect = this.dom.canvas.getBoundingClientRect()

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    createPath(x, y) {
        this.context.beginPath()
        this.context.moveTo(x, y)
        this.context.lineWidth = this.lineWidth
        this.context.lineCap = 'round'
        this.context.strokeStyle = this.lineColor
    }

    draw(x, y) {
        this.context.lineTo(x, y)
        this.context.stroke()

        this.setStore(x, y, this.lineWidth, this.lineColor)
    }

    load() {
        var store = this.getStore()
        for (var i = 1; i < store.length; i++) {
            this.lineWidth = store[i].s
            this.lineColor = store[i].c

            this.context.beginPath()
            this.context.moveTo(store[i-1].x, store[i-1].y)
            this.context.lineWidth = this.lineWidth
            this.context.lineCap = 'round'
            this.context.strokeStyle = this.lineColor

            this.context.lineTo(store[i].x, store[i].y)
            this.context.stroke()
        }
    }
}