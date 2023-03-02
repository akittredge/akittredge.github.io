var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
//drawClock();
setInterval(drawClock, 30)

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  drawTicks(ctx, radius);
  drawDay(ctx,radius);
  drawDate(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;

  ctx.beginPath() // Start
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = radius*0.08;
  ctx.stroke(); // End

  //Center circle
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
  ctx.fillStyle = '#000000';
  ctx.lineWidth = radius * 0.1;
  ctx.fill();
}

function drawNumbers(ctx, radius){
  var ang;
  var num;
  ctx.font = (radius * 0.2) + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.8);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.8);
    ctx.rotate(-ang);
  }
}

function drawTicks(ctx, radius){
  var ang;
  var num;
  for (num=5; num < 65; num +=5){
    ang = num * Math.PI / 30;
    ctx.beginPath();
    ctx.rotate(ang);
    ctx.lineWidth = radius * 0.025;
    ctx.moveTo(0,-radius * 0.97);
    ctx.lineTo(0, -radius * 0.92);
    ctx.stroke();
    ctx.rotate(-ang);
  }
  
  for (num=1; num < 61; num++){
    ang = num * Math.PI / 30;
    ctx.beginPath();
    ctx.rotate(ang);
    ctx.lineWidth = radius * 0.015;
    ctx.moveTo(0,-radius * 0.96);
    ctx.lineTo(0, -radius * 0.945);
    ctx.stroke();
    ctx.rotate(-ang);
  }

}

function drawTime(ctx, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds() + (now.getMilliseconds() / 1000);
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.05);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.05);
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.8825, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawDay(ctx, radius){
  var now = new Date();
  var dayNum = now.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var dayAbbrev = days[dayNum];
  ctx.strokeRect(radius * 0.135, -radius *0.09, radius*0.325, radius*0.18);
  ctx.font = (radius * 0.15) + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(dayAbbrev,radius*0.3, 0);
}

function drawDate(ctx, radius){
  var now = new Date();
  var nowDate = now.getDate();
  if (nowDate < 10){
    zero = "0";
    nowDate = zero.concat(nowDate.toString()); 
  } 
  ctx.strokeRect(radius * 0.5, -radius *0.09, radius*0.2, radius*0.18);
  ctx.font = (radius * 0.15) + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(nowDate.toString(),radius*0.6, 0);
}
