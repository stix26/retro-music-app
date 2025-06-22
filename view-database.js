#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'synth_database.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Retro Music App Database Viewer\n');
console.log('=' .repeat(50));

// Function to display table data
function displayTable(tableName, title) {
    return new Promise((resolve, reject) => {
        console.log(`\n📋 ${title}`);
        console.log('-'.repeat(30));
        
        db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
            if (err) {
                console.error(`Error reading ${tableName}:`, err.message);
                reject(err);
                return;
            }
            
            if (rows.length === 0) {
                console.log(`No data in ${tableName}`);
            } else {
                console.log(`Found ${rows.length} record(s):\n`);
                rows.forEach((row, index) => {
                    console.log(`${index + 1}. ${JSON.stringify(row, null, 2)}`);
                });
            }
            resolve();
        });
    });
}

// Function to display performance statistics
function displayStats() {
    return new Promise((resolve, reject) => {
        console.log('\n📊 Performance Statistics');
        console.log('-'.repeat(30));
        
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
                console.error('Error reading stats:', err.message);
                reject(err);
                return;
            }
            
            if (rows.length === 0) {
                console.log('No performance data available');
            } else {
                rows.forEach((row, index) => {
                    console.log(`${index + 1}. Waveform: ${row.waveform}`);
                    console.log(`   Total Notes: ${row.total_notes}`);
                    console.log(`   Avg Duration: ${row.avg_duration?.toFixed(2) || 'N/A'}s`);
                    console.log(`   Total Sessions: ${row.total_sessions}`);
                    console.log(`   Unique Notes: ${row.unique_notes}\n`);
                });
            }
            resolve();
        });
    });
}

// Main function
async function viewDatabase() {
    try {
        // Display all tables
        await displayTable('presets', 'Synthesizer Presets');
        await displayTable('user_settings', 'User Settings');
        await displayTable('performance_logs', 'Performance Logs');
        await displayTable('compositions', 'Saved Compositions');
        await displayStats();
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ Database viewing complete!');
        
    } catch (error) {
        console.error('❌ Error viewing database:', error.message);
    } finally {
        db.close();
    }
}

// Run the viewer
viewDatabase(); 