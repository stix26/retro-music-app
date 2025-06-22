# Deployment Guide

This guide covers how to deploy the Retro Music App to various hosting platforms.

## 🚀 Quick Deployment Options

### **1. Local Development (Recommended for Testing)**
```bash
# Clone and setup
git clone https://github.com/yourusername/retro-music-app.git
cd retro-music-app
npm install
npm run init-db
npm start

# Access at http://localhost:3000
```

### **2. Heroku Deployment**
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-retro-music-app

# Add buildpack for Node.js
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main

# Open app
heroku open
```

### **3. Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and deploy
```

### **4. Railway Deployment**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 📋 Prerequisites

### **System Requirements**
- **Node.js**: Version 14 or higher
- **npm**: Version 6 or higher
- **Git**: For version control
- **Database**: SQLite (included) or external database

### **Environment Variables**
Create a `.env` file for production:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=./synth_database.db
CORS_ORIGIN=*
```

## 🌐 Platform-Specific Deployment

### **Heroku**

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Configure Environment**
   ```bash
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

4. **Open App**
   ```bash
   heroku open
   ```

**Note**: Heroku uses ephemeral filesystem, so database will reset on each deploy. Consider using Heroku Postgres for persistent data.

### **Vercel**

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings

2. **Build Configuration**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

3. **Deploy**
   - Vercel will automatically deploy on git push
   - Or use `vercel --prod` for manual deployment

### **Railway**

1. **Connect Repository**
   ```bash
   railway login
   railway init
   ```

2. **Configure Environment**
   ```bash
   railway variables set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   railway up
   ```

### **DigitalOcean App Platform**

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select Node.js environment

2. **Configure Build**
   ```yaml
   build_command: npm install
   run_command: npm start
   ```

3. **Set Environment Variables**
   - NODE_ENV=production
   - PORT=8080

### **AWS Elastic Beanstalk**

1. **Prepare Application**
   ```bash
   # Create Procfile
   echo "web: npm start" > Procfile
   ```

2. **Deploy via EB CLI**
   ```bash
   eb init
   eb create
   eb deploy
   ```

## 🗄️ Database Considerations

### **SQLite (Default)**
- **Pros**: Simple, no setup required
- **Cons**: Not suitable for production with multiple users
- **Use Case**: Development, single-user production

### **PostgreSQL (Recommended for Production)**
1. **Install PostgreSQL adapter**
   ```bash
   npm install pg
   ```

2. **Update database connection**
   ```javascript
   // In server.js
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   ```

3. **Migrate schema**
   ```sql
   -- Create tables in PostgreSQL
   CREATE TABLE presets (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL UNIQUE,
     -- ... other columns
   );
   ```

### **MongoDB**
1. **Install MongoDB driver**
   ```bash
   npm install mongodb
   ```

2. **Update database operations**
   ```javascript
   const { MongoClient } = require('mongodb');
   const client = new MongoClient(process.env.MONGODB_URI);
   ```

## 🔧 Production Configuration

### **Environment Variables**
```env
# Required
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=your_database_connection_string

# Security
CORS_ORIGIN=https://yourdomain.com
SESSION_SECRET=your_session_secret

# Optional
LOG_LEVEL=info
ENABLE_LOGGING=true
```

### **Security Considerations**
1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure CORS for your domain
3. **Rate Limiting**: Add rate limiting for API endpoints
4. **Input Validation**: Validate all user inputs
5. **SQL Injection**: Use parameterized queries

### **Performance Optimization**
1. **Compression**: Enable gzip compression
2. **Caching**: Add appropriate cache headers
3. **CDN**: Use CDN for static assets
4. **Database Indexing**: Add indexes for frequently queried columns

## 📊 Monitoring and Logging

### **Application Monitoring**
```javascript
// Add to server.js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### **Error Tracking**
```javascript
// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### **Health Check Endpoint**
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
```

## 🔄 Continuous Deployment

### **GitHub Actions**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

### **Vercel Auto-Deploy**
- Connect GitHub repository to Vercel
- Automatic deployment on push to main branch

## 🐛 Troubleshooting

### **Common Deployment Issues**

1. **Port Issues**
   ```javascript
   // Use environment variable for port
   const PORT = process.env.PORT || 3000;
   ```

2. **Database Connection**
   ```javascript
   // Handle database connection errors
   db.on('error', (err) => {
     console.error('Database error:', err);
   });
   ```

3. **Static Files**
   ```javascript
   // Serve static files correctly
   app.use(express.static(path.join(__dirname, '.')));
   ```

### **Debug Commands**
```bash
# Check logs
heroku logs --tail
vercel logs
railway logs

# Check environment
heroku config
vercel env ls
railway variables
```

## 📈 Scaling Considerations

### **Horizontal Scaling**
- Use load balancer for multiple instances
- Implement session storage (Redis)
- Use external database (PostgreSQL, MongoDB)

### **Vertical Scaling**
- Increase server resources
- Optimize database queries
- Add caching layers

### **Performance Monitoring**
- Monitor response times
- Track database performance
- Monitor memory usage
- Set up alerts for errors

---

## 🎯 Quick Start Checklist

- [ ] Choose deployment platform
- [ ] Set up environment variables
- [ ] Configure database (if using external)
- [ ] Set up domain and SSL
- [ ] Configure monitoring
- [ ] Test deployment
- [ ] Set up CI/CD pipeline
- [ ] Monitor performance

---

**Need help?** Check the [Issues](https://github.com/yourusername/retro-music-app/issues) or create a new one for deployment-specific problems. 