const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Database connection
const dbPath = path.join(__dirname, 'synth_database.db');
const db = new sqlite3.Database(dbPath);

// API Routes

// Get all presets
app.get('/api/presets', (req, res) => {
    db.all('SELECT * FROM presets ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get preset by ID
app.get('/api/presets/:id', (req, res) => {
    db.get('SELECT * FROM presets WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Preset not found' });
            return;
        }
        res.json(row);
    });
});

// Create new preset
app.post('/api/presets', (req, res) => {
    const {
        name, description, frequency, waveform, cutoff, resonance,
        attack, decay, sustain, release, volume, reverb, delay, chorus,
        pitch_bend, modulation
    } = req.body;

    const sql = `INSERT INTO presets (
        name, description, frequency, waveform, cutoff, resonance,
        attack, decay, sustain, release, volume, reverb, delay, chorus,
        pitch_bend, modulation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
        name, description, frequency, waveform, cutoff, resonance,
        attack, decay, sustain, release, volume, reverb, delay, chorus,
        pitch_bend, modulation
    ], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            message: 'Preset created successfully'
        });
    });
});

// Update preset
app.put('/api/presets/:id', (req, res) => {
    const {
        name, description, frequency, waveform, cutoff, resonance,
        attack, decay, sustain, release, volume, reverb, delay, chorus,
        pitch_bend, modulation
    } = req.body;

    const sql = `UPDATE presets SET 
        name = ?, description = ?, frequency = ?, waveform = ?, cutoff = ?, resonance = ?,
        attack = ?, decay = ?, sustain = ?, release = ?, volume = ?, reverb = ?, delay = ?, chorus = ?,
        pitch_bend = ?, modulation = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`;

    db.run(sql, [
        name, description, frequency, waveform, cutoff, resonance,
        attack, decay, sustain, release, volume, reverb, delay, chorus,
        pitch_bend, modulation, req.params.id
    ], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Preset not found' });
            return;
        }
        res.json({ message: 'Preset updated successfully' });
    });
});

// Delete preset
app.delete('/api/presets/:id', (req, res) => {
    db.run('DELETE FROM presets WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Preset not found' });
            return;
        }
        res.json({ message: 'Preset deleted successfully' });
    });
});

// Get user settings
app.get('/api/settings/:userId', (req, res) => {
    db.get('SELECT * FROM user_settings WHERE user_id = ?', [req.params.userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'User settings not found' });
            return;
        }
        res.json(row);
    });
});

// Update user settings
app.put('/api/settings/:userId', (req, res) => {
    const { theme, keyboard_layout, audio_latency, sample_rate, master_volume } = req.body;

    const sql = `INSERT OR REPLACE INTO user_settings (
        user_id, theme, keyboard_layout, audio_latency, sample_rate, master_volume, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;

    db.run(sql, [req.params.userId, theme, keyboard_layout, audio_latency, sample_rate, master_volume], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Settings updated successfully' });
    });
});

// Log performance data
app.post('/api/logs', (req, res) => {
    const { session_id, note_played, frequency, duration, waveform, effects_used } = req.body;

    const sql = `INSERT INTO performance_logs (
        session_id, note_played, frequency, duration, waveform, effects_used
    ) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [session_id, note_played, frequency, duration, waveform, JSON.stringify(effects_used)], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Performance logged successfully' });
    });
});

// Get performance statistics
app.get('/api/stats', (req, res) => {
    const sql = `
        SELECT 
            COUNT(*) as total_notes,
            AVG(duration) as avg_duration,
            COUNT(DISTINCT session_id) as total_sessions,
            COUNT(DISTINCT note_played) as unique_notes,
            waveform,
            COUNT(*) as waveform_count
        FROM performance_logs 
        GROUP BY waveform
        ORDER BY waveform_count DESC
    `;

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Save composition
app.post('/api/compositions', (req, res) => {
    const { name, description, notes_data, tempo, key_signature, time_signature } = req.body;

    const sql = `INSERT INTO compositions (
        name, description, notes_data, tempo, key_signature, time_signature
    ) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, description, JSON.stringify(notes_data), tempo, key_signature, time_signature], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            message: 'Composition saved successfully'
        });
    });
});

// Get all compositions
app.get('/api/compositions', (req, res) => {
    db.all('SELECT * FROM compositions ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get composition by ID
app.get('/api/compositions/:id', (req, res) => {
    db.get('SELECT * FROM compositions WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Composition not found' });
            return;
        }
        // Parse the notes_data JSON
        row.notes_data = JSON.parse(row.notes_data);
        res.json(row);
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Retro Music App Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${dbPath}`);
    console.log(`🎹 API endpoints available at /api/*`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    // Export performance_logs to CSV
    db.all('SELECT * FROM performance_logs', (err, rows) => {
        if (err) {
            console.error('Error exporting performance_logs:', err.message);
        } else if (rows.length > 0) {
            const header = Object.keys(rows[0]).join(',') + '\n';
            const csv = rows.map(row => Object.values(row).map(v => {
                // Escape quotes and commas in CSV
                if (typeof v === 'string' && (v.includes(',') || v.includes('"'))) {
                    return '"' + v.replace(/"/g, '""') + '"';
                }
                return v;
            }).join(',')).join('\n');
            fs.writeFileSync('performance_logs.csv', header + csv);
            console.log('✅ Exported performance_logs.csv');
        } else {
            console.log('No performance logs to export.');
        }
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
            process.exit(0);
        });
    });
}); 