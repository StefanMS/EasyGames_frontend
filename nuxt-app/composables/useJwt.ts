interface JwtPayload {
  sub: string;
  exp: number;
}

export function decodeJWT(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1]; // JWT consists of three parts: header, payload, and signature
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function useCurrentUser(token: string | null) {
  if (token) {
    const decodedToken = decodeJWT(token);
    if (decodedToken) {
      return {
        userId: decodedToken.sub,
        expiration: new Date(decodedToken.exp * 1000),
      };
    } else {
      console.error('Failed to decode token');
      return null;
    }
  }

  console.error('No access token provided');
  return null;
}
