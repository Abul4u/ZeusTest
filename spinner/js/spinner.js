// init();
// function init() {
// tweak these options

var stageWidth = 250,   // svg width
    stageHeight = 250, // svg height,

    // Spinner Div
    spinnerDiv = d3.select('#spinner-div'),     // select spinner container
    no_pieces = parseInt(document.getElementById('select-number').value),       // setting no of piece of spinner
    svgElement,         // SVG element
    gElement,           // group of g element   (Direct child of SVG element)

    // Spinner properties
    radius = 62.5;       // radius of circle
    diameter = radius * 2,     // diameter of cirlce
    rotate = 0,         // spinner rotation property
    speed = 2500,       // spinner speed

    // Center Circle Property
    cr = 10,
    cx = stageWidth / 2,
    cy = stageHeight / 2,
    startOffset = '50%';

// return no of Spinner pieces
function data() {
    return new Array(no_pieces);
}

var b = no_pieces,              // no of pieces
    c = stageWidth/2;           // find half of stage width
    d = 0.65 * c,                
    e = 3 * Math.PI / 2;    

var dif_add = 2 * Math.PI / b;

// setting position of individual Pieces of path
function piecePos() {
    var data = piecePosition(c, c, c, e, e + dif_add);
    e += dif_add;
    return data;
}

// setting numbers over spinner
function textPos() {
    e += dif_add;
    return piecePosition(c, c, d, e - dif_add, e, !0);
}

var piecePosition = function (b, c, d, e, f, g) {
    // d="M 216 58                      Moveto x,y absolute position
    // A 116 116  0  0 1  216 174       Arc  rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y
    // L 116 116                        L   x,y
    // Z"                               Z   straight line
    var dAttr = "M " + Math.round(b + d * Math.cos(e)) + " " + Math.round(c + d * Math.sin(e)) +
        "\n A " + d + " " + d + " 0 0 1 " + Math.round(b + d * Math.cos(f)) + " " + Math.round(c + d * Math.sin(f));
    g || (dAttr += "\n L " + b + " " + c + " Z");
    return dAttr;
}

// removing everyting from Spinner div
spinnerDiv.selectAll('*').remove();

// creating svg element
var svgElement = spinnerDiv.append('svg');

// on drag function call
svgElement.call(d3.drag().on('drag', dragging)); //.on('end', end) );

// adding attributes to svg element
svgElement
    .attr('class', 'spinner spinner-shadow')
    .attr('id', 'spinner');
    // .style('transform', 'translateZ(0px) rotate(3rad)')
    // .style('transition', 'transform 2.25s cubic-bezier(.4,0,.2,1)');

// creating group element g & assigning a class to it
gElement = svgElement.append('g');
gElement.attr('class', 'spinner-center');

// creating Path group elements g
var pathGroup = gElement.selectAll('path')
    .data(data)
    .enter()
    .append('g');

// adding attributes to individual path Element
pathGroup.append('path')
    .attr('class', function (d, i) {
        var e = ["spinner-piece-color1", "spinner-piece-color2", "spinner-piece-color3"];   // color for different path
        var f = ((1 == no_pieces % 2) ? e[i % 3] : e[i % 2]);     // setting color value
        1 == no_pieces % 6 && i == no_pieces - 1 && (f = e[1]);     // 
        return 'spinner-piece ' + f;    // returning class of color
    })
    .attr('d', piecePos);

// Path Element for text
pathGroup.append('path')
    .attr('class', 'spinner-text-path')
    .attr('id', function (d, i) { return 'textPath' + (i + 1) })
    .attr('d', textPos);

// Append text element to pathGroup element
pathGroup.append('text');

// Append textPath element to text element
pathGroup.select('text').append('textPath')
    .attr('startOffset', startOffset)
    .attr('xlink:href', function (d, i) { return '#textPath' + (i + 1) })
    .text(function (d, i) { return i + 1 });

// Append circle to SVG element
svgElement.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', cr)
    .attr('fill', 'blue');


svgElement.style('transform', 'translateZ(0px) rotate(3rad)')
            .style('transition', 'transform 2.25s cubic-bezier(.35,0,.2,1)');

// Drag function for SVG Element
function dragging() {
    // console.log( "X: " + d3.event.x + " Y: " + d3.event.y );
    var x = d3.event.x;
    var y = d3.event.y;
    console.log("X: " + x + " Y: " + y);
    //rotate += ( -Math.atan2(y - stageWidth/2, x - stageHeight/2) + Math.PI );
    var xyGreater = Math.abs(y) > Math.abs(x);
    if (xyGreater == true) {
        rotate += Math.atan2(y, x);
        console.log("First true Math.atan(): " + Math.atan2(y, x) + " rotate:" + rotate + Math.PI);
    } else {
        rotate += -Math.atan2(y, x);
        console.log("First false Math.atan(): " + Math.atan2(y, x) + " rotate:" + rotate + Math.PI);
    }
    svgElement.style('transform', 'rotate(' + rotate + 'rad)');

}

// Button Event Listner
document.getElementById('spin').addEventListener('click', function(){
    spin();
})

function spin() {
    rotate += 25;
    svgElement.style('transform', 'rotate(' + rotate + 'rad)');
}


//}




// function spinButton(svg, svgAxisObject){

//     var piece = 10 > d3.select('.spinner-center'). ? 3 : 2
//       , e = 2 * Math.PI;
//     c = (void 0 != c ? c * a.mb.duration / (2 * Math.PI * (s_q(a.mb.$R).width / 2)) : a.ha ? 64 : Math.random() * d + 1) * e;
//     b ? s_Yvb(a, a.mb.xL + c, a.mb.duration) : s_Yvb(a, a.mb.xL - c, a.mb.duration);


// }



