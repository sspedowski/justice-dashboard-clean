import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  const hasSvc = Boolean(process.env.FIREBASE_SERVICE_ACCOUNT)
  const hasGac = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  const projectId = process.env.FIREBASE_PROJECT_ID || "<none>"
  const databaseURL = process.env.FIREBASE_DATABASE_URL || "<none>"
  const authRequired = process.env.RTDB_REQUIRE_AUTH ?? "<unset>"

  return NextResponse.json({
    ok: true,
    env: {
      FIREBASE_SERVICE_ACCOUNT: hasSvc ? "<present>" : "<missing>",
      GOOGLE_APPLICATION_CREDENTIALS: hasGac ? "<present>" : "<missing>",
      FIREBASE_PROJECT_ID: projectId,
      FIREBASE_DATABASE_URL: databaseURL,
      RTDB_REQUIRE_AUTH: authRequired,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  })
}
