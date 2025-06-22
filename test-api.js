// Test script for the Retro Music App API
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing Retro Music App API...\n');

    try {
        // Test 1: Get all presets
        console.log('1. Testing GET /api/presets');
        const presetsResponse = await fetch(`${BASE_URL}/presets`);
        const presets = await presetsResponse.json();
        console.log(`✅ Found ${presets.length} presets`);
        console.log(`   - ${presets[0].name}: ${presets[0].description}\n`);

        // Test 2: Get specific preset
        console.log('2. Testing GET /api/presets/1');
        const presetResponse = await fetch(`${BASE_URL}/presets/1`);
        const preset = await presetResponse.json();
        console.log(`✅ Retrieved preset: ${preset.name}\n`);

        // Test 3: Create new preset
        console.log('3. Testing POST /api/presets');
        const newPreset = {
            name: 'Test Preset',
            description: 'Test preset created by API test',
            frequency: 440,
            waveform: 'sine',
            cutoff: 1000,
            resonance: 1,
            attack: 0.1,
            decay: 0.3,
            sustain: 0.7,
            release: 0.5,
            volume: 0.3,
            reverb: 0.25,
            delay: 0.15,
            chorus: 0.35,
            pitch_bend: 0,
            modulation: 0.25
        };

        const createResponse = await fetch(`${BASE_URL}/presets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPreset)
        });
        const createResult = await createResponse.json();
        console.log(`✅ Created preset with ID: ${createResult.id}\n`);

        // Test 4: Update preset
        console.log('4. Testing PUT /api/presets/1');
        const updateData = { ...preset, name: 'Updated Classic Sine' };
        const updateResponse = await fetch(`${BASE_URL}/presets/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });
        const updateResult = await updateResponse.json();
        console.log(`✅ ${updateResult.message}\n`);

        // Test 5: Get user settings
        console.log('5. Testing GET /api/settings/default');
        const settingsResponse = await fetch(`${BASE_URL}/settings/default`);
        const settings = await settingsResponse.json();
        console.log(`✅ Retrieved settings for user: ${settings.user_id}\n`);

        // Test 6: Update user settings
        console.log('6. Testing PUT /api/settings/default');
        const newSettings = {
            theme: 'dark',
            keyboard_layout: 'qwerty',
            audio_latency: 128,
            sample_rate: 44100,
            master_volume: 0.3
        };
        const updateSettingsResponse = await fetch(`${BASE_URL}/settings/default`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSettings)
        });
        const updateSettingsResult = await updateSettingsResponse.json();
        console.log(`✅ ${updateSettingsResult.message}\n`);

        // Test 7: Log performance data
        console.log('7. Testing POST /api/logs');
        const logData = {
            session_id: 'test_session_123',
            note_played: 'C4',
            frequency: 261.63,
            duration: 1.5,
            waveform: 'sine',
            effects_used: { reverb: 0.25, delay: 0.15, chorus: 0.35 }
        };
        const logResponse = await fetch(`${BASE_URL}/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });
        const logResult = await logResponse.json();
        console.log(`✅ ${logResult.message}\n`);

        // Test 8: Get statistics
        console.log('8. Testing GET /api/stats');
        const statsResponse = await fetch(`${BASE_URL}/stats`);
        const stats = await statsResponse.json();
        console.log(`✅ Retrieved statistics: ${stats.length} waveform categories\n`);

        // Test 9: Create composition
        console.log('9. Testing POST /api/compositions');
        const composition = {
            name: 'Test Composition',
            description: 'A test composition',
            notes_data: [
                { note: 'C4', duration: 0.5, time: 0 },
                { note: 'E4', duration: 0.5, time: 0.5 },
                { note: 'G4', duration: 1.0, time: 1.0 }
            ],
            tempo: 120,
            key_signature: 'C',
            time_signature: '4/4'
        };
        const compositionResponse = await fetch(`${BASE_URL}/compositions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(composition)
        });
        const compositionResult = await compositionResponse.json();
        console.log(`✅ Created composition with ID: ${compositionResult.id}\n`);

        // Test 10: Get compositions
        console.log('10. Testing GET /api/compositions');
        const compositionsResponse = await fetch(`${BASE_URL}/compositions`);
        const compositions = await compositionsResponse.json();
        console.log(`✅ Found ${compositions.length} compositions\n`);

        // Cleanup: Delete test preset
        console.log('🧹 Cleaning up test data...');
        const deleteResponse = await fetch(`${BASE_URL}/presets/${createResult.id}`, {
            method: 'DELETE'
        });
        const deleteResult = await deleteResponse.json();
        console.log(`✅ ${deleteResult.message}\n`);

        console.log('🎉 All API tests passed successfully!');
        console.log('🚀 The Retro Music App with SQL database is ready to use!');

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        process.exit(1);
    }
}

// Run the tests
testAPI(); 