const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file in the project directory
const dbPath = path.join(__dirname, 'synth_database.db');
const db = new sqlite3.Database(dbPath);

console.log('Initializing SQLite database...');

// Create tables
db.serialize(() => {
    // Table for synthesizer presets
    db.run(`CREATE TABLE IF NOT EXISTS presets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        frequency REAL DEFAULT 440,
        waveform TEXT DEFAULT 'sine',
        cutoff REAL DEFAULT 1000,
        resonance REAL DEFAULT 1,
        attack REAL DEFAULT 0.1,
        decay REAL DEFAULT 0.3,
        sustain REAL DEFAULT 0.7,
        release REAL DEFAULT 0.5,
        volume REAL DEFAULT 0.3,
        reverb REAL DEFAULT 0.25,
        delay REAL DEFAULT 0.15,
        chorus REAL DEFAULT 0.35,
        pitch_bend REAL DEFAULT 0,
        modulation REAL DEFAULT 0.25,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Table for user settings
    db.run(`CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE,
        theme TEXT DEFAULT 'dark',
        keyboard_layout TEXT DEFAULT 'qwerty',
        audio_latency INTEGER DEFAULT 128,
        sample_rate INTEGER DEFAULT 44100,
        master_volume REAL DEFAULT 0.3,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Table for performance/usage statistics
    db.run(`CREATE TABLE IF NOT EXISTS performance_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        note_played TEXT,
        frequency REAL,
        duration REAL,
        waveform TEXT,
        effects_used TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Table for saved compositions
    db.run(`CREATE TABLE IF NOT EXISTS compositions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        notes_data TEXT, -- JSON string of note sequence
        tempo INTEGER DEFAULT 120,
        key_signature TEXT DEFAULT 'C',
        time_signature TEXT DEFAULT '4/4',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert some default presets
    const defaultPresets = [
        {
            name: 'Classic Sine',
            description: 'Pure sine wave with minimal effects',
            frequency: 440,
            waveform: 'sine',
            cutoff: 2000,
            resonance: 0.5,
            attack: 0.05,
            decay: 0.2,
            sustain: 0.8,
            release: 0.3,
            volume: 0.25,
            reverb: 0.1,
            delay: 0.05,
            chorus: 0.1
        },
        {
            name: 'Warm Pad',
            description: 'Smooth pad sound with reverb',
            frequency: 220,
            waveform: 'sawtooth',
            cutoff: 800,
            resonance: 2.0,
            attack: 0.5,
            decay: 0.8,
            sustain: 0.9,
            release: 1.2,
            volume: 0.2,
            reverb: 0.6,
            delay: 0.3,
            chorus: 0.4
        },
        {
            name: 'Lead Synth',
            description: 'Bright lead sound with delay',
            frequency: 880,
            waveform: 'square',
            cutoff: 3000,
            resonance: 3.0,
            attack: 0.02,
            decay: 0.1,
            sustain: 0.7,
            release: 0.2,
            volume: 0.3,
            reverb: 0.2,
            delay: 0.4,
            chorus: 0.2
        },
        {
            name: 'Bass Line',
            description: 'Deep bass with filter modulation',
            frequency: 110,
            waveform: 'sawtooth',
            cutoff: 400,
            resonance: 4.0,
            attack: 0.1,
            decay: 0.3,
            sustain: 0.8,
            release: 0.5,
            volume: 0.35,
            reverb: 0.1,
            delay: 0.1,
            chorus: 0.05
        },
        {
            name: 'Noise Drone',
            description: 'Atmospheric noise texture',
            frequency: 220,
            waveform: 'noise',
            cutoff: 500,
            resonance: 1.5,
            attack: 2.0,
            decay: 1.0,
            sustain: 0.6,
            release: 3.0,
            volume: 0.15,
            reverb: 0.8,
            delay: 0.6,
            chorus: 0.3
        }
    ];

    const insertPreset = db.prepare(`INSERT OR IGNORE INTO presets (
        name, description, frequency, waveform, cutoff, resonance, 
        attack, decay, sustain, release, volume, reverb, delay, chorus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    defaultPresets.forEach(preset => {
        insertPreset.run(
            preset.name, preset.description, preset.frequency, preset.waveform,
            preset.cutoff, preset.resonance, preset.attack, preset.decay,
            preset.sustain, preset.release, preset.volume, preset.reverb,
            preset.delay, preset.chorus
        );
    });

    insertPreset.finalize();

    // Insert default user settings
    db.run(`INSERT OR IGNORE INTO user_settings (user_id, theme, keyboard_layout) 
            VALUES ('default', 'dark', 'qwerty')`);

    console.log('Database initialized successfully!');
    console.log('Default presets created:');
    defaultPresets.forEach(preset => {
        console.log(`- ${preset.name}: ${preset.description}`);
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
}); 