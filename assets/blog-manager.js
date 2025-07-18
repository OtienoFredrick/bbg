// Blog Post Management System
// This script helps with post organization and automatic updates

class BlogManager {
  constructor() {
    this.posts = [];
    this.init();
  }
  
  // Initialize the blog manager
  init() {
    console.log('Blog Manager initialized');
    this.loadPosts();
  }
  
  // Simulate loading posts (in a real system, this would fetch from a database)
  loadPosts() {
    this.posts = [
      {
        id: 1,
        title: 'Welcome to My Blog',
        slug: 'welcome-to-my-blog',
        date: '2025-07-18',
        status: 'published',
        excerpt: 'Welcome to Fredrick Writes! This is where I\'ll be sharing my thoughts...',
        path: 'posts/welcome-to-my-blog.html'
      },
      {
        id: 2,
        title: 'My Old Post',
        slug: 'my-old-post',
        date: '2025-01-01',
        status: 'archived',
        excerpt: 'This is a placeholder for an archived post...',
        path: 'posts/archive/my-old-post.html'
      }
    ];
  }
  
  // Add new post
  addPost(postData) {
    const newPost = {
      id: this.posts.length + 1,
      ...postData,
      date: new Date().toISOString().split('T')[0]
    };
    
    this.posts.unshift(newPost); // Add to beginning
    this.updateBlogPages();
    return newPost;
  }
  
  // Get posts by status
  getPostsByStatus(status = 'published') {
    return this.posts.filter(post => post.status === status);
  }
  
  // Get recent posts
  getRecentPosts(limit = 3) {
    return this.getPostsByStatus('published').slice(0, limit);
  }
  
  // Update blog listing pages (simulated)
  updateBlogPages() {
    console.log('Blog pages would be updated with new post list');
    // In a real system, this would regenerate the blog.html and index.html files
  }
  
  // Generate post HTML
  generatePostHTML(postData) {
    const { title, description, content, status } = postData;
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Fredrick Writes</title>
  <meta name="description" content="${description || title}">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header>
    <h1>Fredrick Writes</h1>
    <nav>
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html">Blog</a>
      <a href="../admin.html">Write</a>
    </nav>
  </header>
  
  <main class="post-content">
    <article>
      <header class="post-header">
        <h2>${title}</h2>
        <p class="post-meta">
          <time>${date}</time> • ${status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </header>
      
      <div class="post-body">
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
}

// Initialize blog manager
const blogManager = new BlogManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogManager;
}
