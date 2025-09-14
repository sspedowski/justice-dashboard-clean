import { NextRequest, NextResponse } from "next/server"
import { verifyIdToken, verifyAppCheck } from "@/lib/firebaseAdmin"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  const appCheckToken = req.headers.get("x-firebase-appcheck")

  const result: any = { ok: true }

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
        claims: decoded,
      }
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e?.message ?? "Invalid ID token" }, { status: 401 })
    }
  } else {
    result.note = "No Authorization: Bearer <ID_TOKEN> header provided"
  }

  return NextResponse.json(result)
}
