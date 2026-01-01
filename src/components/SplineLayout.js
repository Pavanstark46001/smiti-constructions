import React, { useRef, useEffect } from "react";
import houseImage from "../asstes/image1.jpg";

export default function HouseImageParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const img = new Image();
        img.src = houseImage;

        const particles = [];

        img.onload = () => {
            // Draw image to offscreen canvas
            const tempCanvas = document.createElement("canvas");
            const tctx = tempCanvas.getContext("2d");

            const scale = 0.6;
            tempCanvas.width = img.width * scale;
            tempCanvas.height = img.height * scale;

            tctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

            const imgData = tctx.getImageData(
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
            ).data;

            // Create particles from visible pixels
            for (let y = 0; y < tempCanvas.height; y += 4) {
                for (let x = 0; x < tempCanvas.width; x += 4) {
                    const index = (y * tempCanvas.width + x) * 4;
                    const alpha = imgData[index + 3];

                    if (alpha > 150) {
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            tx: x + canvas.width / 2 - tempCanvas.width / 2,
                            ty: y + canvas.height / 2 - tempCanvas.height / 2,
                        });
                    }
                }
            }

            animate();
        };

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += (p.tx - p.x) * 0.07;
                p.y += (p.ty - p.y) * 0.07;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "#FF9FFC";
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                height: "900px",
                background: "#0a0a0a",
                borderRadius: "12px",
            }}
        />
    );
}
