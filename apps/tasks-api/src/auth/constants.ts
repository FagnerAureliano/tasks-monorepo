export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'defaultSecret',
  };
export const jwtExpiration = process.env.JWT_EXPIRATION || '1h';
  