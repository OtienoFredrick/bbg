const fs = require('fs').promises;
const path = require('path');

const POSTS_INDEX_FILE = path.join(process.cwd(), 'posts-index.json');
const POSTS_DIR = path.join(process.cwd(), 'posts');
const ARCHIVE_DIR = path.join(process.cwd(), 'posts', 'archive');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  try {
    // Calculate 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Read current posts
    let posts = [];
    try {
      const indexData = await fs.readFile(POSTS_INDEX_FILE, 'utf8');
      posts = JSON.parse(indexData);
    } catch (e) {
      // No posts to archive
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: true,
          archived_count: 0,
          message: 'No posts to archive' 
        })
      };
    }

    // Find posts to archive (older than 24 hours and currently published)
    const postsToArchive = posts.filter(post => {
      const postDate = new Date(post.date);
      return post.status === 'published' && postDate < twentyFourHoursAgo;
    });

    let archivedCount = 0;

    // Archive each post
    for (const post of postsToArchive) {
      try {
        // Ensure archive directory exists
        await fs.mkdir(ARCHIVE_DIR, { recursive: true });
        
        // Move HTML file to archive
        const currentPath = path.join(POSTS_DIR, `${post.slug}.html`);
        const archivePath = path.join(ARCHIVE_DIR, `${post.slug}.html`);
        
        try {
          await fs.rename(currentPath, archivePath);
        } catch (e) {
          // File might not exist, continue
        }
        
        // Update post status in index
        const postIndex = posts.findIndex(p => p.id === post.id);
        if (postIndex !== -1) {
          posts[postIndex].status = 'archived';
          posts[postIndex].archived_at = new Date().toISOString();
          archivedCount++;
        }
      } catch (e) {
        console.error('Error archiving post:', post.title, e);
      }
    }

    // Save updated index
    if (archivedCount > 0) {
      await fs.writeFile(POSTS_INDEX_FILE, JSON.stringify(posts, null, 2), 'utf8');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        archived_count: archivedCount,
        message: `Archived ${archivedCount} posts` 
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
