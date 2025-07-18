# Fredrick Writes - Personal Blog

A clean, modern personal blog built with HTML, CSS, and JavaScript. Features a responsive design, organized post structure, and easy-to-maintain codebase.

## 🌟 Features

- **Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **Clean Architecture**: Well-organized file structure for easy maintenance
- **Modern Styling**: Contemporary design with smooth transitions and hover effects
- **Archive System**: Separate section for archived posts
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Lightweight, pure HTML/CSS/JS implementation

## 📁 Project Structure

```
bbg/
├── index.html          # Homepage with recent posts
├── about.html          # About page
├── blog.html           # All posts listing
├── style.css           # Main stylesheet
├── posts/              # Blog posts directory
│   ├── welcome-to-my-blog.html
│   └── archive/        # Archived posts
│       └── my-old-post.html
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   └── tasks.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A text editor (VS Code recommended)
- Optional: Live Server extension for VS Code

### Running the Blog

1. **Open the project** in VS Code
2. **Install Live Server extension** (if not already installed)
3. **Right-click on `index.html`** and select "Open with Live Server"
4. **Or simply open `index.html`** in your web browser

### Using VS Code Tasks

This project includes VS Code tasks for common operations:

- **Ctrl+Shift+P** → "Tasks: Run Task" → Select a task

## 📝 Adding New Posts

1. **Create a new HTML file** in the `posts/` directory
2. **Copy the structure** from `welcome-to-my-blog.html`
3. **Update the content** with your new post
4. **Add the post** to `blog.html` and `index.html` (recent posts section)

### Post Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Post Title - Fredrick Writes</title>
  <meta name="description" content="Your post description">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <!-- Copy structure from existing post -->
</body>
</html>
```

## 🎨 Customization

### Colors
The CSS uses CSS custom properties (variables) for easy theming. Edit these in `style.css`:

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  /* ... more variables */
}
```

### Fonts
Currently using system fonts. To add custom fonts, update the `font-family` in `style.css`.

### Layout
The design is mobile-first and responsive. Main breakpoints:
- Mobile: < 480px
- Tablet: < 768px
- Desktop: > 768px

## 📱 Responsive Features

- Flexible navigation that adapts to screen size
- Scalable typography
- Touch-friendly buttons and links
- Optimized reading experience on all devices

## 🔧 Development

### File Organization
- **HTML files**: Main pages in root, posts in `posts/` directory
- **CSS**: Single `style.css` file with organized sections
- **Assets**: Add images, fonts, etc. to an `assets/` directory (create as needed)

### Best Practices
- Use semantic HTML elements
- Maintain consistent file naming (kebab-case)
- Add proper meta descriptions for SEO
- Test on multiple devices and browsers

## 🚀 Deployment

This is a static site that can be deployed to:

- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repo to Vercel
- **Any web hosting**: Upload files via FTP

## 📄 License

This project is open source. Feel free to use it as a template for your own blog.

## 🤝 Contributing

This is a personal blog template, but suggestions and improvements are welcome!

---

**Happy blogging!** 🎉
