const canvas = document.getElementById("gaugeCanvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 26;

const gaugeImages = {
    "Boost_Pressure": "static/assets/Images/Boost_Pressure.png",
    "Engine_Temp": "static/assets/Images/Engine_Temp.png",
    "Fuel_Pressure": "static/assets/Images/Fuel_Pressure.png",
    "O2": "static/assets/Images/O2.png",
    "Oil_Pressure": "static/assets/Images/Oil_Pressure.png",
    "Oil_Temp": "static/assets/Images/Oil_Temp.png",
}

function drawNumber(context, x, y, value) {
    context.fillStyle = "white";
    context.font = "30px Arial"; 
    context.textAlign = "center";
    context.fillText(value.toString(), x, y);
}

function drawGaugeAndNumber(value) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius , Math.PI, 0);
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 8; 
    ctx.stroke();
    ctx.beginPath();
    const startAngle = Math.PI; 
    const endAngle = Math.PI + (value / 100) * Math.PI; 
    ctx.arc(centerX, centerY, radius + 18, startAngle, endAngle);
    ctx.strokeStyle = "green"; 
    ctx.lineWidth = 17; 
    ctx.stroke();


    drawNumber(ctx, centerX, centerY + 30, value); 
    const imageSize = 90;
    const imageOffsetY= 20;
    const image = new Image();
    const imageX = centerX - imageSize / 2;
    const imageY = centerY - imageSize / 2 - imageOffsetY;
    image.src = "static/assets/Images/Engine_Temp.png"; 
    image.onload = function () {
        console.log("Image Loaded");
        ctx.drawImage(image, imageX, imageY, imageSize, imageSize); 
    };
}

let ecuValue = 30;

function updateECUValue() {
    const ecuUpdateInterval = 1000;
    setTimeout(updateECUValue, ecuUpdateInterval);
    drawGaugeAndNumber(ecuValue);

    requestAnimationFrame(updateECUValue);
}
updateECUValue();
