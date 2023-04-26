import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req) {
  const res = NextResponse.next()
  if(req.url === '/api/join/:gameID*'){
    const { gameID } = "1234"
    res.cookies.set("wwGameID", gameID)
    return res
  }


}

export const config = {
  matcher: ['/api/join/:gameID*', '/game', '/lobby']
}
