const admin = require('firebase-admin');

if (!admin.apps.length) {
  if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn('FIREBASE env not configured - firebaseAuth will fail without proper env vars in production.');
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
  }
}

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    const idToken = authHeader.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = decoded;
    next();
  } catch (err) {
    console.error('Firebase auth error', err && err.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
