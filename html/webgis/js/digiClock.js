let data = [0, 0, 0, 0];

function update() {
const t = new Date();

data[0] = t.getHours();
if(data[0]>12) data[0] = data[0] - 12
if(data[0]<10) data[0] = '0' + data[0];
data[1] = t.getMinutes();
if(data[1] < 10) data[1] = '0' + data[1];
data[2] = t.getSeconds();
if(data[2] < 10) data[2] = '0' + data[2];
data[3] = t.getMilliseconds();
if(data[3] < 10) data[3] = '00' + data[3];
else if(data[3] < 100) data[3] = '0' + data[3];

console.log(data);
}

// create container svg
var svg = d3.select('#clockDIV')
            .append("svg")
            .attr("width", 300)
            .attr("height", 100)
            .attr("id", 'clck')
            .style('fill', 'red');

function draw() {
svg.selectAll("g").remove();

svg
    .append("g")
    .append("text")
    .attr("x", 12)
    .attr("y", 30)
    .attr("font-size", 30)
    .attr("fill", 'black')
    .attr("font-family", "monospace")
    .text(data.join(":"));

console.log(data.join(":"));
}
// draw clock
draw();

setInterval(() => {
update();
draw();
}, 30);