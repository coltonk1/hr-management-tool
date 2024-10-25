import { useState, useEffect } from "react";
import stats_style from "../../styles/Stats.module.css";

import ImageSrc from "../../logo.svg";

function formatNumber(num) {
    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + "m"; // Millions with 2 decimals
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + "k"; // Thousands with 2 decimals
    } else {
        return num.toFixed(num % 1 === 0 ? 0 : 2); // No decimals for whole numbers, 2 decimals for fractions
    }
}

const Graph = ({ amounts, id, color = "#ff0000", title = "", background = true }) => {
    const [currentDay, setCurrentDay] = useState(1728773189350);

    useEffect(() => {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = ImageSrc;

        canvas.width = 1000;
        canvas.height = 300;

        // const amounts = [1000000, 1200000, 900000, 1500000, 1300000, 1750000, 1100000, 1400000, 1600000, 2000000];

        let max = 0;
        let min = amounts[0];
        for (let i = 0; i < amounts.length; i++) {
            max = Math.max(amounts[i], max);
            min = Math.min(amounts[i], min);
        }

        let difference = max - min;
        const labels = [
            formatNumber(max),
            formatNumber(max - difference / 4),
            formatNumber(max - (difference / 4) * 2),
            formatNumber(max - (difference / 4) * 3),
            formatNumber(min),
        ];
        const numRows = labels.length;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const rowSpacing = canvasHeight / (numRows + 1) - 15;

        ctx.fillStyle = "#252530";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "1em Inter, Calibri";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";

        for (let i = 0; i < numRows; i++) {
            const yPosition = rowSpacing * (i + 1) + 30;

            ctx.strokeStyle = "#484848";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(75, yPosition);
            ctx.lineTo(canvasWidth - 50, yPosition);
            ctx.stroke();

            ctx.fillText(labels[i], 70, yPosition + 5);
        }

        ctx.font = "45px bold Inter, Calibri";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.fillText(title, canvasWidth / 2, 45);

        for (let i = 0; i < amounts.length; i++) {
            const date = new Date(currentDay - 86400000 * 7 * (amounts.length - (i + 1)));
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const date2 = new Date(currentDay - 86400000 * 7 * (amounts.length - (i + 0)) + 86400000);
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();

            const xPosition = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75 + 10;

            ctx.strokeStyle = "#484848";
            ctx.lineWidth = 2;

            ctx.save();
            ctx.translate(xPosition, canvasHeight - 80);
            ctx.rotate((-60 / 360) * 2 * Math.PI);
            ctx.font = ".8em Inter, Calibri";
            ctx.fillStyle = "#eee";
            ctx.textAlign = "right";
            ctx.fillText(`${month2}/${day2}-${month}/${day}`, 0, 0);
            ctx.restore();
        }

        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `${color}a0`);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();

        ctx.moveTo(75, rowSpacing * 5 + 30);
        ctx.lineTo(75, rowSpacing * 5 - ((amounts[0] - min) * (rowSpacing * 4)) / (max - min) + 30);
        const smoothness = 3;

        for (let i = 0; i < amounts.length; i++) {
            let y = rowSpacing * 5 - ((amounts[i] - min) * (rowSpacing * 4)) / (max - min) + 30;
            let x = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75;

            if (i > 0) {
                let cp1x = prevX + (x - prevX) / smoothness;
                let cp1y = prevY;
                let cp2x = x - (x - prevX) / smoothness;
                let cp2y = y;

                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            }

            // Save the current point as the previous for the next iteration
            var prevX = x;
            var prevY = y;
        }

        // Close the path by connecting the last point to the bottom
        ctx.lineTo(prevX, rowSpacing * 5 + 30);

        // Fill the closed path with the gradient
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Now, redraw the red lines and circles
        for (let i = 0; i < amounts.length; i++) {
            let y = rowSpacing * 5 - ((amounts[i] - min) * (rowSpacing * 4)) / (max - min) + 30;
            let x = ((canvasWidth - 125) / (amounts.length - 1)) * i + 75;

            // Draw the curved lines (Bezier curves) between circles
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);

                // Control points to make the curve smooth
                let cp1x = prevX + (x - prevX) / smoothness;
                let cp1y = prevY;
                let cp2x = x - (x - prevX) / smoothness;
                let cp2y = y;

                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                ctx.strokeStyle = color;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, rowSpacing * 5 + 30);
            ctx.strokeStyle = `${color}40`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();

            // Save the current point as the previous for the next iteration
            prevX = x;
            prevY = y;
        }

        ctx.lineWidth = 2;

        image.onload = () => {
            const IMAGE_SIZE = 50;
            ctx.globalAlpha = 0.3;
            ctx.filter = "grayscale(100%)";
            ctx.drawImage(image, canvas.width - 45, 0, IMAGE_SIZE, (IMAGE_SIZE * image.height) / image.width);
        };
    }, []);

    return <canvas id={id} className={stats_style.canvas}></canvas>;
};

export default Graph;
