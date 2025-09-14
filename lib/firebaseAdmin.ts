/* eslint-disable @typescript-eslint/no-require-imports */
// lib/firebaseAdmin.ts
// Lazy, single-instance firebase-admin for Node runtime routes.

type AdminNS = typeof import("firebase-admin")

const globalForAdmin = globalThis as unknown as {
  __adminApp?: import("firebase-admin").app.App
}

function getAdmin(): AdminNS {
  // require inside function so nothing runs at import-time during build
  // and to avoid edge bundling issues
    return require("firebase-admin") as AdminNS
}

function initAdminApp() {
  if (globalForAdmin.__adminApp) return globalForAdmin.__adminApp
  const admin = getAdmin()

  if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      globalForAdmin.__adminApp = admin.initializeApp({
        credential: admin.credential.cert(creds),
      })
    } else {
      // falls back to GOOGLE_APPLICATION_CREDENTIALS or metadata
      globalForAdmin.__adminApp = admin.initializeApp()
    }
  } else {
    globalForAdmin.__adminApp = admin.app()
  }
  return globalForAdmin.__adminApp
}

export function getDb() {
  const admin = getAdmin()
  return initAdminApp().firestore()
}

export function verifyIdToken(idToken: string) {
  const admin = getAdmin()
  return admin.auth().verifyIdToken(idToken)
}

export async function verifyAppCheck(token?: string): Promise<boolean> {
  if (!token) return false
  const admin = getAdmin()
  try {
    await admin.appCheck().verifyToken(token)
    return true
  } catch {
    return false
  }
}