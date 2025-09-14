const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(__dirname));

// Serve the mortgage UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mortgage-ui.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Mortgage UI Server is running' });
});

app.listen(PORT, () => {
    console.log(`🏠 Game of Loans UI Server running at http://localhost:${PORT}`);
    console.log(`📊 Inkeep Graph Dashboard: http://localhost:3000/default/projects/game-of-loans/graphs/mortgage-negotiator-graph?pane=graph`);
    console.log(`🔧 Manage API: http://localhost:3002`);
    console.log(`🚀 Run API: http://localhost:3003`);
});
