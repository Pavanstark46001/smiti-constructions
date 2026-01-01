import React, { useRef, useEffect } from "react";

export default function Antigravity({
    count = 200,
    color = "#FF9FFC",
    particleSize = 1.5,
    autoAnimate = true
}) {
    const canvasRef = useRef(null);
    const particles = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        // create particles
        particles.current = Array.from({ length: count }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });

            if (autoAnimate) requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, [count, color, particleSize, autoAnimate]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                height: "100%",
                display: "block"
            }}
        />
    );
}
<Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', marginLeft: { md: 3, xs: 0 }, mt: -15, }} >
    <ReactTyped
        strings={["Complete Construction & Design Solutions"]}
        typeSpeed={60}
        backSpeed={50}
        loop
        style={{ color: 'blue', fontWeight: 'bold', fontSize: '40px' }}
    />
</Typography>
