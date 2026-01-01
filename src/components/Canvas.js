import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { gsap } from 'gsap';

/* =======================
   WHY CHOOSE US CONTENT
======================= */
const demoItems = [
    {
        link: '#',
        text: 'End-to-End Construction',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    },
    {
        link: '#',
        text: 'Experienced In-House Team',
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c'
    },
    {
        link: '#',
        text: 'Premium Materials & Safety',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e'
    },
    {
        link: '#',
        text: 'On-Time Delivery & Support',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789'
    }
];

export default function App() {
    return (
        <Box sx={{ height: '600px', backgroundColor: '#060010' }}>
            <FlowingMenu items={demoItems} />
        </Box>
    );
}

function FlowingMenu({ items }) {
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {items.map((item, index) => (
                <MenuItem key={index} {...item} />
            ))}
        </Box>
    );
}

function MenuItem({ link, text, image }) {
    const marqueeInnerRef = useRef(null);
    const marqueeRef = useRef(null);
    const animationRef = useRef(null);
    const [repeatCount] = useState(4);

    useEffect(() => {
        if (!marqueeInnerRef.current) return;

        const firstItem = marqueeInnerRef.current.children[0];
        if (!firstItem) return;

        const width = firstItem.offsetWidth;
        if (!width) return;

        animationRef.current = gsap.to(marqueeInnerRef.current, {
            x: -width,
            duration: 15,
            ease: 'none',
            repeat: -1
        });

        return () => animationRef.current?.kill();
    }, []);

    const handleEnter = () => {
        gsap.to(marqueeRef.current, {
            y: '0%',
            duration: 0.6,
            ease: 'expo.out'
        });
    };

    const handleLeave = () => {
        gsap.to(marqueeRef.current, {
            y: '101%',
            duration: 0.6,
            ease: 'expo.in'
        });
    };

    return (
        <Box
            sx={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid #ffffff'
            }}
        >
            <Link
                href={link}
                underline="none"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '4vh',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                }}
            >
                {text}
            </Link>

            {/* Marquee Hover Section */}
            <Box
                ref={marqueeRef}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#ffffff',
                    transform: 'translateY(101%)',
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            >
                <Box
                    ref={marqueeInnerRef}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        width: 'fit-content'
                    }}
                >
                    {[...Array(repeatCount)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingX: '1.5vw'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '4vh',
                                    textTransform: 'uppercase',
                                    color: '#060010',
                                    whiteSpace: 'nowrap',
                                    marginRight: '1vw'
                                }}
                            >
                                {text}
                            </Typography>

                            <Box
                                sx={{
                                    width: 220,
                                    height: '7vh',
                                    borderRadius: '40px',
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
