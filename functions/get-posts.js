const fs = require('fs').promises;
const path = require('path');

const POSTS_INDEX_FILE = path.join(process.cwd(), 'posts-index.json');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    };
  }

  try {
    // Read posts from file-based index
    let posts = [];
    try {
      const indexData = await fs.readFile(POSTS_INDEX_FILE, 'utf8');
      posts = JSON.parse(indexData);
    } catch (e) {
      // No posts yet, return empty array
      posts = [];
    }
    
    // Filter only published posts and sort by date (newest first)
    const publishedPosts = posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(publishedPosts)
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
