import { SignJWT, jwtVerify } from 'jose'

// Clave secreta (obtenida de una variable de entorno)
const secretKey = new TextEncoder().encode(process.env.COOKIE_SECRET)

// Crear un JWT firmado
export const createEncryptedJWT = async (payload) => {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' }) // Algoritmo de firma
      .setIssuedAt() // Campo iat (issued at)
      .setExpirationTime('2h') // Expira en 2 horas
      .sign(secretKey) // Firma el JWT con la clave secreta

    return token
  } catch (error) {
    console.error('Error al crear el JWT:', error)
    throw new Error('Error al crear el token')
  }
}

// Verificar y decodificar un JWT firmado
export const verifyEncryptedJWT = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'], // Especificar el algoritmo esperado
    })

    return payload // Retorna el payload si el token es válido
  } catch (error) {
    console.error('Error al verificar el JWT:', error)
    throw new Error('Token inválido o expirado')
  }
}
