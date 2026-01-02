import { useState, useEffect, useRef } from "react";
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    Button,
    Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatCard({ open, onClose }) {
    const botData = [
        { question: "hello", answer: "Hello, you can ask me about skills, experience, projects, contact…" },
        { question: "name", answer: "John Doe — Frontend Developer 👨‍💻" },
        { question: "skills", answer: "React, TypeScript, Node.js, Firebase, UI/UX" },
        { question: "experience", answer: "3+ years building modern web apps." },
        { question: "contact", answer: "📩 johndoe@gmail.com" },
        { question: "projects", answer: "You can check all my projects on the portfolio page 🚀" },
    ];

    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello 👋 I'm your portfolio AI — ask me about skills, experience, projects, contact…" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const timeoutRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when messages or typing change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    // Clear timeout if component unmounts
    useEffect(() => {
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const userText = input.trim();

        // Add user message
        setMessages((prev) => [...prev, { sender: "user", text: userText }]);
        setInput("");

        // Set typing indicator
        setIsTyping(true);

        // Prepare bot reply with delay
        timeoutRef.current = setTimeout(() => {
            const match = botData.find((item) =>
                userText.toLowerCase().includes(item.question.toLowerCase())
            );

            const botReply = match
                ? match.answer
                : "🤔 I don’t know that yet — try asking about: skills, projects, name, experience, contact.";

            setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
            setIsTyping(false);
        }, 900); // 900ms delay for "typing" feel
    };

    return (
        <Fade in={open}>
            <Paper
                elevation={6}
                sx={{
                    position: "fixed",
                    bottom: 90,
                    right: 20,
                    width: 350,
                    height: 480,
                    borderRadius: 4,
                    display: open ? "flex" : "none",
                    flexDirection: "column",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    zIndex: 9999,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd",
                        background: "#f8f8f8",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        🤖 AI Assistant
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Messages */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        px: 2,
                        py: 1,
                        background: "#fff",
                    }}
                >
                    {messages.map((msg, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    px: 2,
                                    py: 1.2,
                                    borderRadius: "18px",
                                    maxWidth: "75%",
                                    bgcolor: msg.sender === "user" ? "#2b2b2b" : "#e6e6e6",
                                    color: msg.sender === "user" ? "#fff" : "#000",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {msg.text}
                            </Typography>
                        </Box>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    px: 2,
                                    py: 1.2,
                                    borderRadius: "18px",
                                    maxWidth: "55%",
                                    bgcolor: "#e6e6e6",
                                    color: "#000",
                                    fontSize: "0.85rem",
                                    fontStyle: "italic",
                                }}
                            >
                                <span style={{ opacity: 0.8 }}>AI is typing</span>
                                <span>...</span>
                            </Typography>
                        </Box>
                    )}

                    <div ref={messagesEndRef} />
                </Box>

                {/* Input */}
                <Box sx={{ p: 2, display: "flex", gap: 1, borderTop: "1px solid #ddd" }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button variant="contained" onClick={handleSend}>
                        Send
                    </Button>
                </Box>
            </Paper>
        </Fade>
    );
}
