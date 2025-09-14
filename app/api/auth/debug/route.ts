import { NextRequest, NextResponse } from "next/server"
import { verifyIdToken, verifyAppCheck } from "@/lib/firebaseAdmin"

export const runtime = "nodejs"

type DebugResult = {
  ok: true
  appCheckValid?: boolean
  idToken?: {
    uid: string
    auth_time?: number
    iat?: number
    exp?: number
    firebase?: unknown
    email?: string
    email_verified?: boolean
    tenant?: string
    provider_id?: string
    claims: Record<string, unknown>
  }
  note?: string
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  const appCheckToken = req.headers.get("x-firebase-appcheck")

  const result: DebugResult = { ok: true }

  // Try App Check first for visibility
  if (appCheckToken) {
    result.appCheckValid = await verifyAppCheck(appCheckToken)
  }

  if (auth?.startsWith("Bearer ")) {
    const idToken = auth.slice("Bearer ".length)
    try {
      const decoded = await verifyIdToken(idToken)
      result.idToken = {
        uid: decoded.uid,
        auth_time: decoded.auth_time,
        iat: decoded.iat,
        exp: decoded.exp,
        firebase: decoded.firebase,
        email: decoded.email,
        email_verified: decoded.email_verified,
        tenant: decoded.tenant,
        provider_id: decoded.firebase?.sign_in_provider,
        claims: decoded as unknown as Record<string, unknown>,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid ID token"
      return NextResponse.json({ ok: false, error: msg }, { status: 401 })
    }
  } else {
    result.note = "No Authorization: Bearer <ID_TOKEN> header provided"
  }

  return NextResponse.json(result)
}
