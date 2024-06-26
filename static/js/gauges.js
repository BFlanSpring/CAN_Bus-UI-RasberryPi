document.addEventListener("DOMContentLoaded", initializeGauges);

function initializeGauges() {
    const gaugeContainer = document.getElementById("gaugeContainer");
    if (!gaugeContainer) {
        return;
    }
    const gaugeImages = {
        "Boost_Pressure": new Image(),
        "Engine_Temp": new Image(),
        "Fuel_Pressure": new Image(),
        "O2": new Image(),
        "Oil_Pressure": new Image(),
        "Oil_Temp": new Image(),
    };

    gaugeImages["Boost_Pressure"].src = "static/assets/Images/Boost_Pressure.png";
    gaugeImages["Engine_Temp"].src = "static/assets/Images/Engine_Temp.png";
    gaugeImages["Fuel_Pressure"].src = "static/assets/Images/Fuel_Pressure.png";
    gaugeImages["O2"].src = "static/assets/Images/O2.png";
    gaugeImages["Oil_Pressure"].src = "static/assets/Images/Oil_Pressure.png";
    gaugeImages["Oil_Temp"].src = "static/assets/Images/Oil_Temp.png";

    const gaugeTypes = {
        "Engine_Temp": {
            image: gaugeImages["Engine_Temp"],
            unit: "°F", 
            title: "Engine Temp",
            fill_color: "rgba(135, 213, 225, 0.9)",
            safeLevel: "215",
            warningLevel: "235"
        },
        "Boost_Pressure": {
            image: gaugeImages["Boost_Pressure"],
            unit: "PSI",
            title: "Boost Pressure",
            safeLevel: "15",
            warningLevel: "25"
        },
        "Fuel_Pressure": {
            image: gaugeImages["Fuel_Pressure"],
            unit: "PSI",
            title: "Fuel Pressure",
            safeLevel: "40",
            warningLevel: "60"
        },
        "O2": {
            image: gaugeImages["O2"],
            unit: "Ratio 1",
            title: "Air/Fuel",
            safeLevel: "13.8",
            warningLevel: "14.5"
        },
        "Oil_Pressure": {
            image: gaugeImages["Oil_Pressure"],
            unit: "PSI", 
            title: "Oil Pressure",
            safeLevel: "50",
            warningLevel: "110"
        },
        "Oil_Temp": {
            image: gaugeImages["Oil_Temp"],
            unit: "°F",
            title: "Oil Temp",
            safeLevel: "180",
            warningLevel: "225"
            
        }
    };
    
    const canvasElements = {};

    function drawNumber(context, x, y, value, unit) {
        const boxWidth = 200; 
        const boxHeight = 70;
        const boxX = x - boxWidth / 2; 
        const boxY = y - boxHeight / 2; 
        const cornerRadius = 10; 
    
        context.fillStyle = "rgba(224, 142, 38, 1)";
        context.beginPath();
        context.moveTo(boxX + cornerRadius, boxY);
        context.lineTo(boxX + boxWidth - cornerRadius, boxY);
        context.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + cornerRadius);
        context.lineTo(boxX + boxWidth, boxY + boxHeight - cornerRadius);
        context.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - cornerRadius, boxY + boxHeight);
        context.lineTo(boxX + cornerRadius, boxY + boxHeight);
        context.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - cornerRadius);
        context.lineTo(boxX, boxY + cornerRadius);
        context.quadraticCurveTo(boxX, boxY, boxX + cornerRadius, boxY);
        context.closePath();
        context.fill();
    
        context.fillStyle = "white";
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillText(value.toString(), x, y+15);
    }

    function drawTitle(context, x, y, title) {
        context.fillStyle = "white";
        context.font = "30px Arial"; 
        context.textAlign = "center";
        context.fillText(title, x, y);
    }

    function drawGaugeAndNumber(value, gaugeType) {
        const container = document.getElementById("gaugeContainer");

        if (canvasElements[gaugeType]) {
            container.removeChild(canvasElements[gaugeType]);
        }

        const canvas = document.createElement("canvas");
        canvas.id = `${gaugeType.toLowerCase()}Canvas`;
        canvas.width = 300;
        canvas.height = 300;
    
        canvasElements[gaugeType] = canvas;

        container.appendChild(canvas);

        const ctx = document.getElementById(canvas.id).getContext("2d");

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 26;

        const image = gaugeTypes[gaugeType].image;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, 0);
        ctx.strokeStyle = "lightgray";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.beginPath();
        const startAngle = Math.PI;
        const endAngle = Math.PI + (value / (gaugeTypes[gaugeType].warningLevel * 1.3)) * Math.PI;

        const gaugeColor = calculateGaugeColor(value, gaugeTypes[gaugeType].safeLevel, gaugeTypes[gaugeType].warningLevel); // Calculate the gauge color
        ctx.arc(centerX, centerY, radius + 18, startAngle, endAngle);
        ctx.strokeStyle = gaugeColor;
        ctx.lineWidth = 17;
        ctx.stroke();

        drawTitle(ctx, centerX, centerY+50, gaugeTypes[gaugeType].title)
        drawNumber(ctx, centerX, centerY + 105, Math.floor(value));
        
        const imageSize = 115;
        const imageOffsetY = 40;
        const imageX = centerX - imageSize / 2;
        const imageY = centerY - imageSize / 2 - imageOffsetY;

        ctx.drawImage(image, imageX, imageY, imageSize, imageSize);
    }

    function calculateGaugeColor(value, safeLevel, warningLevel) {
        if (value <= safeLevel) {
            return "green";
        } else if (value <= warningLevel) {
            const ratio = (value - safeLevel) / (warningLevel - safeLevel);
            return `rgba(255, ${255 * (1 - ratio)}, 0, 1)`;
        } else {
            const ratio = (value - warningLevel) / (100 - warningLevel);
            return `rgba(255, 0, 0, 1)`; 
        }
    }
    
    let ecuValue1 =235;
    let ecuValue2 = 20;
    let ecuValue3 = 30;
    let ecuValue4 = 13.2;
    let ecuValue5 = 180;
    let ecuValue6 = 112;

    const range = {
        ecuValue1: { min: 200, max: 250, changeFactor: 0.1 },
        ecuValue2: { min: 15, max: 30, changeFactor: 0.2 },
        ecuValue3: { min: 25, max: 40, changeFactor: 0.3 },
        ecuValue4: { min: 13, max: 15, changeFactor: 0.05 },
        ecuValue5: { min: 180, max: 225, changeFactor: 0.4 },
        ecuValue6: { min: 50, max: 120, changeFactor: 0.15 },
    };


    const logButton = document.getElementById("logButton");
    let is_Logging_Enabled = false;

    logButton.addEventListener("click", () => {
        is_Logging_Enabled = !is_Logging_Enabled; 
        logButton.textContent = is_Logging_Enabled ? "Stop Logging" : "Log Data";
        const message = is_Logging_Enabled ? "Logging is now enabled" : "Logging is now disabled";

        fetch("/update-logging", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isLoggingEnabled: is_Logging_Enabled }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error("Error updating logging state:", error);
        });
    });


    function updateECUValues() {
        const ecuUpdateInterval = 100;
        setTimeout(updateECUValues, ecuUpdateInterval);
    
        ecuValue1 = updateValueInRange(ecuValue1, range.ecuValue1.min, range.ecuValue1.max, range.ecuValue1.changeFactor);
        ecuValue2 = updateValueInRange(ecuValue2, range.ecuValue2.min, range.ecuValue2.max, range.ecuValue2.changeFactor);
        ecuValue3 = updateValueInRange(ecuValue3, range.ecuValue3.min, range.ecuValue3.max, range.ecuValue3.changeFactor);
        ecuValue4 = updateValueInRange(ecuValue4, range.ecuValue4.min, range.ecuValue4.max, range.ecuValue4.changeFactor);
        ecuValue5 = updateValueInRange(ecuValue5, range.ecuValue5.min, range.ecuValue5.max, range.ecuValue5.changeFactor);
        ecuValue6 = updateValueInRange(ecuValue6, range.ecuValue6.min, range.ecuValue6.max, range.ecuValue6.changeFactor);
    
        drawGaugeAndNumber(ecuValue1, "Engine_Temp");
        drawGaugeAndNumber(ecuValue2, "Boost_Pressure");
        drawGaugeAndNumber(ecuValue3, "Fuel_Pressure");
        drawGaugeAndNumber(ecuValue4, "O2");
        drawGaugeAndNumber(ecuValue5, "Oil_Temp");
        drawGaugeAndNumber(ecuValue6, "Oil_Pressure");

        function updateValueInRange(value, minValue, maxValue, changeFactor) {
            let newValue = (value + (Math.random() * 2 - 1) * changeFactor);
            newValue = Math.max(Math.min(newValue, maxValue), minValue);
            return newValue;
        }
    
        if (is_Logging_Enabled) {
            logDataToServer(ecuValue1, ecuValue2, ecuValue3, ecuValue4, ecuValue5, ecuValue6);
        }
    }

    function logDataToServer(value1, value2, value3, value4, value5, value6) {

        const data = {
            Engine_Temp: value1,
            Boost_Pressure: value2,
            Fuel_Pressure: value3,
            O2: value4,
            Oil_Temp: value5,
            Oil_Pressure: value6,
        };

        fetch("/log-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data logged successfully:", data);
            })
            .catch((error) => {
                console.error("Error logging data:", error);
            });
    }
    updateECUValues();
}


