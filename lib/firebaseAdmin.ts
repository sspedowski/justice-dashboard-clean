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
  // (we disable the require-imports rule at file level)
  return require("firebase-admin") as AdminNS
}

function resolveProjectId(): string | undefined {
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      return creds.project_id as string | undefined
    }
  } catch {
    // ignore JSON parse issues; init will still work if GOOGLE_APPLICATION_CREDENTIALS is set
  }
  return undefined
}

function resolveDatabaseURL(projectId?: string): string | undefined {
  if (process.env.FIREBASE_DATABASE_URL) return process.env.FIREBASE_DATABASE_URL
  if (projectId) return `https://${projectId}.firebaseio.com`
  return undefined
}

function initAdminApp() {
  if (globalForAdmin.__adminApp) return globalForAdmin.__adminApp

  const admin = getAdmin()
  const projectId = resolveProjectId()
  const databaseURL = resolveDatabaseURL(projectId)
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET

  if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      globalForAdmin.__adminApp = admin.initializeApp({
        credential: admin.credential.cert(creds),
        projectId: projectId || creds.project_id,
        databaseURL,
        storageBucket,
      })
    } else {
      // falls back to GOOGLE_APPLICATION_CREDENTIALS or metadata
      globalForAdmin.__adminApp = admin.initializeApp({
        projectId,
        databaseURL,
        storageBucket,
      })
    }
  } else {
    globalForAdmin.__adminApp = admin.app()
  }
  return globalForAdmin.__adminApp
}

/**
 * Get Firestore instance using Admin credentials.
 */
export function getDb() {
  return initAdminApp().firestore()
}

/**
 * Get Realtime Database instance using Admin credentials.
 */
export function getRtdb() {
  return initAdminApp().database()
}

/**
 * Verify a Firebase Auth ID token using Admin SDK.
 */
export function verifyIdToken(idToken: string) {
  const admin = getAdmin()
  return admin.auth().verifyIdToken(idToken)
}

/**
 * Verify Firebase App Check token if provided; returns boolean.
 */
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