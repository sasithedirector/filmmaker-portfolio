import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from dist (production build)
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for contact form (placeholder — can wire to email service)
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact form: ${name} (${email}): ${message}`);
  res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
});

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎬 Portfolio server running on port ${PORT}`);
});
