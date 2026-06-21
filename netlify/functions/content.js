const { getStore } = require('@netlify/blobs');

const KEY = 'site-content.json';
const ADMIN_PASSWORD = 'bladeadmin2025';

exports.handler = async (event) => {
  const store = getStore('xolarc-content');

  if (event.httpMethod === 'GET') {
    const data = await store.get(KEY);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: data || 'null'
    };
  }

  if (event.httpMethod === 'POST') {
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, body: 'Invalid JSON' };
    }

    if (body.password !== ADMIN_PASSWORD) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    await store.set(KEY, JSON.stringify(body.content));
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: '{"ok":true}' };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
