// app/api/proxy/route.js
export const dynamic = 'force-dynamic'; // Ensure the route is never cached

export async function GET(request) {
  try {
    // Get the URL from the query parameter
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Fetch the content from the provided URL
    const response = await fetch(url, {
      headers: {
        // Copy some headers from the original request but exclude others
        // for security reasons
        'User-Agent': 'Mistral Document Chat/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
    }
    
    // Get the response as an array buffer to handle binary files
    const data = await response.arrayBuffer();
    
    // Return the proxied response with appropriate headers
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*', // Allow CORS
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {