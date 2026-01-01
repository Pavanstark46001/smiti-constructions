import { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardMedia,
    Typography,
} from "@mui/material";

const books = [
    {
        id: 1,
        title: "Residential Construction",
        author: "Urban Builders",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    },
    {
        id: 2,
        title: "Modern Architecture",
        author: "Design Studio",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    },
    {
        id: 3,
        title: "Construction Planning",
        author: "Civil Experts",
        image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df9b",
    },
    {
        id: 4,
        title: "Industrial Projects",
        author: "BuildTech Group",
        image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
    },
    {
        id: 5,
        title: "Smart Infrastructure",
        author: "Future Engineers",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
];

export default function CardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % books.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const getPosition = (index) => {
        let diff = (index - currentIndex + books.length) % books.length;
        if (diff > books.length / 2) diff -= books.length;
        return diff;
    };

    const getStyle = (index) => {
        const pos = getPosition(index);
        const isCenter = pos === 0;

        return {
            position: "absolute",
            width: 240,
            height: 350,
            transform: `translateX(${pos * 280}px) scale(${isCenter ? 1.25 : 0.85})`,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: isCenter ? 10 : 5 - Math.abs(pos),
            opacity: Math.abs(pos) > 2 ? 0 : 1,
            cursor: "pointer",
            boxShadow: isCenter
                ? "0 20px 50px rgba(0,0,0,0.45)"
                : "0 10px 30px rgba(0,0,0,0.3)",
            borderRadius: 5,
        };
    };

    return (
        <Box
            sx={{
                height: "85vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                mb: '-20'
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    mt: -15,
                    mb: 6,
                    color: 'purple',
                    fontWeight: 700,
                }}
            >
                OUR SERVICES
            </Typography>

            <Typography
                variant="h3"
                sx={{
                    mt: -5,
                    mb: 6,
                    background: 'black',
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                }}
            >
                Complete Construction & Design Solutions
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 450,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {books.map((book, index) => (
                    <Card
                        key={book.id}
                        sx={getStyle(index)}
                        onClick={() => setCurrentIndex(index)}

                    >
                        <CardMedia
                            component="img"
                            image={book.image}
                            alt={book.title}
                            sx={{ height: 280, objectFit: "cover" }}
                        />

                        <Box sx={{ p: 1.5 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {book.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {book.author}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>

            {/* Dots */}
            <Box sx={{ display: "flex", gap: 1, mt: 6, mb: -15 }}>
                {books.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: currentIndex === index ? 28 : 10,
                            height: 10,
                            borderRadius: 0,
                            bgcolor:
                                currentIndex === index ? "primary.main" : "grey.400",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
