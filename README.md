# 🎵 Retro Music App - Synthesizer with SQL Database

A beautiful, feature-rich retro synthesizer web application with a complete SQLite database backend for storing presets, compositions, user settings, and performance analytics.

![Retro Synthesizer](https://img.shields.io/badge/Style-Retro%20Synth-blue?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-SQLite-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 🎹 What This Project Does

This is a **full-stack web application** that combines:

### **Frontend: Retro Synthesizer**
- **Real-time Audio Synthesis** using Web Audio API
- **Beautiful Retro UI** with neon colors and vintage aesthetics
- **Interactive Controls**: Knobs, sliders, buttons with visual feedback
- **Virtual Keyboard**: Click or use computer keyboard (A-K keys)
- **Real-time Visualization**: Oscilloscope and spectrum analyzer
- **Multiple Waveforms**: Sine, Sawtooth, Square, and Noise
- **Advanced Effects**: Reverb, Delay, Chorus with real-time processing
- **ADSR Envelope**: Attack, Decay, Sustain, Release controls
- **Filter System**: Low-pass filter with resonance control

### **Backend: SQL Database System**
- **SQLite Database** for persistent storage
- **RESTful API** with full CRUD operations
- **Preset Management**: Save, load, and delete synthesizer configurations
- **Performance Analytics**: Track every note played and usage patterns
- **User Settings**: Persistent preferences and configurations
- **Composition Storage**: Save and load musical sequences
- **Session Tracking**: Monitor user engagement and patterns

## ✨ Key Features

### 🎛️ **Synthesizer Features**
- **4 Waveforms**: Pure sine, rich sawtooth, punchy square, atmospheric noise
- **Real-time Filtering**: Low-pass filter with resonance (100Hz - 10kHz)
- **ADSR Envelope**: Precise control over sound shaping
- **Effects Chain**: Reverb, delay, and chorus with mix controls
- **Virtual Keyboard**: 13-note range (C4 to C5) with visual feedback
- **Computer Keyboard Support**: Use A-K keys for quick playing
- **Real-time Visualization**: Live oscilloscope and spectrum analyzer
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🗄️ **Database Features**
- **5 Default Presets**: Classic Sine, Warm Pad, Lead Synth, Bass Line, Noise Drone
- **Custom Preset Creation**: Save any synthesizer configuration
- **Performance Analytics**: Track notes, duration, effects usage
- **User Preferences**: Theme, keyboard layout, audio settings
- **Composition Storage**: Save musical sequences with tempo and key
- **Session Management**: Unique session tracking for analytics
- **Data Export**: View database contents in multiple formats
- **Automatic CSV Export**: Performance logs automatically exported to `performance_logs.csv` when server stops

### 🎨 **UI/UX Features**
- **Retro Aesthetic**: Neon colors, vintage fonts, glowing effects
- **Interactive Elements**: Hover effects, animations, visual feedback
- **Dark Theme**: Easy on the eyes for extended use
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/retro-music-app.git
   cd retro-music-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   npm run init-db
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to: `http://localhost:3000`

## 📁 Project Structure

```
retro-music-app/
├── index.html              # Main application interface
├── db-client.js            # Database client functionality
├── server.js               # Express server with API endpoints
├── init-database.js        # Database initialization script
├── view-database.js        # Database viewer utility
├── test-api.js             # API testing script
├── package.json            # Node.js dependencies and scripts
├── README.md               # This file
├── synth_database.db       # SQLite database (created after init)
└── database_dump.sql       # Database export (optional)
```

## 🎮 How to Use

### **Playing the Synthesizer**

1. **Virtual Keyboard**
   - Click on the piano keys to play notes
   - Use computer keyboard: A-K keys map to C4-C5
   - Visual feedback shows active notes

2. **Waveform Selection**
   - Click waveform buttons: SINE, SAW, SQUARE, NOISE
   - Each has unique tonal characteristics
   - Active waveform is highlighted

3. **Parameter Controls**
   - **Knobs**: Drag vertically to adjust values
   - **Sliders**: Drag horizontally for precise control
   - **Real-time updates**: Changes apply immediately

### **Using Database Features**

1. **Loading Presets**
   - Select a preset from the dropdown
   - Click "Load" to apply settings
   - All parameters update instantly

2. **Saving Presets**
   - Adjust synthesizer to desired sound
   - Click "Save" in database panel
   - Enter name and description
   - Preset is saved and available immediately

3. **Viewing Statistics**
   - Click "Refresh" to update stats
   - View total notes, sessions, average duration
   - Performance data updates in real-time

4. **Managing Compositions**
   - Click "Save" to store current composition
   - Enter tempo, key signature, time signature
   - Load compositions to view details

## 🔧 Development

### **Available Scripts**

```bash
npm start          # Start the production server
npm run dev        # Start with auto-restart (development)
npm run init-db    # Initialize database with default data
npm run test       # Run API tests
npm run view-db    # View database contents
```

### **Data Export Features**

- **Automatic CSV Export**: When you stop the server (Ctrl+C), performance logs are automatically exported to `performance_logs.csv`
- **Manual Database Viewing**: Use `npm run view-db` to see all database contents in the terminal
- **API Access**: All data accessible via REST API endpoints for custom export scripts

### **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/presets` | Get all presets |
| GET | `/api/presets/:id` | Get specific preset |
| POST | `/api/presets` | Create new preset |
| PUT | `/api/presets/:id` | Update preset |
| DELETE | `/api/presets/:id` | Delete preset |
| GET | `/api/settings/:userId` | Get user settings |
| PUT | `/api/settings/:userId` | Update user settings |
| POST | `/api/logs` | Log performance data |
| GET | `/api/stats` | Get performance statistics |
| GET | `/api/compositions` | Get all compositions |
| POST | `/api/compositions` | Save new composition |

### **Database Schema**

#### **presets** table
- `id`: Primary key
- `name`: Preset name (unique)
- `description`: Preset description
- `frequency`, `waveform`, `cutoff`, `resonance`: Oscillator settings
- `attack`, `decay`, `sustain`, `release`: Envelope settings
- `volume`, `reverb`, `delay`, `chorus`: Effects settings
- `pitch_bend`, `modulation`: Modulation settings
- `created_at`, `updated_at`: Timestamps

#### **user_settings** table
- `user_id`: User identifier
- `theme`: UI theme preference
- `keyboard_layout`: Keyboard layout setting
- `audio_latency`: Audio buffer size
- `sample_rate`: Audio sample rate
- `master_volume`: Master volume setting

#### **performance_logs** table
- `session_id`: Session identifier
- `note_played`: Musical note
- `frequency`: Note frequency
- `duration`: Note duration
- `waveform`: Waveform used
- `effects_used`: JSON string of effects settings

#### **compositions** table
- `name`: Composition name
- `description`: Composition description
- `notes_data`: JSON string of note sequence
- `tempo`: BPM
- `key_signature`: Musical key
- `time_signature`: Time signature

## 🛠️ Customization

### **Adding New Features**

1. **Database Schema Changes**
   - Modify `init-database.js` to add tables/columns
   - Run `npm run init-db` to apply changes

2. **API Endpoints**
   - Add new routes in `server.js`
   - Follow existing RESTful patterns

3. **Frontend Features**
   - Extend `db-client.js` with new functionality
   - Add UI elements to the database panel

### **Styling Customization**

The app uses Tailwind CSS for styling. Key custom CSS variables:
```css
--neon-pink: #ff0080;
--neon-blue: #00ffff;
--neon-purple: #8a2be2;
--neon-green: #39ff14;
--neon-orange: #ff6600;
```

## 🐛 Troubleshooting

### **Common Issues**

1. **Audio not working**
   - Check browser permissions for audio
   - Ensure Web Audio API is supported
   - Try refreshing the page

2. **Database connection failed**
   - Verify server is running: `npm start`
   - Check database file exists: `synth_database.db`
   - Reinitialize database: `npm run init-db`

3. **Presets not loading**
   - Check browser console for errors
   - Verify API endpoints are responding
   - Test with: `curl http://localhost:3000/api/presets`

### **Debug Commands**

```bash
# Check server status
curl http://localhost:3000/api/presets

# View database contents
npm run view-db

# Test all API endpoints
npm test

# Check server logs
tail -f server.log
```

## 📊 Performance

### **Browser Compatibility**
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### **System Requirements**
- **CPU**: Any modern processor
- **RAM**: 512MB minimum, 2GB recommended
- **Storage**: 50MB for application + database
- **Network**: Local development only (no internet required)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### **Development Guidelines**
- Follow existing code style
- Add tests for new features
- Update documentation
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Web Audio API** for real-time audio synthesis
- **Tailwind CSS** for responsive styling
- **SQLite** for lightweight database storage
- **Express.js** for the web server framework
- **Orbitron & Rajdhani** fonts for the retro aesthetic

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/retro-music-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/retro-music-app/discussions)
- **Email**: sseymens@gmail.com

---

**Made with ❤️ for music lovers and retro enthusiasts**

*Turn up the volume and start creating!* 🎵✨ 