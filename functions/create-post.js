const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Simple file-based storage for now (works without database)
const POSTS_DIR = path.join(process.cwd(), 'posts');
const POSTS_INDEX_FILE = path.join(process.cwd(), 'posts-index.json');

// Convert plain text to HTML
function convertToHTML(text) {
  let html = '';
  const lines = text.split('\n');
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (line === '') {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }
    
    // Check if it's a bullet point
    if (line.startsWith('- ') || line.startsWith('• ')) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `  <li>${line.substring(2)}</li>\n`;
    }
    // Check if it looks like a heading
    else if (line.length < 50 && !line.endsWith('.') && !line.endsWith('!') && !line.endsWith('?') && i > 0) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h3>${line}</h3>\n`;
    }
    // Regular paragraph
    else {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<p>${line}</p>\n\n`;
    }
  }
  
  if (inList) {
    html += '</ul>\n';
  }
  
  return html;
}

function createSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createPostHTML(title, content, slug, date) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Fredrick Writes</title>
  <meta name="description" content="${title}">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header>
    <h1>Fredrick Writes</h1>
    <nav>
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html">Blog</a>
      <a href="../write.html">Write</a>
    </nav>
  </header>
  
  <main>
    <article class="post">
      <header class="post-header">
        <h1>${title}</h1>
        <time datetime="${new Date(date).toISOString()}">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      </header>
      
      <div class="post-content">
        ${content}
      </div>
    </article>
    
    <nav class="post-navigation">
      <a href="../blog.html" class="back-to-blog">← Back to Blog</a>
    </nav>
  </main>
  
  <footer>
    <p>&copy; 2025 Fredrick Writes. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Verify JWT token
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const token = authHeader.substring(7);
    jwt.verify(token, JWT_SECRET);

    const { title, content } = JSON.parse(event.body);
    
    if (!title || !content) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Title and content are required' })
      };
    }

    // Convert plain text to HTML
    const htmlContent = convertToHTML(content);
    const slug = createSlug(title);
    const now = new Date();
    
    // Create post data
    const postData = {
      id: now.getTime(),
      title,
      slug,
      content: htmlContent,
      plainContent: content,
      date: now.toISOString(),
      status: 'published'
    };
    
    // Create HTML file for the post
    const postHTML = createPostHTML(title, htmlContent, slug, now);
    const postFilePath = path.join(POSTS_DIR, `${slug}.html`);
    
    try {
      // Ensure posts directory exists
      await fs.mkdir(POSTS_DIR, { recursive: true });
      
      // Write the HTML file
      await fs.writeFile(postFilePath, postHTML, 'utf8');
      
      // Update posts index
      let postsIndex = [];
      try {
        const indexData = await fs.readFile(POSTS_INDEX_FILE, 'utf8');
        postsIndex = JSON.parse(indexData);
      } catch (e) {
        // File doesn't exist yet, start with empty array
      }
      
      // Add new post to beginning of array
      postsIndex.unshift(postData);
      
      // Write updated index
      await fs.writeFile(POSTS_INDEX_FILE, JSON.stringify(postsIndex, null, 2), 'utf8');
      
    } catch (fileError) {
      throw new Error(`Failed to save post: ${fileError.message}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        post: postData,
        message: 'Post published successfully!' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
