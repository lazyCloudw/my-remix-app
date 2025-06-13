import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Paper, Pagination, CssBaseline } from "@mui/material";
import Header from "../component/header";
import type { MetaFunction } from "@remix-run/node";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const meta: MetaFunction = () => {
    return [
        { title: "note" },
        { name: "description", content: "note" },
    ];
};

const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#fff",
            paper: "#fff",
        },
        text: {
            primary: "#222", // 文字色を濃いグレーで固定
            secondary: "#444",
        },
    },
});

type Post = { id: number; name: string; body: string; date: string };

const ITEMS_PER_PAGE = 20;

export default function Bbs() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [page, setPage] = useState(1);
    const [fetchError, setFetchError] = useState(false); // 追加

    useEffect(() => {
        fetch("/api/posts")
            .then(res => {
                if (!res.ok) throw new Error("fetch error");
                return res.json();
            })
            .then(data => {
                setPosts(data);
                setFetchError(false);
            })
            .catch(() => {
                setFetchError(true);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !body.trim() || body.length > 100) return;
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, body }),
        });
        if (res.ok) {
            const newPost = await res.json();
            setPosts([newPost, ...posts]);
            setBody("");
            setPage(1); // 新規投稿時は1ページ目に戻す
        }
    };

    // ページネーション用データ
    const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const paginatedPosts = posts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Header />
            <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
                <Typography sx={{ mt: 12 }} variant="h5" gutterBottom>Notepad</Typography>
                <Paper sx={{ p: 2, mb: 2, bgcolor: "#fff", color: "#222" }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            size="small"
                            fullWidth
                            sx={{ mb: 1 }}
                            inputProps={{ maxLength: 20 }}
                            required
                        />
                        <TextField
                            label="Text"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                            rows={3}
                            sx={{ mb: 1 }}
                            inputProps={{ maxLength: 100 }}
                            required
                            helperText={`${body.length}/100`}
                        />
                        <Button type="submit" variant="contained" disabled={!name.trim() || !body.trim() || body.length > 100}>
                            Send
                        </Button>
                    </form>
                </Paper>
                <List>
                    {fetchError ? (
                        <ListItem>
                            <ListItemText primary="API Error" />
                        </ListItem>
                    ) : (
                        paginatedPosts.map((post) => (
                            <ListItem key={post.id} alignItems="flex-start" sx={{ borderBottom: "1px solid #eee" }}>
                                <ListItemText
                                    primary={`${post.name}（${new Date(post.date).toLocaleString()}）`}
                                    secondary={post.body}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
                {pageCount > 1 && !fetchError && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
}