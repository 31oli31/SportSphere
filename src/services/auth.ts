import { JwtPayload, verify } from 'jsonwebtoken'

export const APP_SECRET = '2Be47dYtuFqcDqaoAtQkHbPXaKaOrf2w'
 
export async function authenticateUser(
  request: Request
): Promise<{user: string, space: string, userId: string} | null> {
  const header = request?.headers?.get('authorization') ?? null;
  if (header !== null) {
    const tokenPayload = verify(header, APP_SECRET) as JwtPayload
    console.log("asdf asdf", tokenPayload)
    const user = tokenPayload.username;
    const space = tokenPayload.space
    return {user, space, userId: tokenPayload.id};
  }
 
  return null
}