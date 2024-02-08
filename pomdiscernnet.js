// window.addEventListener('DOMContentLoaded', (event) => {


const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
for (let t = 0; t < 10000000; t++) {
    squaretable[`${t}`] = Math.sqrt(t)
    if (t > 999) {
        t += 9
    }
}
let qz = []
let supa = 3000
let faces = -1
let indx = []
let trp = {}
let freepoints = []
let numset = []
let numset2 = []

// let s0 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/0/hsf_0/hsf_0_${c}.png`
//     s0.push(img0)
// }
// let s1 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/1/hsf_0/hsf_0_${c}.png`
//     s1.push(img0)
// }
// let s2 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/2/hsf_0/hsf_0_${c}.png`
//     s2.push(img0)
// }
// let s3 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/3/hsf_0/hsf_0_${c}.png`
//     s3.push(img0)
// }
// let s4 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/4/hsf_0/hsf_0_${c}.png`
//     s4.push(img0)
// }
// let s5 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/5/hsf_0/hsf_0_${c}.png`
//     s5.push(img0)
// }
// let s6 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/6/hsf_0/hsf_0_${c}.png`
//     s6.push(img0)
// }
// let s7 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/7/hsf_0/hsf_0_${c}.png`
//     s7.push(img0)
// }
// let s8 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/8/hsf_0/hsf_0_${c}.png`
//     s8.push(img0)
// }
// let s9 = []
// for (let t = 0; t < 5; t++) {
//     let img0 = new Image()
//     let c = t
//     while (`${c}`.split('').length < 5) {
//         c = '0' + c
//     }
//     img0.src = `./data/9/hsf_0/hsf_0_${c}.png`
//     s9.push(img0)
// }



let canvas
let canvas_context
let keysPressed = {}
let FLEX_engine
let TIP_engine = {}
let XS_engine
let YS_engine
TIP_engine.x = 350
TIP_engine.y = 350

class Line {
    constructor(x, y, x2, y2, color, width) {
        this.x1 = x
        this.y1 = y
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.width = width
    }
    angle() {
        return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
    }
    squareDistance() {
        let xdif = this.x1 - this.x2
        let ydif = this.y1 - this.y2
        let squareDistance = (xdif * xdif) + (ydif * ydif)
        return squareDistance
    }
    hypotenuse() {
        let xdif = this.x1 - this.x2
        let ydif = this.y1 - this.y2
        let hypotenuse = (xdif * xdif) + (ydif * ydif)
        if (hypotenuse < 10000000 - 1) {
            if (hypotenuse > 1000) {
                return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
            } else {
                return squaretable[`${Math.round(hypotenuse)}`]
            }
        } else {
            return Math.sqrt(hypotenuse)
        }
    }
    draw() {
        let linewidthstorage = canvas_context.lineWidth
        canvas_context.strokeStyle = this.color
        canvas_context.lineWidth = this.width
        canvas_context.beginPath()
        canvas_context.moveTo(this.x1, this.y1)
        canvas_context.lineTo(this.x2, this.y2)
        canvas_context.stroke()
        canvas_context.lineWidth = linewidthstorage
    }
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 0
    }
    pointDistance(point) {
        return (new LineOP(this, point, "transparent", 0)).hypotenuse()
    }
}
class LineOP {
    constructor(object, target, color, width) {
        this.object = object
        this.target = target
        this.color = color
        this.width = width
    }
    squareDistance() {
        let xdif = this.object.x - this.target.x
        let ydif = this.object.y - this.target.y
        let squareDistance = (xdif * xdif) + (ydif * ydif)
        return squareDistance
    }
    hypotenuse() {
        let xdif = this.object.x - this.target.x
        let ydif = this.object.y - this.target.y
        let hypotenuse = (xdif * xdif) + (ydif * ydif)
        if (hypotenuse < 10000000 - 1) {
            if (hypotenuse > 1000) {
                return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
            } else {
                return squaretable[`${Math.round(hypotenuse)}`]
            }
        } else {
            return Math.sqrt(hypotenuse)
        }
    }
    angle() {
        return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
    }
    draw() {
        let linewidthstorage = canvas_context.lineWidth
        canvas_context.strokeStyle = this.color
        canvas_context.lineWidth = this.width
        canvas_context.beginPath()
        canvas_context.moveTo(this.object.x, this.object.y)
        canvas_context.lineTo(this.target.x, this.target.y)
        canvas_context.stroke()
        canvas_context.lineWidth = linewidthstorage
    }
}
class Circle {
    constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.xmom = xmom
        this.ymom = ymom
        this.friction = friction
        this.reflect = reflect
        this.strokeWidth = strokeWidth
        this.strokeColor = strokeColor
    }
    draw() {
        canvas_context.lineWidth = this.strokeWidth
        canvas_context.strokeStyle = this.color
        canvas_context.beginPath();
        if (this.radius > 0) {
            canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
            canvas_context.fillStyle = this.color
            canvas_context.fill()
            // canvas_context.stroke();
        } else {
            //console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
        }
    }
    move() {
        if (this.reflect == 1) {
            if (this.x + this.radius > canvas.width) {
                if (this.xmom > 0) {
                    this.xmom *= -1
                }
            }
            if (this.y + this.radius > canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }
            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }
            }
            if (this.y - this.radius < 0) {
                if (this.ymom < 0) {
                    this.ymom *= -1
                }
            }
        }
        this.x += this.xmom
        this.y += this.ymom
    }
    unmove() {
        if (this.reflect == 1) {
            if (this.x + this.radius > canvas.width) {
                if (this.xmom > 0) {
                    this.xmom *= -1
                }
            }
            if (this.y + this.radius > canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }
            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }
            }
            if (this.y - this.radius < 0) {
                if (this.ymom < 0) {
                    this.ymom *= -1
                }
            }
        }
        this.x -= this.xmom
        this.y -= this.ymom
    }
    frictiveMove() {
        if (this.reflect == 1) {
            if (this.x + this.radius > canvas.width) {
                if (this.xmom > 0) {
                    this.xmom *= -1
                }
            }
            if (this.y + this.radius > canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }
            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }
            }
            if (this.y - this.radius < 0) {
                if (this.ymom < 0) {
                    this.ymom *= -1
                }
            }
        }
        this.x += this.xmom
        this.y += this.ymom
        this.xmom *= this.friction
        this.ymom *= this.friction
    }
    frictiveunMove() {
        if (this.reflect == 1) {
            if (this.x + this.radius > canvas.width) {
                if (this.xmom > 0) {
                    this.xmom *= -1
                }
            }
            if (this.y + this.radius > canvas.height) {
                if (this.ymom > 0) {
                    this.ymom *= -1
                }
            }
            if (this.x - this.radius < 0) {
                if (this.xmom < 0) {
                    this.xmom *= -1
                }
            }
            if (this.y - this.radius < 0) {
                if (this.ymom < 0) {
                    this.ymom *= -1
                }
            }
        }
        this.xmom /= this.friction
        this.ymom /= this.friction
        this.x -= this.xmom
        this.y -= this.ymom
    }
    isPointInside(point) {
        this.areaY = point.y - this.y
        this.areaX = point.x - this.x
        if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
            return true
        }
        return false
    }
    doesPerimeterTouch(point) {
        this.areaY = point.y - this.y
        this.areaX = point.x - this.x
        if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
            return true
        }
        return false
    }
}
class Shape {
    constructor(shapes) {
        this.shapes = shapes
    }
    draw() {
        for (let t = 0; t < this.shapes.length; t++) {
            this.shapes[t].draw()
        }
    }
    isPointInside(point) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (this.shapes[t].isPointInside(point)) {
                return true
            }
        }
        return false
    }
    doesPerimeterTouch(point) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (this.shapes[t].doesPerimeterTouch(point)) {
                return true
            }
        }
        return false
    }
    innerShape(point) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (this.shapes[t].doesPerimeterTouch(point)) {
                return this.shapes[t]
            }
        }
        return false
    }
    isInsideOf(box) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (box.isPointInside(this.shapes[t])) {
                return true
            }
        }
        return false
    }
    adjustByFromDisplacement(x, y) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (typeof this.shapes[t].fromRatio == "number") {
                this.shapes[t].x += x * this.shapes[t].fromRatio
                this.shapes[t].y += y * this.shapes[t].fromRatio
            }
        }
    }
    adjustByToDisplacement(x, y) {
        for (let t = 0; t < this.shapes.length; t++) {
            if (typeof this.shapes[t].toRatio == "number") {
                this.shapes[t].x += x * this.shapes[t].toRatio
                this.shapes[t].y += y * this.shapes[t].toRatio
            }
        }
    }
    mixIn(arr) {
        for (let t = 0; t < arr.length; t++) {
            for (let k = 0; k < arr[t].shapes.length; k++) {
                this.shapes.push(arr[t].shapes[k])
            }
        }
    }
    push(object) {
        this.shapes.push(object)
    }
}

function setUp(canvas_pass, style = "#000000") {
    canvas = canvas_pass

    canvas_context = canvas.getContext('2d', { willReadFrequently: true });


    canvas.style.background = style
    // window.setInterval(function () {
    //     main()
    // },10)
    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
    });
    window.addEventListener('pointerdown', e => {
        FLEX_engine = canvas.getBoundingClientRect();
        XS_engine = e.clientX - FLEX_engine.left;
        YS_engine = e.clientY - FLEX_engine.top;
        TIP_engine.x = XS_engine
        TIP_engine.y = YS_engine
        TIP_engine.body = TIP_engine
        if (TIP_engine.x > 180) {
            if (TIP_engine.x < 720 - 180) {
                if (TIP_engine.y > 180) {
                    if (TIP_engine.y < 720 - 180) {
                        freepoints.push(new Circle(TIP_engine.x, TIP_engine.y))
                        numset = []
                        numset2 = []
                        indx = []
                    }
                }
            }
        }
        // canvas_context.fillRect(TIP_engine.x, TIP_engine.y, 5, 5)
        // example usage: if(object.isPointInside(TIP_engine)){ take action }
        window.addEventListener('pointermove', continued_stimuli);
    });

    window.addEventListener('pointerup', e => {
        window.removeEventListener("pointermove", continued_stimuli);
    })

    function continued_stimuli(e) {
        FLEX_engine = canvas.getBoundingClientRect();
        XS_engine = e.clientX - FLEX_engine.left;
        YS_engine = e.clientY - FLEX_engine.top;
        TIP_engine.x = XS_engine
        TIP_engine.y = YS_engine
        TIP_engine.body = TIP_engine

        if (TIP_engine.x > 180) {
            if (TIP_engine.x < 720 - 180) {
                if (TIP_engine.y > 180) {
                    if (TIP_engine.y < 720 - 180) {
                        freepoints.push(new Circle(TIP_engine.x, TIP_engine.y))
                        numset = []
                        numset2 = []
                        indx = []
                    }
                }
            }
        }
    }
}

function getRandomColor() { // random color
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16) + 0)];
    }
    return color;
}
let setup_canvas = document.getElementById('canvas') //getting canvas from document
let textbox = document.getElementById('text') //getting canvas from document
let output_canvas = document.getElementById('output') //getting canvas from document

output_canvas_context = output_canvas.getContext('2d', { willReadFrequently: true });
output_canvas.style.background = "#FFFFFF"

setUp(setup_canvas) // setting up canvas refrences, starting timer. 

// object instantiation and creation happens here 

class Weight {
    constructor(from, to) {
        this.value = this.weight()
        this.from = from
        this.to = to
        this.change = 0
        this.delta = 1
    }
    valueOf() {
        return this.value
    }
    weight() {
        return ((Math.random() - .5) * 2) / 1
    }
    setChange(num) {
        this.change = num
    }
    setWeight(num) {
        this.value = num
    }
}
class Perceptron {
    constructor(inputs) {
        this.markCount = 0
        this.bias = (((Math.random() - .5) * 2) / 1) / 1
        this.value = this.bias
        this.weights = []
        this.outputConnections = []
        this.inputs = inputs
        this.error = 0
        this.delta = 1
        for (let t = 0; t < this.inputs.length; t++) {
            this.weights.push(this.weight(this.inputs[t]))
        }
        this.z = -1
        this.change = 0
    }
    setError(error) {
        this.error = error
    }
    setDelta(delta) {
        this.delta = delta
        for (let t = 0; t < this.outputConnections.length; t++) {
            this.outputConnections[t].delta = this.delta
        }
    }
    newIn(inputs) {
        this.inputs = inputs
        this.weights = []
        for (let t = 0; t < this.inputs.length; t++) {
            this.weights.push(this.weight(this.inputs[t]))
        }
    }
    setBias(bias) {
        this.bias = bias
    }
    setChange(num) {
        this.change = num
    }
    weight(link) {
        let weight = new Weight(link, this)
        if (typeof link != "number") {
            link.outputConnections.push(weight)
        }
        return weight
    }
    valueOf() {
        return this.value
    }
    compute(inputs = this.inputs, dr = 0) {
        this.inputs = inputs
        this.value = this.bias
        for (let t = 0; t < inputs.length; t++) {
            if (t > this.weights.length - 1) {
                this.weights.push(this.weight())
                this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
            } else {
                this.value += (inputs[t].valueOf() * this.weights[t].valueOf())
            }
        }
        this.sig()
        // this.gauss()
        if (Math.random() < .05 && dr == 1) {
            // return 0 //Math.random() //dropout
        }
        return this.value
    }
    relu() {
        this.value = Math.min(Math.max(this.value, perc.reluslime), 1)
    }
    sig() {
        this.value = 1 / (1 + (Math.pow(Math.E, -this.value)))
    }
    gauss() {
        this.value = Math.min(Math.max(Math.abs(this.value), 0.00000001), 1)

    }
}
class Network {
    constructor(inputs, layerSetupArray) {
        this.check = 0
        this.error = 0
        this.reluslime = .00001
        this.momentum = 0.01551565
        this.learningRate = 0.01551565
        this.setup = layerSetupArray
        this.inputs = inputs
        this.structure = []
        this.ztructure = []
        this.outputs = []
        this.nodeCount = 0
        this.markCount = 0
        for (let t = 0; t < layerSetupArray.length; t++) {
            let scaffold = []
            this.nodeCount += layerSetupArray[t]
            for (let k = 0; k < layerSetupArray[t]; k++) {
                let cept
                if (t == 0) {
                    cept = new Perceptron(this.inputs)
                    cept.markCount = this.markCount
                    this.markCount++
                } else {
                    cept = new Perceptron(this.structure[t - 1])
                    cept.markCount = this.markCount
                    this.markCount++
                }
                scaffold.push(cept)
            }
            this.structure.push(scaffold)
        }
        for (let t = 0; t < inputs.length; t++) {
            inputs[t].outputConnections = []
        }
        this.clusters = []
        for (let t = 0; t < this.nodeCount; t++) {
            let cluster = []
            let tv = Math.floor(Math.random() * (this.nodeCount+inputs.length) * 2)
            for (let k = 0; k < tv + 90; k++) {
                let index = new Point(-1, -1)
                if (Math.random() < .25 || t > this.nodeCount-11) {
                    let x = Math.floor(Math.random() * layerSetupArray.length)
                    let y = Math.floor(Math.random() * layerSetupArray[x])
                    index.x = x
                    index.y = y
                    if (!cluster.includes(this.structure[index.x][index.y])) {
                       if (t > this.nodeCount-11) {
                        if(index.y < this.nodeCount-11){
                            cluster.push(this.structure[index.x][index.y])
                        }
                       }else{
                        cluster.push(this.structure[index.x][index.y])
                       }
                    }
                } else {
                    let x = Math.floor(Math.random() * inputs.length)
                    index.x = x
                    if (!cluster.includes(inputs[index.x])) {
                        let node = inputs[index.x]
                        node.value = inputs[index.x].valueOf()
                        node.flag = index.x
                        node.data = 1
                        cluster.push(node)
                    }
                }
            }
            this.clusters.push(cluster)
        }
        this.ztructure = [[]]

        for (let t = 0; t < this.clusters.length; t++) {
            let s = 0
            let f = t
            while (this.structure[s].length <= f) {
                f -= this.structure[s].length
                s++
                if (s > this.structure.length) {
                    break
                }
            }
            let g = f
            let cetp = this.structure[s][g]   /// new Perceptron(this.clusters[t])
            console.log(cetp)
            cetp.weights = []
            cetp.outputConnections = []
        }
        for (let t = 0; t < this.clusters.length; t++) {

            let s = 0
            let f = t
            while (this.structure[s].length <= f) {
                // console.log(f, this.structure[s])
                f -= this.structure[s].length
                s++
                if (s > this.structure.length) {
                    break
                }
            }
            let g = f
            // console.log(s, g)
            let cetp = this.structure[s][g]   /// new Perceptron(this.clusters[t])
            // console.log(cetp)
            cetp.weights = []
            // cetp.outputConnections = []
            cetp.inputs = []
            cetp.newIn(this.clusters[t])
            cetp.markCount = t
            cetp.compute(this.clusters[t])
            this.ztructure[0][cetp.markCount] = cetp
        }
        this.lastinputs = [...this.inputs]
        this.lastgoals = [...this.lastinputs]
        this.swap = []
    }
    zalculateDeltasSigmoid(goals) {
        for (let t = this.ztructure.length - 1; t >= 0; t--) {
            const layer = this.ztructure[t]
            for (let k = layer.length - 1; k >= 0; k--) {
                const perceptron = layer[k]
                let output = perceptron.valueOf()
                let error = 0
                if (layer.length - 10 <= k) {
                    error = goals[k] - output;
                } else {
                    for (let k = 0; k < perceptron.outputConnections.length; k++) {
                        const currentConnection = perceptron.outputConnections[k]
                        error += currentConnection.to.delta * currentConnection.valueOf()
                        let j = 0
                        // while(currentConnection.to.outputConnections.length  > 0){
                        //     j++
                        //     if(j > 1000){
                        //         break
                        //     }
                        // }
                    }
                }
                perceptron.setError(error)
                this.error += Math.abs(error)
                perceptron.setDelta(error * output * (1 - output))
            }
        }
    }

    becomeClusterFrom(network) { //using a js file with one variable can be good for this
        // console.log(this.structure[0][0].bias)
        console.log(network)
        this.clusters = []
        for(let t =0;t<network.structure.length;t++){
            this.ztructure[0][t].outputConnections = []
        }
        for(let t =0;t<network.structure.length;t++){
            this.clusters.push([])
            for(let k = 0;k<network.structure[t].length;k++){
                if(network.structure[t][k][3] == 1){
                    this.ztructure[0][network.structure[t][k][2]].markCount = network.structure[t][k][2]
                    this.clusters[t].push(this.ztructure[0][network.structure[t][k][2]])
                }else{
                    let data = new Data(0)
                    data.flag = network.structure[t][k][2]
                    data.data = 1
                    this.clusters[t].push(data)
                }
            }
            this.ztructure[0][t].newIn(this.clusters[t])
            this.ztructure[0][t].markCount = t
        }

        for (let t = 0; t < this.ztructure[0].length; t++) {
            // console.log("h1")
                this.ztructure[0][t].bias = network.bructure[t]
            // for (let k = 0; k < this.ztructure[0][t].length; k++) {
                // console.log("h2")
                for (let w = 0; w < this.ztructure[0][t].weights.length; w++) {
                    // console.log("h3")
                    this.ztructure[0][t].weights[w].setWeight(network.weights[t][w])
                    if(network.structure[t][3] == 1){
                        this.ztructure[0][t].weights[w].to = this.ztructure[0][network.structure[t][w][2]]
                    }else{
                        this.ztructure[0][t].weights[w].to = this.inputs[network.structure[t][w][2]]
                    }
                }
            // }
        }
        // console.log(this.structure[0][0].bias)
    }
    zadjustWeights() {
        for (let t = 0; t < this.ztructure.length; t++) {
            const layer = this.ztructure[t]
            for (let k = 0; k < layer.length; k++) {
                const perceptron = layer[k]
                let delta = perceptron.delta
                for (let i = 0; i < perceptron.weights.length; i++) {
                    const connection = perceptron.weights[i]
                    let change = connection.change
                    change = (this.learningRate * delta * perceptron.inputs[i].valueOf()) + (this.momentum * change);
                    connection.setChange(change)
                    connection.setWeight(connection.valueOf() + change)
                }
                perceptron.setBias(perceptron.bias + (this.learningRate * delta))
            }
        }
    }

    zompute(inputs = this.inputs) {
        this.inputs = [...inputs]
        for (let t = 0; t < this.clusters.length; t++) {
            for (let k = 0; k < this.clusters[t].length; k++) {
                if (this.clusters[t][k].data == 1) {
                    this.clusters[t][k].value = this.inputs[this.clusters[t][k].flag]
                }
            }
        }
        for (let t = 0; t < this.ztructure.length; t++) {
            for (let k = 0; k < this.ztructure[t].length; k++) {
                if (t == 0) {
                    this.ztructure[0][k].compute(this.clusters[this.ztructure[0][k].markCount], 1)
                } else {
                    this.ztructure[0][k].compute(this.clusters[this.ztructure[0][k].markCount], 1)
                }
            }
        }
        this.outputs = []
        this.dataoutputs = []
        for (let t = 0; t < this.ztructure[this.ztructure.length - 1].length; t++) {
            this.outputs.push(this.ztructure[this.ztructure.length - 1][t].valueOf())
            this.dataoutputs.push(new Data(this.ztructure[this.ztructure.length - 1][t].valueOf()))
        }
        if (keysPressed['k']) {
            console.log(this)
        }
    }
    compute(inputs = this.inputs) {
        this.inputs = [...inputs]
        for (let t = 0; t < this.structure.length; t++) {
            for (let k = 0; k < this.structure[t].length; k++) {
                if (t == 0) {
                    this.structure[t][k].compute(this.inputs, 1)
                } else {
                    if (t != this.structure.length - 1) {
                        this.structure[t][k].compute(this.structure[t - 1], 1)
                    } else {
                        this.structure[t][k].compute(this.structure[t - 1], 0)
                    }
                }
            }
        }
        this.outputs = []
        this.dataoutputs = []
        for (let t = 0; t < this.structure[this.structure.length - 1].length; t++) {
            this.outputs.push(this.structure[this.structure.length - 1][t].valueOf())
            this.dataoutputs.push(new Data(this.structure[this.structure.length - 1][t].valueOf()))
        }
    }
}
class Data {
    constructor(input = -100) {
        this.delta = 0
        this.outputConnections = []
        if (input == -100) {
            this.value = this.weight()
        } else {
            this.value = input
        }
    }
    valueOf() {
        return this.value
    }
    weight() {
        return Math.random() - .5
    }
}
class NetworkDummy {
    constructor(inputs, layerSetupArray) {
        this.reluslime = .00001
        this.momentum = .0565
        this.learningRate = .0565
        this.setup = layerSetupArray
        this.inputs = inputs
        this.structure = []
        this.outputs = []
        for (let t = 0; t < layerSetupArray.length; t++) {
            let scaffold = []
            for (let k = 0; k < layerSetupArray[t]; k++) {
                let cept
                if (t == 0) {
                    cept = new DataMin(0)
                } else {
                    cept = new DataMin(0)
                }
                scaffold.push(cept)
            }
            this.structure.push(scaffold)
        }
        this.lastinputs = [...this.inputs]
        this.lastgoals = [...this.lastinputs]
        this.swap = []
    }

    compare(network) { //using a js file with one variable can be good for this
        // console.log(this.structure[0][0].bias)


        let net = new Network(this.inputs, this.setup)
        // console.log(net)

        for (let t = 0; t < this.structure.length; t++) {
            for (let k = 0; k < this.structure[t].length; k++) {
                net.structure[t][k].value = Math.abs(this.structure[t][k].valueOf() - network.structure[t][k].valueOf())
            }
        }
        // console.log(this.structure[0][0].bias)


        let slap = 0
        for (let t = 0; t < this.structure.length; t++) {
            for (let k = 0; k < this.structure[t].length; k++) {
                slap += (net.structure[t][k].value) / (Math.sqrt(this.structure[t].length) / 10)

            }
        }
        net.difference = slap
        // console.log(slap)
        return net
    }
    becomeNetworkFrom(network) { //using a js file with one variable can be good for this
        // console.log(this.structure[0][0].bias)
        for (let t = 0; t < this.structure.length; t++) {
            // console.log("h1")
            for (let k = 0; k < this.structure[t].length; k++) {
                // console.log("h2")
                this.structure[t][k].value = network.structure[t][k].valueOf()
                // for (let w = 0; w < this.structure[t][k].weights.length; w++) {
                // console.log("h3")
                // this.structure[t][k].weights[w].setWeight(network.structure[t][k][w].valueOf())
                // }
            }
        }
        // console.log(this.structure[0][0].bias)
    }

    // becomeClusterFrom(network) { //using a js file with one variable can be good for this
    //     // console.log(this.structure[0][0].bias)
    //     for (let t = 0; t < this.ztructure[0].length; t++) {
    //         // console.log("h1")
    //             this.ztructure[0][t].bias = network.bructure[0][t].bias
    //         // for (let k = 0; k < this.ztructure[0][t].length; k++) {
    //             // console.log("h2")
    //             for (let w = 0; w < this.structure[0][t].weights.length; w++) {
    //                 // console.log("h3")
    //                 this.ztructure[0][t].weights[w].setWeight(network.weights[t][w].valueOf())
    //             }
    //         // }
    //     }
    //     this.clusters = []
    //     for(let t =0;t<network.structure.length;t++){
    //         this.clusters.push([])
    //         for(let k = 0;k<network.structure[t].length;k++){
    //             if(this.ztructure[0][network.structure[t][k][3]] == 1){
    //                 this.ztructure[0][this.ztructure[0][network.structure[t][k][1]]].markCount = network.structure[t][k][2]
    //                 this.clusters[t].push(this.ztructure[0][network.structure[t][k][1]])
    //             }else{
    //                 let data = new Data(0)
    //                 data.flag = this.ztructure[0][network.structure[t][k][2]]
    //                 this.clusters[t].push(data)
    //             }
    //         }
    //     }
    //     // console.log(this.structure[0][0].bias)
    // }
    clusterLog(){
        let json = {}
        json.bructure = []
        json.structure = []
        json.weights = []
        json.setup = [...this.setup]
        for (let t = 0; t < this.ztructure[0].length; t++) {
            let cap = []
            let weights = []
            let bias = []
            for(let k = 0;k<this.clusters[t].length;k++){
                let art = []
                if(this.clusters[t][k].markCount >= 0){
                    art[0] = t
                    art[1] = k
                    art[2] = this.clusters[t][k].markCount
                    art[3] = 1
                }else{
                    art[0] = t
                    art[1] = k
                    art[2] = this.clusters[t][k].flag
                    art[3] = 0
                }
                cap.push(art)
            }
            for(let k = 0;k<this.ztructure[0][t].weights.length;k++){
                weights.push(this.ztructure[0][t].weights[k].valueOf())
            }
            json.bructure.push(this.ztructure[0][t].bias)
            json.structure.push(cap)
            json.weights.push(weights)
        }
        console.log(json)
        console.log(JSON.stringify(json))
    }
    log() {
        let json = {}
        json.structure = []
        json.setup = [...this.setup]
        for (let t = 0; t < this.structure.length; t++) {
            json.structure.push({})
            for (let k = 0; k < this.structure[t].length; k++) {
                json.structure[t][k] = {}
                json.structure[t][k].bias = this.structure[t][k].bias.valueOf()
                for (let w = 0; w < this.structure[t][k].weights.length; w++) {
                    json.structure[t][k][w] = (this.structure[t][k].weights[w].valueOf())
                }
            }
        }
        if (keysPressed['q']) {
            console.log(json)
        }
        return json
    }
    calculateDeltasSigmoid(goals) {
        for (let t = this.structure.length - 1; t >= 0; t--) {
            const layer = this.structure[t]
            for (let k = 0; k < layer.length; k++) {
                const perceptron = layer[k]
                let output = perceptron.valueOf()
                let error = 0
                if (t === this.structure.length - 1) {
                    error = goals[k] - output;
                } else {
                    for (let k = 0; k < perceptron.outputConnections.length; k++) {
                        const currentConnection = perceptron.outputConnections[k]
                        //console.log(currentConnection)
                        error += currentConnection.to.delta * currentConnection.valueOf()
                    }
                }
                perceptron.setError(error)
                perceptron.setDelta(error * output * (1 - output))
            }
        }
    }
    adjustWeights() {
        for (let t = 0; t < this.structure.length; t++) {
            const layer = this.structure[t]
            for (let k = 0; k < layer.length; k++) {
                const perceptron = layer[k]
                let delta = perceptron.delta
                for (let i = 0; i < perceptron.weights.length; i++) {
                    const connection = perceptron.weights[i]
                    let change = connection.change
                    change = (this.learningRate * delta * perceptron.inputs[i].valueOf()) + (this.momentum * change);
                    connection.setChange(change)
                    connection.setWeight(connection.valueOf() + change)
                }
                perceptron.setBias(perceptron.bias + (this.learningRate * delta))
            }
        }
    }
    clone(nw) {
        let input = nw.inputs
        let perc = new Network(input, nw.setup)
        for (let t = 0; t < nw.structure.length; t++) {
            for (let k = 0; k < nw.structure[t].length; k++) {
                perc.structure[t][k] = new Perceptron([0, 0, 0, 0, 0, 0, 0])
                for (let f = 0; f < nw.structure[t][k].weights.length; f++) {
                    perc.structure[t][k].weights[f] = nw.structure[t][k].weights[f]
                    perc.structure[t][k].bias = nw.structure[t][k].bias
                }
            }
        }
        return perc
    }
    compute(inputs = this.inputs) {
        this.inputs = [...inputs]
        for (let t = 0; t < this.structure.length; t++) {
            for (let k = 0; k < this.structure[t].length; k++) {
                if (t == 0) {
                    this.structure[t][k].compute(this.inputs, 1)
                } else {
                    if (t != this.structure.length - 1) {
                        this.structure[t][k].compute(this.structure[t - 1], 1)
                    } else {
                        this.structure[t][k].compute(this.structure[t - 1], 0)
                    }
                }
            }
        }
        this.outputs = []
        this.dataoutputs = []
        for (let t = 0; t < this.structure[this.structure.length - 1].length; t++) {
            this.outputs.push(this.structure[this.structure.length - 1][t].valueOf())
            this.dataoutputs.push(new Data(this.structure[this.structure.length - 1][t].valueOf()))
        }
    }
}


class DataMin {
    constructor(input = -100) {
        this.value = input
    }
    valueOf() {
        return this.value
    }

    weight() {
        return Math.random() - .5
    }
}
TIP_engine.x = 350
TIP_engine.y = 350
let inpiut = []
let b = []
for (let t = 0; t < 100; t++) {
    let a = []
    for (let k = 0; k < 100; k++) {
        a.push(Math.random())
    }
    b.push(a)
}
for (let t = 0; t < 784; t++) {
    let data = new Data(Math.random())
    inpiut.push(data)
}
// let perc = new Network(inpiut, [256,128,32, 1])//, new Data(0), new Data(0), new Data(0)
let perc = new Network(inpiut, [100]) //, new Data(0), new Data(0), new Data(0)
let smerpo = []
let smerpo2 = []
let xummy = new Network(inpiut, [100])
let nummy = new Network(inpiut, [100])
perc.becomeClusterFrom(recreadnet)

// let perc = new Network(inpiut, [16,16, 3])//, new Data(0), new Data(0), new Data(0)
// perc.becomeNetworkFrom(shakenet) //20 18
// perc.becomeNetworkFrom(shakenet)
// perc.becomeNetworkFrom(shighnet) //64 64
// perc.becomeNetworkFrom(nightnet) //64 64
// perc.becomeNetworkFrom(daynet) //64 64
// perc.becomeNetworkFrom(whacknet) //64 64
// perc.becomeNetworkFrom(drop10net) //100 100
// perc.becomeNetworkFrom(dropnot) //100 100
// perc.becomeNetworkFrom(sixnet) //100 100
// perc.becomeNetworkFrom(sevnet) //100 100
// perc.becomeNetworkFrom(eightnet) //100 100
// perc.becomeNetworkFrom(twonet) //100 100 100
// perc.becomeNetworkFrom(tennet) //100 100 100
// perc.becomeNetworkFrom(kninet) //100 100 100

// nummy.becomeNetworkFrom(kninet)
// perc.zompute(inpiut)
//10000000
//[new Data(1), new Data(0)]
// for (let t = 0; t < 1000000; t++) {
//     let r1 = Math.random()
//     let r2 = Math.random()
//     let inputs = [new Data(r1), new Data(r2)]
//     let goals = [new Data(r1), new Data(r2)]
//     perc.zompute(inputs)
//     // let circle = new Circle(perc.outputs[0] * 500, perc.outputs[1] * 500, 3, "red")
//     // circle.draw()
//     perc.calculateDeltasSigmoid(goals)
//     perc.adjustWeights()
// }


class Viewer {
    constructor(net, points) {
        this.net = net
        this.points = points
    }
    draw() {
        let layers = this.net.structure.length + 1
        this.circles = []
        this.lines = []
        let step = (canvas.height / (layers + 2))
        for (let t = -1; t < this.net.structure.length; t++) {
            let circlayer = []
            if (t == -1) {
                let chunk = canvas.width / (this.net.inputs.length + 1)
                for (let r = 27; r >= 0; r--) {
                    for (let k = (this.net.inputs.length / 28) - 1; k >= 0; k--) {
                        let circ = new Circle((chunk) * (((k + 1) * 7)) + 220, ((step - 90) * (t + 2)) + (r * 7), 3.5, `rgba(255,255,255,${this.net.inputs[k + (r * 28)].valueOf()})`)
                        circ.value = this.net.inputs[k + (r * 28)].valueOf()
                        if (keysPressed['l'] || lock == 1) {
                            circ.on = 1
                        } else {
                            circ.on = -1

                        }
                        circlayer.push(circ)
                    }
                }
            } else {
                let chunk = canvas.width / (this.net.structure[t].length + 1)
                for (let k = 0; k < this.net.structure[t].length; k++) {
                    // let circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${this.net.structure[t][k].valueOf()})`)
                    let circ = new Circle((300 + ((k * 12) % 120)), (step * (t + 2)) + (Math.floor(k / 10) * 12), 5, `rgba(255,255,255,${this.net.structure[t][k].valueOf()})`)

                    if (t >= -1) {
                        circ = new Circle(chunk * (k + 1), step * (t + 2), 10, `rgba(255,255,255,${this.net.structure[t][k].valueOf()})`)
                    }


                    circ.value = this.net.structure[t][k].valueOf()
                    for (let g = 0; g < this.net.structure[t][k].weights.length; g++) {
                        //console.log(this.circles, this.net.structure[t][k].weights, g)
                        let link = new LineOP(circ, this.circles[t][g], "white", 3 * Math.abs(this.net.structure[t][k].weights[g].valueOf()))
                        link.width = 1 * Math.abs(this.net.structure[t][k].weights[g].valueOf())
                        if (this.net.structure[t][k].weights[g].valueOf() < 0) {
                            link.color = "red"
                        } else {
                            link.color = "#00ff00"
                        }
                        this.lines.push(link)
                    }
                    if (keysPressed['l'] || lock == 1) {
                        circ.on = 1
                    } else {
                        circ.on = -1

                    }
                    circlayer.push(circ)
                }
            }
            this.circles.push(circlayer)
        }
        for (let p = 0; p < this.points.length; p++) {
            for (let t = 0; t < this.circles.length; t++) {
                for (let k = 0; k < this.circles[t].length; k++) {
                    if (this.circles[t][k].isPointInside(this.points[p])) {
                        this.circles[t][k].on *= -1
                    }
                }
            }
        }


        for (let t = 0; t < this.circles.length; t++) {
            for (let k = 0; k < this.circles[t].length; k++) {
                this.circles[t][k].on = 1
            }
        }
        for (let t = 0; t < this.lines.length; t++) {
            if (this.lines[t].object.on == 1 || this.lines[t].target.on == 1) {

                canvas_context.globalAlpha = (this.lines[t].target.value * this.lines[t].object.value)
                if (keysPressed['l']) {
                    this.lines[t].draw()
                }
                canvas_context.globalAlpha = 1
            }
        }
        for (let t = 0; t < this.circles.length; t++) {
            for (let k = 0; k < this.circles[t].length; k++) {
                if (this.circles[t][k].on == -1) {
                    canvas_context.globalAlpha = .1
                } else {
                    canvas_context.globalAlpha = 1
                }
                this.circles[t][k].draw()
                canvas_context.globalAlpha = 1
            }
        }

        // for (let t = 0; t < this.net.inputs.length; t++) {
        //     for (let k = 0; k < this.net.outputs.length; k++) {
        //         let w = this.net.structure[0][k].weights[t] + (this.net.structure[0][k].bias / 784)

        //         canvas_context.globalAlpha = Math.abs(w) / 2

        //         let y = Math.floor(t / 28)
        //         let circ = new Circle(this.circles[1][k].x + ((t % 28) * 2) - 28, (this.circles[1][k].y + (y * 2) + 14), 2, "#FFFFFF")
        //         if (w < 0) {
        //             circ.color = "#FF0000"
        //         } else {
        //             circ.color = "#00FF00"

        //         }
        //         circ.draw()
        //         canvas_context.globalAlpha = 1

        //     }
        // }


        for (let k = 0; k < this.net.outputs.length; k++) {
            let t = 0
            let y = 0
            canvas_context.fillStyle = "white"
            canvas_context.font = '19px arial'
            canvas_context.fillText(k, this.circles[this.circles.length - 1][k].x + ((t % 28) * 2) - 10, (this.circles[this.circles.length - 1][k].y + (y * 2) + 94))
        }



    }



}

let pomao = []
// for (let t = 0; t < 60; t++) {
//     let pomaoz = new Image()
//     pomaoz.src = `a${t}.png`
//     pomao.push(pomaoz)
// }
let fruits = new Image()
fruits.src = "fruitline5.png" //71 is carrot
let pomaoimg = new Image()
pomaoimg.src = "grodmao.png" //71 is carrot
// let num = 28
canvas_context.imageSmoothingEnabled = true
output_canvas_context.imageSmoothingEnabled = true

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

for (let t = 0; t < 32; t++) {
    console.log(dec2bin(t))
}

let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]

let b1 = document.getElementById('b1') //getting canvas from document
let b2 = document.getElementById('b2') //getting canvas from document
let b3 = document.getElementById('b3') //getting canvas from document
let b4 = document.getElementById('b4') //getting canvas from document
let b5 = document.getElementById('b5') //getting canvas from document
let run = document.getElementById('run') //getting canvas from document
function Indexer(num) {
    let xs = Math.min(Math.max(Math.floor(num / 4) % 28, 0), 28)
    let ys = Math.min(Math.max(Math.floor(num / 400), 0), 28)
    let points = [{ 'x': Math.max(xs - 1, 0), 'y': Math.max(ys - 1, 0) }, { 'x': xs, 'y': Math.max(ys - 1, 0) }, { 'x': Math.min(xs + 1, 100), 'y': Math.max(ys - 1, 0) }, { 'x': Math.max(xs - 1, 0), 'y': ys }, { 'x': xs, 'y': ys }, { 'x': Math.min(xs + 1, 100), 'y': ys }, { 'x': Math.max(xs - 1, 0), 'y': Math.min(ys + 1, 100) }, { 'x': xs, 'y': Math.min(ys + 1, 100) }, { 'x': Math.min(xs + 1, 100), 'y': Math.min(ys + 1, 100) }]
    return points
}

function Reverser(x, y) {
    let xs = Math.floor(x * 4)
    let ys = Math.floor(y * 400)
    return Math.min(xs + ys, 39860)
}


// canvas_context.fillRect(50,50,1,1)
let pix = canvas_context.getImageData(0, 0, 28, 28)
// output_canvas_context.drawImage(s0[0], 0, 0, s0[0].width, s0[0].height, 0, 0, 28, 28)
let outpix = output_canvas_context.getImageData(0, 0, 28, 28)
let fcount = 0
// let fruits = new
let inputs = []

let target = -1
let index = 0
let gstep = 0
let capout = 0
let yn = []
let lock = 0
let scount = 0
let score = 0
async function main() {
    if (!keysPressed['t']) {
        lock = 0
    }
    if (lock == 1) {
        return
    }
    if(!keysPressed['t']){


    canvas_context.fillStyle = "white"
    canvas_context.fillRect(1, 1, 718, 718)
    for (let t = 0; t < freepoints.length; t++) {
        if (keysPressed['w']) {
            freepoints[t].y--
                numset = []
            numset2 = []
            indx = []
        }
        if (keysPressed['s']) {
            freepoints[t].y++
                numset = []
            numset2 = []
            indx = []
        }
        if (keysPressed['a']) {
            freepoints[t].x--
                numset = []
            numset2 = []
            indx = []
        }
        if (keysPressed['d']) {
            freepoints[t].x++
                numset = []
            numset2 = []
            indx = []
        }
        let circ = new Circle(freepoints[t].x, freepoints[t].y, 24, "black")
        circ.draw()
        if (t > 0 && keysPressed['e']) {
            let line = new LineOP(freepoints[t], freepoints[t - 1], "black", 40)
            line.draw()
        }
    }


    output_canvas_context.drawImage(canvas, 0, 0, canvas.width, 720, 0,0, 28, 28)

    outpix = output_canvas_context.getImageData(0, 0, 28, 28)
    let alt = []
    let inputs = []
    for (let t = 0; t < outpix.data.length; t += 4) {
        alt.push(t)
        inputs.push(new Data(Math.abs(1 - (outpix.data[t] / 255))))
    }
    perc.zompute(inputs)

    
    let f = []
    for(let t = perc.ztructure[0].length-10;t<perc.ztructure[0].length;t++){
        f.push(perc.ztructure[0][t])
    }
    let max = 0
    let out = -1
    for(let t = 0;t<10;t++){
        if(f[t] > max){
            max = f[t]
            out = t
        }
    }
    let outs = []
    for(let t = perc.outputs.length-10;t<perc.outputs.length;t++){
        outs.push(Math.floor(perc.outputs[t].valueOf()*100)/100)
    }
    // console.log(out, outs)

    
    if(freepoints.length > 0){

        canvas_context.font = "30px arial"
        canvas_context.fillStyle = "black"
        canvas_context.fillText(out, 40, 40)
    }


    }else{

        target+=(Math.floor(Math.random()*11))
        // if (target == 10) {
            index++
            index %= 1
        // }
        target %= 10
    
    
        // if (keysPressed['b']) {
        //     b = []
        //     for (let t = 0; t < 100; t++) {
        //         let a = []
        //         for (let k = 0; k < 100; k++) {
        //             let fx = 0
        //             for (let d = 0; d < 10; d++) {
        //                 fx += (Math.random() - .5) / 10
        //             }
        //             if (keysPressed['z']) {
    
        //                 a.push(1 + fx)
        //             } else {
    
        //                 a.push(1 + 0)
        //             }
        //         }
        //         b.push(a)
        //     }
        // }
        canvas_context.imageSmoothingEnabled = true
        canvas_context.fillStyle = "white"
        pix = canvas_context.getImageData(0, 0, 28, 28)
        output_canvas_context.clearRect(0, 0, 28, 28)
    
        output_canvas_context.fillStyle = "white"
        output_canvas_context.fillRect(0, 0, 28, 28)
        // if (target == 0) {
        //     output_canvas_context.drawImage(s0[index], 0, 0, s0[index].width, s0[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 1) {
        //     output_canvas_context.drawImage(s1[index], 0, 0, s1[index].width, s1[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 2) {
        //     output_canvas_context.drawImage(s2[index], 0, 0, s2[index].width, s2[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 3) {
        //     output_canvas_context.drawImage(s3[index], 0, 0, s3[index].width, s3[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 4) {
        //     output_canvas_context.drawImage(s4[index], 0, 0, s4[index].width, s4[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 5) {
        //     output_canvas_context.drawImage(s5[index], 0, 0, s5[index].width, s5[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 6) {
        //     output_canvas_context.drawImage(s6[index], 0, 0, s6[index].width, s6[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 7) {
        //     output_canvas_context.drawImage(s7[index], 0, 0, s7[index].width, s7[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 8) {
        //     output_canvas_context.drawImage(s8[index], 0, 0, s8[index].width, s8[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // } else if (target == 9) {
        //     output_canvas_context.drawImage(s9[index], 0, 0, s9[index].width, s9[index].height,(Math.random()-.5)*0,(Math.random()-.5)*0, 28, 28)
        // }
    
        outpix = output_canvas_context.getImageData(0, 0, 28, 28)
        // let foutpix = output_canvas_context.getImageData(0, 0, 28, 28)
        // for(let t = 0;t<outpix.data.length;t++){
        //     outpix.data[t] = foutpix.data[t]
        // }
        // let ratio = (Math.random() * 1.2) + .2
        // let ratio2 = (Math.random() * 1.5) + 1
        // for (let t = 0; t < 28; t++) {
        //     output_canvas_context.drawImage(output_canvas, 0, t, 28, 1, 0 + (Math.cos(t * ratio) * ratio2), t, 28, 1)
        // }
        inputs = []
        for (let t = 0; t < outpix.data.length; t += 4) {
            inputs.push(new Data(Math.abs(1 - (outpix.data[t] / 255))))
        }
    
    
        perc.zompute(inputs)
    
        let f = []
        for(let t = perc.ztructure[0].length-10;t<perc.ztructure[0].length;t++){
            f.push(perc.ztructure[0][t])
        }
        let max = 0
        let out = -1
        for(let t = 0;t<10;t++){
            if(f[t] > max){
                max = f[t]
                out = t
            }
        }
        if(out == target){
            score++
            scount++
        }else{
            scount++
        }   
    
        if (keysPressed['l']) {
            console.log(score/scount, score, scount)
            console.log(perc)
        }
        if(keysPressed['r']){
            score = 0
            scount = 0
        }
    
        inputs = []
        for (let t = 0; t < perc.ztructure[0].length - 10; t++) {
            inputs.push(new Data(perc.ztructure[0][t].valueOf()))
        }
        for(let t = 0;t<10;t++){
            let val = 0
            if(t == target){
                val = 1
            }
            inputs.push(new Data(val))
        }
        // console.log(inputs)
    
        // perc.zalculateDeltasSigmoid(inputs)
        // perc.zadjustWeights()

    }
    canvas_context.strokeStyle = "blue"
    canvas_context.strokeRect(180, 180, 720 - 360, 720 - 360)
    canvas_context.font = "30px arial"
    canvas_context.fillStyle = "white"
    canvas_context.fillText("Clear", 200, 800)






    if (keysPressed['x'] || TIP_engine.y > 720) {
        numset = []
        freepoints = []
    }

    let color = ''
    let kf = 0





    // if (keysPressed['y']) {
    //     keysPressed['y'] = false

    //     smerpo = []
    //     for (let g = 0; g < 14; g += 1.75) {
    //         for (let m = 0; m < 14; m += 1.75) {


                // console.log()

    //             let sperc = new Network(inpiut, [256, 128, 64, 10]) //, new Data(0), new Data(0), new Data(0)
    //             sperc.becomeNetworkFrom(perc.log())
    //             sperc.zompute(inputs)
    //             smerpo.push(sperc)


    //             for (let t = 0; t < 10; t++) {
    //                 if (t == target) {
    //                     exput.push(new Data(1))
    //                 } else {
    //                     exput.push(new Data(0))
    //                 }
    //             }
    //             // perc.calculateDeltasSigmoid(exput)
    //             // perc.adjustWeights()

    //             for (let t = 0; t < perc.outputs.length; t++) {
    //                 if (perc.outputs[t] > kf) {
    //                     faces = t
    //                     kf = perc.outputs[t]
    //                 }
    //             }
    //             for (let t = 0; t < perc.outputs.length; t++) {
    //                 if (t != faces) {
    //                     // faces = t
    //                     kf -= perc.outputs[t]
    //                 }
    //             }
    //             numset.push(faces)
    //             if (kf > 0) {
    //                 numset2.push(Math.sqrt(kf))
    //             } else {
    //                 numset2.push(0)
    //             }
    //         }

    //     }




    // }



    let dooo = 0
    if (keysPressed['n']) {

        console.log("start")
        dooo++
        keysPressed['n'] = false
        target = faces
        // trp.faces = faces
        index = 0
        indx = []
        smerpo = []
        smerpo2 = []
        supa = 0
    }
    // if (supa < 2999) {
    //     let difx = 0
    //     supa++
    //     for (let i = Math.min(supa, 2999); i < Math.min(supa + 1, 2999); i += 1) {
    //         index++
    //         index %= 3000
    //             // console.log(index, "index")
    //         dooo++
    //         smerpo2 = []
    //         smerpo = []
    //         for (let g = 0; g < 14; g += 1.75) {
    //             for (let m = 0; m < 14; m += 1.75) {





    //                 // target++
    //                 // if (target == 10) {
    //                 // }
    //                 // target %= 10


    //                 // if (keysPressed['b']) {
    //                 //     b = []
    //                 //     for (let t = 0; t < 100; t++) {
    //                 //         let a = []
    //                 //         for (let k = 0; k < 100; k++) {
    //                 //             let fx = 0
    //                 //             for (let d = 0; d < 10; d++) {
    //                 //                 fx += (Math.random() - .5) / 10
    //                 //             }
    //                 //             if (keysPressed['z']) {

    //                 //                 a.push(1 + fx)
    //                 //             } else {

    //                 //                 a.push(1 + 0)
    //                 //             }
    //                 //         }
    //                 //         b.push(a)
    //                 //     }
    //                 // }
    //                 canvas_context.imageSmoothingEnabled = true
    //                 canvas_context.fillStyle = "white"
    //                 pix = canvas_context.getImageData(0, 0, 28, 28)
    //                 output_canvas_context.clearRect(0, 0, 28, 28)

    //                 output_canvas_context.fillStyle = "white"
    //                 output_canvas_context.fillRect(0, 0, 28, 28)
    //                 if (target == 0) {
    //                     output_canvas_context.drawImage(s0[index], g - 7, m - 7, s0[index].width, s0[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 1) {
    //                     output_canvas_context.drawImage(s1[index], g - 7, m - 7, s1[index].width, s1[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 2) {
    //                     output_canvas_context.drawImage(s2[index], g - 7, m - 7, s2[index].width, s2[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 3) {
    //                     output_canvas_context.drawImage(s3[index], g - 7, m - 7, s3[index].width, s3[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 4) {
    //                     output_canvas_context.drawImage(s4[index], g - 7, m - 7, s4[index].width, s4[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 5) {
    //                     output_canvas_context.drawImage(s5[index], g - 7, m - 7, s5[index].width, s5[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 6) {
    //                     output_canvas_context.drawImage(s6[index], g - 7, m - 7, s6[index].width, s6[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 7) {
    //                     output_canvas_context.drawImage(s7[index], g - 7, m - 7, s7[index].width, s7[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 8) {
    //                     output_canvas_context.drawImage(s8[index], g - 7, m - 7, s8[index].width, s8[index].height, g - 7, m - 7, 28, 28)
    //                 } else if (target == 9) {
    //                     output_canvas_context.drawImage(s9[index], g - 7, m - 7, s9[index].width, s9[index].height, g - 7, m - 7, 28, 28)
    //                 }



    //                 // output_canvas_context.drawImage(canvas, 0, 0, canvas.width, 720, g - 7, m - 7, 28, 28)

    //                 outpix = output_canvas_context.getImageData(0, 0, 28, 28)
    //                 let alt = []
    //                 let inputs = []
    //                 for (let t = 0; t < outpix.data.length; t += 4) {
    //                     alt.push(t)
    //                     inputs.push(new Data(Math.abs(1 - (outpix.data[t] / 255))))
    //                 }
    //                 perc.zompute(inputs)

    //                 // console.log(xummy.structure[0])
    //                 // console.log(perc.structure[0])
    //                 // return

    //                 let sperc = new NetworkDummy(inpiut, [256, 128, 64, 10]) //, new Data(0), new Data(0), new Data(0)
    //                     // sperc.becomeNetworkFrom(perc.log())
    //                     // sperc.zompute(inputs)

    //                 for (let t = 0; t < perc.structure.length; t++) {
    //                     for (let k = 0; k < perc.structure[t].length; k++) {
    //                         sperc.structure[t][k].value = 0
    //                     }
    //                 }

    //                 for (let t = 0; t < perc.structure.length; t++) {
    //                     for (let k = 0; k < perc.structure[t].length; k++) {
    //                         sperc.structure[t][k].value += perc.structure[t][k].valueOf()
    //                     }
    //                 }



    //                 smerpo.push(sperc)


    //                 // for (let t = 0; t < 10; t++) {
    //                 //     if (t == target) {
    //                 //         exput.push(new Data(1))
    //                 //     } else {
    //                 //         exput.push(new Data(0))
    //                 //     }
    //                 // }
    //                 // perc.calculateDeltasSigmoid(exput)
    //                 // perc.adjustWeights()

    //                 // for (let t = 0; t < perc.outputs.length; t++) {
    //                 //     if (perc.outputs[t] > kf) {
    //                 //         faces = t
    //                 //         kf = perc.outputs[t]
    //                 //     }
    //                 // }

    //                 // for (let t = 0; t < perc.outputs.length; t++) {
    //                 //     if (t != faces) {
    //                 //         // faces = t
    //                 //         kf -= perc.outputs[t]
    //                 //     }
    //                 // }
    //                 // numset.push(faces)
    //                 // if (kf > 0) {
    //                 //     numset2.push(Math.sqrt(kf))
    //                 // } else {
    //                 //     numset2.push(0)
    //                 // }
    //             }

    //         }

    //         // indx.push(difx)

    //         nummy = new NetworkDummy(inpiut, [256, 128, 64, 10])
    //             // nummy.becomeNetworkFrom(perc.log())
    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     nummy.structure[t][k].value = 0
    //                 }
    //             }
    //         }
    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     nummy.structure[t][k].value += smerpo[r].structure[t][k].valueOf()
    //                 }
    //             }
    //         }
    //         indx.push(xummy.compare(nummy).difference)
    //         smerpo = []



    //     }


    //     let ind = -1
    //     let indb = -1
    //     let diffmin = -1
    //     let diffmax = 9999999999999

    //     qz = []

    //     for (let d = 0; d < indx.length; d++) {
    //         qz.push(new Circle(indx[d], d, 0, ""))
    //     }

    //     qz.sort((a, b) => a.x < b.x ? 1 : -1)
    //         // console.log(qz)

    //     for (let d = 0; d < indx.length; d++) {
    //         if (diffmin < indx[d]) {
    //             diffmin = indx[d]
    //             ind = d
    //         }
    //         if (diffmax > indx[d]) {
    //             diffmax = indx[d]
    //             indb = d
    //         }
    //     }

    //     console.log(ind, indb)
    //     trp.ind = ind
    //     trp.indb = indb
    //         // trp.faces = xummy.faces


    // }




    // if (keysPressed['u']) {
    //     if (keysPressed['z']) {

    //         keysPressed['z'] = false
    //         keysPressed['u'] = false
    //         xummy = new Network(inpiut, [256, 128, 64, 10])
    //         xummy.becomeNetworkFrom(perc.log())
    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     xummy.structure[t][k].value = 0
    //                 }
    //             }
    //         }
    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     xummy.structure[t][k].value += smerpo[r].structure[t][k].valueOf()
    //                 }
    //             }
    //         }

    //         console.log("check")
    //     }

    //     if (keysPressed['m']) {
    //         keysPressed['m'] = false
    //         keysPressed['u'] = false

    //         let summy = new Network(inpiut, [256, 128, 64, 10])
    //         summy.becomeNetworkFrom(perc.log())

    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     summy.structure[t][k].value = 0
    //                 }
    //             }
    //         }
    //         for (let r = 0; r < smerpo.length; r++) {
    //             for (let t = 0; t < smerpo[r].structure.length; t++) {
    //                 for (let k = 0; k < smerpo[r].structure[t].length; k++) {
    //                     summy.structure[t][k].value += smerpo[r].structure[t][k].valueOf()
    //                 }
    //             }
    //         }
    //         console.log(summy.compare(xummy))

    //         console.log("c2heck")
    //     }
    // }


    // for (let t = 0; t < 10; t++) {
    // if (faces == target) {
    //     color = "green"
    //     yn.push(1)
    // } else {
    //     color = "red"
    //     yn.push(0)
    //     if (keysPressed['t']) {
    //         lock = 1
    //     }
    // }
    // }
    // if (keysPressed['f']) {
    //     console.log(inputs, exput)
    //     let gh = 0
    //     for (let t = 0; t < yn.length; t++) {
    //         gh += yn[t]
    //     }
    //     console.log(gh / yn.length, "tot", gh, yn.length)
    //     let bg = 0
    //     for (let t = Math.max(0, yn.length - 10000); t < yn.length; t++) {
    //         bg += yn[t]
    //     }
    //     console.log(bg / 10000, "mov")
    // }
    // if (keysPressed['g'] || lock == 1) {
    //     canvas_context.clearRect(0, 28, 720, 1280)
    //     canvas_context.clearRect(28, 0, 720, 1280)
    //     // let v = new Viewer(perc, freepoints)
    //     // v.draw()
    //     lock = 1
    // }

    // let m = {}
    // for (let t = 0; t < numset.length; t++) {
    //     if (m[numset[t]]) {
    //         m[numset[t]] += numset2[t]
    //     } else {
    //         m[numset[t]] = numset2[t]
    //     }
    // }

    // let maxx = -1
    // let num = -1
    // let fg = Object.keys(m)

    // for (let t = 0; t < fg.length; t++) {
    //     if (maxx < m[fg[t]]) {
    //         maxx = m[fg[t]]
    //         num = fg[t]
    //     }
    // }

    // canvas_context.clearRect(0, 0, 90, 90)
    // canvas_context.fillStyle = color
    // canvas_context.font = '55px arial'
    //     // canvas_context.fillText(faces, 25, 55)
    // if (freepoints.length > 0) {
    //     canvas_context.fillText(num, 25, 55)

    //     trp.faces = num
    // }
    // if (Object.keys(keysPressed).length == 0) {
    //     canvas_context.strokeStyle = "blue"
    //     canvas_context.strokeRect(180, 180, 720 - 360, 720 - 360)
    // }


    // if (trp.ind > -1 || keysPressed['i']) {
    //     target = trp.faces
    //     canvas_context.fillStyle = "red"
    //     canvas_context.fillRect(200 - 3, 860 - 3, 29 * 3, 29 * 3)
    //     if (qz.length > 10) {
    //         for (let s = 0; s < 10; s++) {
    //             if (target == 0) {
    //                 canvas_context.drawImage(s0[qz[s].y], 0, 0, s0[qz[s].y].width, s0[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 1) {
    //                 canvas_context.drawImage(s1[qz[s].y], 0, 0, s1[qz[s].y].width, s1[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 2) {
    //                 canvas_context.drawImage(s2[qz[s].y], 0, 0, s2[qz[s].y].width, s2[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 3) {
    //                 canvas_context.drawImage(s3[qz[s].y], 0, 0, s3[qz[s].y].width, s3[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 4) {
    //                 canvas_context.drawImage(s4[qz[s].y], 0, 0, s4[qz[s].y].width, s4[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 5) {
    //                 canvas_context.drawImage(s5[qz[s].y], 0, 0, s5[qz[s].y].width, s5[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 6) {
    //                 canvas_context.drawImage(s6[qz[s].y], 0, 0, s6[qz[s].y].width, s6[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 7) {
    //                 canvas_context.drawImage(s7[qz[s].y], 0, 0, s7[qz[s].y].width, s7[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 8) {
    //                 canvas_context.drawImage(s8[qz[s].y], 0, 0, s8[qz[s].y].width, s8[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 9) {
    //                 canvas_context.drawImage(s9[qz[s].y], 0, 0, s9[qz[s].y].width, s9[qz[s].y].height, 70 + (((((s))) >= 5) * (3 * 28)), 860 - ((((((s))) >= 5) * (3 * 28)) * 5) + (s * 3 * 28), 28 * 3, 28 * 3)
    //             }

    //         }
    //     }

    //     canvas_context.fillStyle = "green"
    //     canvas_context.fillRect(350 - 3, 860 - 3, 29 * 3, 29 * 3)


    //     target = trp.faces
    //     if (qz.length > 10) {

    //         for (let s = qz.length - 1; s > qz.length - 11; s--) {

    //             console.log(s, qz.length, ((qz.length - s) - 1))
    //             if (target == 0) {
    //                 canvas_context.drawImage(s0[qz[s].y], 0, 0, s0[qz[s].y].width, s0[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 1) {
    //                 canvas_context.drawImage(s1[qz[s].y], 0, 0, s1[qz[s].y].width, s1[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 2) {
    //                 canvas_context.drawImage(s2[qz[s].y], 0, 0, s2[qz[s].y].width, s2[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 3) {
    //                 canvas_context.drawImage(s3[qz[s].y], 0, 0, s3[qz[s].y].width, s3[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 4) {
    //                 canvas_context.drawImage(s4[qz[s].y], 0, 0, s4[qz[s].y].width, s4[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 5) {
    //                 canvas_context.drawImage(s5[qz[s].y], 0, 0, s5[qz[s].y].width, s5[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 6) {
    //                 canvas_context.drawImage(s6[qz[s].y], 0, 0, s6[qz[s].y].width, s6[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 7) {
    //                 canvas_context.drawImage(s7[qz[s].y], 0, 0, s7[qz[s].y].width, s7[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 8) {
    //                 canvas_context.drawImage(s8[qz[s].y], 0, 0, s8[qz[s].y].width, s8[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             } else if (target == 9) {
    //                 canvas_context.drawImage(s9[qz[s].y], 0, 0, s9[qz[s].y].width, s9[qz[s].y].height, 390 + (((((qz.length - s) - 1)) >= 5) * (3 * 28)), 860 - (((((qz.length - s) - 1)) >= 5) * (3 * 28) * 5) + ((((qz.length - s) - 1)) * 3 * 28), 28 * 3, 28 * 3)
    //             }

    //         }
    //     }


    //     canvas_context.fillStyle = "white"
    //     canvas_context.drawImage(canvas, 0, 0, 720, 720, 275, 760, 28 * 3, 28 * 3)
    //     canvas_context.fillRect(275, 760, 10, 10)

    // }


    canvas_context.fillStyle = "black"
    // canvas_context.fillText(supa + "/2999", 20, 150)



}





// }   
canvas_context.putImageData(pix, 0, 0)
if (keysPressed['l']) {

    console.log(perc)
}



let clearflag = 0

function clear() {
    clearflag = 1
}
async function draw() {
    window.setInterval(async function () {
        await main()
    }, 1)
    run.onclick = clear
}
run.onclick = draw

// })



function add(x, y) {
    return x + y
}

function mult(x, y) {
    return x * y
}

function addMult(x, y, v = 0) {
    return ((x + y) * Math.abs(v - 1)) + ((x * y) * v)
}



let g = 5
let e = 7

function FunkyFunk(first, second) {

    return (first - second) * second
}

let k = FunkyFunk(e, g)



// let numbers = [1, 2, 3, 4, 5, 6]
// let goal = 3

// function twoSum(list, target) {
//     let anti = {}
//     for (let t = 0; t < list.length; t++) {
//         if (typeof anti[`${list[t]}`] == "object") {
//             return { '1': anti[`${list[t]}`].i, '2': t }
//         }
//         anti[`${target - list[t]}`] = { 'v': list[t], 'i': t }
//     }
// }

// console.log(twoSum(numbers, 7))