// Database Client for Retro Music App
// This file adds database functionality without modifying the original HTML

class SynthDatabase {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
        this.sessionId = this.generateSessionId();
        this.currentPreset = null;
        this.isConnected = false;
        
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async init() {
        try {
            // Test connection
            const response = await fetch(`${this.baseUrl}/presets`);
            if (response.ok) {
                this.isConnected = true;
                console.log('🎵 Database connected successfully!');
                this.setupDatabaseUI();
                this.loadUserSettings();
            } else {
                console.warn('⚠️ Database not available, running in offline mode');
            }
        } catch (error) {
            console.warn('⚠️ Database not available, running in offline mode:', error.message);
        }
    }

    setupDatabaseUI() {
        // Create database control panel
        const mainElement = document.querySelector('main');
        const dbPanel = document.createElement('div');
        dbPanel.className = 'panel p-6 rounded-lg mb-8';
        dbPanel.innerHTML = `
            <h3 class="text-lg font-bold text-green-400 mb-4 border-b border-gray-600 pb-2 flex items-center">
                <div class="led active mr-2"></div>
                DATABASE CONTROLS
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm text-gray-300 mb-2">PRESETS</label>
                    <select id="preset-selector" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm">
                        <option value="">Select Preset...</option>
                    </select>
                    <div class="flex space-x-2 mt-2">
                        <button id="load-preset" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs transition-all">Load</button>
                        <button id="save-preset" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition-all">Save</button>
                        <button id="delete-preset" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-all">Delete</button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-2">COMPOSITIONS</label>
                    <select id="composition-selector" class="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm">
                        <option value="">Select Composition...</option>
                    </select>
                    <div class="flex space-x-2 mt-2">
                        <button id="load-composition" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs transition-all">Load</button>
                        <button id="save-composition" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition-all">Save</button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-2">STATISTICS</label>
                    <div class="text-xs text-gray-400 space-y-1">
                        <div>Total Notes: <span id="total-notes">-</span></div>
                        <div>Sessions: <span id="total-sessions">-</span></div>
                        <div>Avg Duration: <span id="avg-duration">-</span></div>
                    </div>
                    <button id="refresh-stats" class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-xs transition-all mt-2">Refresh</button>
                </div>
                <div>
                    <label class="block text-sm text-gray-300 mb-2">SETTINGS</label>
                    <div class="text-xs text-gray-400 space-y-1">
                        <div>Theme: <span id="current-theme">dark</span></div>
                        <div>Layout: <span id="current-layout">qwerty</span></div>
                    </div>
                    <button id="save-settings" class="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-xs transition-all mt-2">Save Settings</button>
                </div>
            </div>
        `;

        // Insert after the first panel (oscilloscope section)
        const firstPanel = mainElement.querySelector('.panel');
        mainElement.insertBefore(dbPanel, firstPanel.nextSibling);

        this.setupEventListeners();
        this.loadPresets();
        this.loadCompositions();
        this.loadStatistics();
    }

    setupEventListeners() {
        // Preset controls
        document.getElementById('load-preset').addEventListener('click', () => this.loadSelectedPreset());
        document.getElementById('save-preset').addEventListener('click', () => this.saveCurrentPreset());
        document.getElementById('delete-preset').addEventListener('click', () => this.deleteSelectedPreset());

        // Composition controls
        document.getElementById('load-composition').addEventListener('click', () => this.loadSelectedComposition());
        document.getElementById('save-composition').addEventListener('click', () => this.saveCurrentComposition());

        // Statistics
        document.getElementById('refresh-stats').addEventListener('click', () => this.loadStatistics());

        // Settings
        document.getElementById('save-settings').addEventListener('click', () => this.saveCurrentSettings());
    }

    // Preset Management
    async loadPresets() {
        if (!this.isConnected) return;

        try {
            const response = await fetch(`${this.baseUrl}/presets`);
            const presets = await response.json();
            
            const selector = document.getElementById('preset-selector');
            selector.innerHTML = '<option value="">Select Preset...</option>';
            
            presets.forEach(preset => {
                const option = document.createElement('option');
                option.value = preset.id;
                option.textContent = preset.name;
                selector.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading presets:', error);
        }
    }

    async loadSelectedPreset() {
        const selector = document.getElementById('preset-selector');
        const presetId = selector.value;
        
        if (!presetId) return;

        try {
            const response = await fetch(`${this.baseUrl}/presets/${presetId}`);
            const preset = await response.json();
            
            this.applyPreset(preset);
            this.currentPreset = preset;
            
            console.log(`🎹 Loaded preset: ${preset.name}`);
        } catch (error) {
            console.error('Error loading preset:', error);
        }
    }

    applyPreset(preset) {
        // Apply preset values to the synthesizer
        if (window.synth) {
            // Set waveform
            const waveformBtn = document.querySelector(`[data-waveform="${preset.waveform}"]`);
            if (waveformBtn) {
                document.querySelectorAll('.waveform-btn').forEach(btn => btn.classList.remove('button-active'));
                waveformBtn.classList.add('button-active');
                window.synth.setWaveform(preset.waveform);
            }

            // Set parameters
            const params = {
                'frequency': preset.frequency,
                'cutoff': preset.cutoff,
                'resonance': preset.resonance,
                'attack': preset.attack * 100,
                'decay': preset.decay * 100,
                'sustain': preset.sustain * 100,
                'release': preset.release * 100,
                'volume': preset.volume * 100,
                'reverb': preset.reverb * 100,
                'delay': preset.delay * 100,
                'chorus': preset.chorus * 100,
                'pitchBend': preset.pitch_bend,
                'modulation': preset.modulation * 100
            };

            Object.entries(params).forEach(([param, value]) => {
                window.synth.setParameter(param, value);
                
                // Update UI elements
                const knob = document.querySelector(`[data-param="${param}"]`);
                if (knob) {
                    knob.dataset.value = value;
                    knob.style.transform = `rotate(${((value - 50) / 50) * 135}deg)`;
                }

                const slider = document.querySelector(`input[data-param="${param}"]`);
                if (slider) {
                    slider.value = value;
                }
            });

            // Update labels
            this.updateLabels();
        }
    }

    updateLabels() {
        // Update frequency display
        const freqKnob = document.querySelector('[data-param="frequency"]');
        if (freqKnob) {
            const value = parseFloat(freqKnob.dataset.value);
            const frequency = 220 + (value / 100) * 880;
            document.getElementById('freq-label').textContent = `${Math.round(frequency)} Hz`;
            document.getElementById('frequency-display').textContent = `${Math.round(frequency)} Hz`;
        }

        // Update other labels
        const labels = {
            'cutoff': 'cutoff-label',
            'resonance': 'resonance-label',
            'volume': 'volume-label',
            'pitchBend': 'pitch-label',
            'modulation': 'mod-label'
        };

        Object.entries(labels).forEach(([param, labelId]) => {
            const knob = document.querySelector(`[data-param="${param}"]`);
            if (knob && document.getElementById(labelId)) {
                const value = parseFloat(knob.dataset.value);
                let displayValue = value;
                
                if (param === 'cutoff') {
                    displayValue = (value / 1000).toFixed(1) + ' kHz';
                } else if (param === 'resonance') {
                    displayValue = value.toFixed(1);
                } else if (param === 'volume' || param === 'modulation') {
                    displayValue = Math.round(value) + '%';
                } else if (param === 'pitchBend') {
                    displayValue = `${value > 0 ? '+' : ''}${value.toFixed(1)} ST`;
                }
                
                document.getElementById(labelId).textContent = displayValue;
            }
        });
    }

    async saveCurrentPreset() {
        const name = prompt('Enter preset name:');
        if (!name) return;

        const description = prompt('Enter preset description (optional):') || '';

        // Collect current synthesizer state
        const preset = {
            name,
            description,
            frequency: this.getParameterValue('frequency'),
            waveform: this.getCurrentWaveform(),
            cutoff: this.getParameterValue('cutoff'),
            resonance: this.getParameterValue('resonance'),
            attack: this.getParameterValue('attack') / 100,
            decay: this.getParameterValue('decay') / 100,
            sustain: this.getParameterValue('sustain') / 100,
            release: this.getParameterValue('release') / 100,
            volume: this.getParameterValue('volume') / 100,
            reverb: this.getParameterValue('reverb') / 100,
            delay: this.getParameterValue('delay') / 100,
            chorus: this.getParameterValue('chorus') / 100,
            pitch_bend: this.getParameterValue('pitchBend'),
            modulation: this.getParameterValue('modulation') / 100
        };

        try {
            const response = await fetch(`${this.baseUrl}/presets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preset)
            });

            if (response.ok) {
                console.log('✅ Preset saved successfully!');
                this.loadPresets(); // Refresh the list
            } else {
                console.error('❌ Error saving preset');
            }
        } catch (error) {
            console.error('Error saving preset:', error);
        }
    }

    async deleteSelectedPreset() {
        const selector = document.getElementById('preset-selector');
        const presetId = selector.value;
        
        if (!presetId) return;

        if (!confirm('Are you sure you want to delete this preset?')) return;

        try {
            const response = await fetch(`${this.baseUrl}/presets/${presetId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('✅ Preset deleted successfully!');
                this.loadPresets(); // Refresh the list
            } else {
                console.error('❌ Error deleting preset');
            }
        } catch (error) {
            console.error('Error deleting preset:', error);
        }
    }

    // Composition Management
    async loadCompositions() {
        if (!this.isConnected) return;

        try {
            const response = await fetch(`${this.baseUrl}/compositions`);
            const compositions = await response.json();
            
            const selector = document.getElementById('composition-selector');
            selector.innerHTML = '<option value="">Select Composition...</option>';
            
            compositions.forEach(composition => {
                const option = document.createElement('option');
                option.value = composition.id;
                option.textContent = composition.name;
                selector.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading compositions:', error);
        }
    }

    async loadSelectedComposition() {
        const selector = document.getElementById('composition-selector');
        const compositionId = selector.value;
        
        if (!compositionId) return;

        try {
            const response = await fetch(`${this.baseUrl}/compositions/${compositionId}`);
            const composition = await response.json();
            
            console.log(`🎼 Loaded composition: ${composition.name}`);
            // Here you would implement composition playback
            alert(`Loaded composition: ${composition.name}\nTempo: ${composition.tempo} BPM\nKey: ${composition.key_signature}`);
        } catch (error) {
            console.error('Error loading composition:', error);
        }
    }

    async saveCurrentComposition() {
        const name = prompt('Enter composition name:');
        if (!name) return;

        const description = prompt('Enter composition description (optional):') || '';
        const tempo = parseInt(prompt('Enter tempo (BPM):') || '120');
        const keySignature = prompt('Enter key signature (e.g., C, G, F#):') || 'C';
        const timeSignature = prompt('Enter time signature (e.g., 4/4, 3/4):') || '4/4';

        // For now, we'll save a simple note sequence
        const notesData = [
            { note: 'C4', duration: 0.5, time: 0 },
            { note: 'E4', duration: 0.5, time: 0.5 },
            { note: 'G4', duration: 1.0, time: 1.0 }
        ];

        const composition = {
            name,
            description,
            notes_data: notesData,
            tempo,
            key_signature: keySignature,
            time_signature: timeSignature
        };

        try {
            const response = await fetch(`${this.baseUrl}/compositions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(composition)
            });

            if (response.ok) {
                console.log('✅ Composition saved successfully!');
                this.loadCompositions(); // Refresh the list
            } else {
                console.error('❌ Error saving composition');
            }
        } catch (error) {
            console.error('Error saving composition:', error);
        }
    }

    // Statistics
    async loadStatistics() {
        if (!this.isConnected) return;

        try {
            const response = await fetch(`${this.baseUrl}/stats`);
            const stats = await response.json();
            
            if (stats.length > 0) {
                const totalNotes = stats.reduce((sum, stat) => sum + stat.total_notes, 0);
                const avgDuration = stats.reduce((sum, stat) => sum + (stat.avg_duration || 0), 0) / stats.length;
                const totalSessions = stats[0].total_sessions;

                document.getElementById('total-notes').textContent = totalNotes;
                document.getElementById('total-sessions').textContent = totalSessions;
                document.getElementById('avg-duration').textContent = avgDuration.toFixed(2) + 's';
            }
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    // Settings Management
    async loadUserSettings() {
        if (!this.isConnected) return;

        try {
            const response = await fetch(`${this.baseUrl}/settings/default`);
            const settings = await response.json();
            
            document.getElementById('current-theme').textContent = settings.theme;
            document.getElementById('current-layout').textContent = settings.keyboard_layout;
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveCurrentSettings() {
        const settings = {
            theme: 'dark',
            keyboard_layout: 'qwerty',
            audio_latency: 128,
            sample_rate: 44100,
            master_volume: 0.3
        };

        try {
            const response = await fetch(`${this.baseUrl}/settings/default`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                console.log('✅ Settings saved successfully!');
            } else {
                console.error('❌ Error saving settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    // Performance Logging
    async logPerformance(noteData) {
        if (!this.isConnected) return;

        const logData = {
            session_id: this.sessionId,
            note_played: noteData.note,
            frequency: noteData.frequency,
            duration: noteData.duration,
            waveform: this.getCurrentWaveform(),
            effects_used: {
                reverb: this.getParameterValue('reverb') / 100,
                delay: this.getParameterValue('delay') / 100,
                chorus: this.getParameterValue('chorus') / 100
            }
        };

        try {
            await fetch(`${this.baseUrl}/logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logData)
            });
        } catch (error) {
            console.error('Error logging performance:', error);
        }
    }

    // Helper methods
    getParameterValue(param) {
        const knob = document.querySelector(`[data-param="${param}"]`);
        if (knob) {
            return parseFloat(knob.dataset.value) || 0;
        }
        
        const slider = document.querySelector(`input[data-param="${param}"]`);
        if (slider) {
            return parseFloat(slider.value) || 0;
        }
        
        return 0;
    }

    getCurrentWaveform() {
        const activeBtn = document.querySelector('.waveform-btn.button-active');
        return activeBtn ? activeBtn.dataset.waveform : 'sine';
    }
}

// Initialize database client when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the original synth to initialize
    setTimeout(() => {
        window.synthDB = new SynthDatabase();
        
        // Extend the original synth to log performance
        if (window.synth) {
            const originalPlayNote = window.synth.playNote.bind(window.synth);
            const originalStopNote = window.synth.stopNote.bind(window.synth);
            
            const noteStartTimes = new Map();
            
            window.synth.playNote = function(frequency, duration = null) {
                const note = Object.keys(keyMap).find(key => {
                    const keyElement = document.querySelector(`[data-freq="${frequency}"]`);
                    return keyElement && keyElement.dataset.note === keyMap[key];
                });
                
                if (note) {
                    noteStartTimes.set(frequency, Date.now());
                }
                
                return originalPlayNote(frequency, duration);
            };
            
            window.synth.stopNote = function(frequency) {
                const startTime = noteStartTimes.get(frequency);
                if (startTime && window.synthDB) {
                    const duration = (Date.now() - startTime) / 1000;
                    const noteElement = document.querySelector(`[data-freq="${frequency}"]`);
                    const note = noteElement ? noteElement.dataset.note : 'Unknown';
                    
                    window.synthDB.logPerformance({
                        note,
                        frequency,
                        duration
                    });
                    
                    noteStartTimes.delete(frequency);
                }
                
                return originalStopNote(frequency);
            };
        }
    }, 1000);
});

// Keyboard mapping for note detection
const keyMap = {
    'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
    'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
    'u': 'A#4', 'j': 'B4', 'k': 'C5'
}; 