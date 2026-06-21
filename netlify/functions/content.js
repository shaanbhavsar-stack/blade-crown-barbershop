const { getStore } = require('@netlify/blobs');

const KEY = 'site-content.json';
const ADMIN_PASSWORD = 'bladeadmin2025';
const SITE_ID = '2c0e89c2-0743-4e6d-a8f3-23bb1d79612f';
const TOKEN = 'nfp_uDxJNyCfj7HLfMZNTHvz9bAWqPVP1iKW8739';

exports.handler = async (event) => {
  const store = getStore({ name: 'xolarc-content', siteID: SITE_ID, token: TOKEN });

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
