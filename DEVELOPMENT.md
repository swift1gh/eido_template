# Eido Website - Development Scripts

## Quick Setup

### Option 1: Simple Local Server (Recommended)

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000/index-modular.html

### Option 2: Node.js Server

If you have Node.js installed:

```bash
npx http-server -c-1 -p 8000
```

### Option 3: PHP Server

If you have PHP installed:

```bash
php -S localhost:8000
```

## Development Workflow

### Testing Components

1. Open `component-demo.html` to test individual components
2. Use browser developer tools to inspect component loading
3. Check console for any loading errors

### Adding New Components

1. Create HTML file in `src/components/`
2. Add component to `main.js` loading array
3. (Optional) Create component-specific JavaScript in `src/scripts/components/`
4. (Optional) Add component-specific styles in `src/styles/components/`

### File Structure

```
src/
├── components/           # HTML fragments
├── scripts/
│   ├── main.js          # Main application logic
│   └── components/      # Component-specific scripts
└── styles/
    ├── components.css   # Main component styles
    └── components/      # Individual component styles
```

## Troubleshooting

### Components Not Loading

- Check browser console for 404 errors
- Verify file paths are correct
- Ensure you're serving from a web server (not file://)

### JavaScript Errors

- Check if all required libraries are loaded
- Verify component initialization order
- Use browser debugger to step through code

### CSS Issues

- Check if component styles are imported correctly
- Verify CSS variable definitions
- Test responsive behavior at different screen sizes

## Production Considerations

### Performance Optimization

- Consider concatenating component files for production
- Implement service worker for component caching
- Use lazy loading for below-the-fold components

### Build Process (Future Enhancement)

- CSS/JS minification
- Component bundling
- Asset optimization
- Cache busting

## Browser Compatibility

- Modern browsers (ES6+ required)
- IE11 with polyfills
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- All components loaded from same origin
- No inline script execution
- Standard CORS policies apply
