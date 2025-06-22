# Contributing to Retro Music App

Thank you for your interest in contributing to the Retro Music App! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### **Types of Contributions**

We welcome contributions in the following areas:

- **Bug Fixes**: Report and fix bugs
- **Feature Requests**: Suggest and implement new features
- **Documentation**: Improve README, code comments, and guides
- **UI/UX Improvements**: Enhance the user interface and experience
- **Performance Optimizations**: Improve app performance
- **Testing**: Add tests and improve test coverage

### **Before You Start**

1. **Check Existing Issues**: Look for existing issues or discussions
2. **Discuss Changes**: Open an issue to discuss major changes
3. **Follow Guidelines**: Read this document and the code style guide

## 🚀 Development Setup

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn
- Git

### **Local Development**

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/retro-music-app.git
   cd retro-music-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Run Tests**
   ```bash
   npm test
   ```

## 📝 Code Style Guidelines

### **JavaScript**
- Use **ES6+** features
- Follow **camelCase** for variables and functions
- Use **PascalCase** for classes
- Add **JSDoc comments** for functions
- Keep functions **small and focused**

### **HTML/CSS**
- Use **semantic HTML** elements
- Follow **BEM methodology** for CSS classes
- Use **Tailwind CSS** utility classes
- Keep **CSS organized** and commented

### **Database**
- Use **descriptive table and column names**
- Add **appropriate indexes**
- Include **timestamps** for all tables
- Use **foreign keys** where appropriate

## 🔧 Development Workflow

### **1. Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

### **2. Make Your Changes**
- Write clean, well-documented code
- Add tests for new features
- Update documentation as needed

### **3. Test Your Changes**
```bash
# Run all tests
npm test

# Test specific functionality
npm run test-api

# View database contents
npm run view-db
```

### **4. Commit Your Changes**
```bash
git add .
git commit -m "feat: add new synthesizer waveform

- Add triangle wave oscillator
- Update UI controls for new waveform
- Add tests for triangle wave functionality
- Update documentation"
```

### **5. Push and Create Pull Request**
```bash
git push origin feature/your-feature-name
```

## 📋 Pull Request Guidelines

### **Before Submitting**

1. **Test Thoroughly**
   - Run all tests: `npm test`
   - Test in multiple browsers
   - Check for console errors
   - Verify database functionality

2. **Update Documentation**
   - Update README if needed
   - Add code comments
   - Update API documentation

3. **Check Code Quality**
   - Follow style guidelines
   - Remove debug code
   - Optimize performance

### **Pull Request Template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] All tests pass
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Database functionality verified

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🐛 Reporting Bugs

### **Bug Report Template**

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g. Chrome 90]
- OS: [e.g. macOS 11.4]
- Node.js version: [e.g. 16.0.0]

## Additional Information
Screenshots, console logs, etc.
```

## 💡 Feature Requests

### **Feature Request Template**

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why this feature would be useful

## Proposed Implementation
How you think it should work

## Alternatives Considered
Other approaches you considered

## Additional Information
Mockups, examples, etc.
```

## 🧪 Testing Guidelines

### **What to Test**
- **API Endpoints**: All CRUD operations
- **Database Operations**: Create, read, update, delete
- **UI Interactions**: Buttons, forms, navigation
- **Audio Functionality**: Synthesis, effects, controls
- **Cross-browser Compatibility**: Chrome, Firefox, Safari, Edge

### **Writing Tests**
```javascript
// Example test structure
describe('Preset Management', () => {
  it('should create a new preset', async () => {
    // Test implementation
  });

  it('should load an existing preset', async () => {
    // Test implementation
  });
});
```

## 📚 Documentation

### **What to Document**
- **New Features**: How to use them
- **API Changes**: Updated endpoints
- **Database Changes**: New tables or columns
- **Configuration**: Environment variables, settings

### **Documentation Standards**
- Use **clear, concise language**
- Include **code examples**
- Add **screenshots** for UI changes
- Keep **up to date**

## 🎵 Audio Development

### **Web Audio API Guidelines**
- **Use AudioContext efficiently**
- **Clean up resources** when done
- **Handle audio permissions** gracefully
- **Test audio on different devices**

### **Synthesizer Development**
- **Follow standard synthesis techniques**
- **Optimize for real-time performance**
- **Provide meaningful parameter ranges**
- **Add visual feedback** for controls

## 🤝 Community Guidelines

### **Be Respectful**
- Use **inclusive language**
- **Listen to feedback**
- **Be patient** with newcomers
- **Help others** when possible

### **Communication**
- **Ask questions** if unsure
- **Provide context** in issues
- **Be specific** about problems
- **Follow up** on discussions

## 📞 Getting Help

### **Resources**
- **Issues**: [GitHub Issues](https://github.com/yourusername/retro-music-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/retro-music-app/discussions)
- **Documentation**: README.md and inline comments

### **Questions**
- **Search existing issues** first
- **Provide detailed information**
- **Include error messages**
- **Share relevant code**

## 🏆 Recognition

### **Contributor Recognition**
- **Contributors list** in README
- **Special thanks** for major contributions
- **Credit** in release notes
- **Contributor badges** for regular contributors

---

**Thank you for contributing to Retro Music App!** 🎵✨

Your contributions help make this project better for everyone in the music and retro enthusiast community. 