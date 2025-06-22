PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE presets (
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
    );
INSERT INTO presets VALUES(1,'Updated Classic Sine','Pure sine wave with minimal effects',440.0,'sine',2000.0,0.5,0.05000000000000000277,0.2000000000000000111,0.8000000000000000444,0.2999999999999999889,0.25,0.1000000000000000055,0.05000000000000000277,0.1000000000000000055,0.0,0.25,'2025-06-22 23:33:54','2025-06-22 23:34:55');
INSERT INTO presets VALUES(2,'Warm Pad','Smooth pad sound with reverb',220.0,'sawtooth',800.0,2.0,0.5,0.8000000000000000444,0.9000000000000000222,1.199999999999999956,0.2000000000000000111,0.5999999999999999778,0.2999999999999999889,0.4000000000000000222,0.0,0.25,'2025-06-22 23:33:54','2025-06-22 23:33:54');
INSERT INTO presets VALUES(3,'Lead Synth','Bright lead sound with delay',880.0,'square',3000.0,3.0,0.02000000000000000041,0.1000000000000000055,0.6999999999999999556,0.2000000000000000111,0.2999999999999999889,0.2000000000000000111,0.4000000000000000222,0.2000000000000000111,0.0,0.25,'2025-06-22 23:33:54','2025-06-22 23:33:54');
INSERT INTO presets VALUES(4,'Bass Line','Deep bass with filter modulation',110.0,'sawtooth',400.0,4.0,0.1000000000000000055,0.2999999999999999889,0.8000000000000000444,0.5,0.3499999999999999778,0.1000000000000000055,0.1000000000000000055,0.05000000000000000277,0.0,0.25,'2025-06-22 23:33:54','2025-06-22 23:33:54');
INSERT INTO presets VALUES(5,'Noise Drone','Atmospheric noise texture',220.0,'noise',500.0,1.5,2.0,1.0,0.5999999999999999778,3.0,0.1499999999999999945,0.8000000000000000444,0.5999999999999999778,0.2999999999999999889,0.0,0.25,'2025-06-22 23:33:54','2025-06-22 23:33:54');
CREATE TABLE user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE,
        theme TEXT DEFAULT 'dark',
        keyboard_layout TEXT DEFAULT 'qwerty',
        audio_latency INTEGER DEFAULT 128,
        sample_rate INTEGER DEFAULT 44100,
        master_volume REAL DEFAULT 0.3,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
INSERT INTO user_settings VALUES(2,'default','dark','qwerty',128,44100,0.2999999999999999889,'2025-06-22 23:34:55','2025-06-22 23:34:55');
CREATE TABLE performance_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        note_played TEXT,
        frequency REAL,
        duration REAL,
        waveform TEXT,
        effects_used TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
INSERT INTO performance_logs VALUES(1,'test_session_123','C4',261.6299999999999955,1.5,'sine','{"reverb":0.25,"delay":0.15,"chorus":0.35}','2025-06-22 23:34:55');
CREATE TABLE compositions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        notes_data TEXT, -- JSON string of note sequence
        tempo INTEGER DEFAULT 120,
        key_signature TEXT DEFAULT 'C',
        time_signature TEXT DEFAULT '4/4',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
INSERT INTO compositions VALUES(1,'Test Composition','A test composition','[{"note":"C4","duration":0.5,"time":0},{"note":"E4","duration":0.5,"time":0.5},{"note":"G4","duration":1,"time":1}]',120,'C','4/4','2025-06-22 23:34:55','2025-06-22 23:34:55');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('presets',6);
INSERT INTO sqlite_sequence VALUES('user_settings',2);
INSERT INTO sqlite_sequence VALUES('performance_logs',1);
INSERT INTO sqlite_sequence VALUES('compositions',1);
COMMIT;
