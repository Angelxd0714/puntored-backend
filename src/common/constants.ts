export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET || 'default_secret',
  nameBd: process.env.NAME_DB || 'default_name_db',
  passwordBd: process.env.PASSWORD_DB || 'default_password_db',
  userBd: process.env.USER_DB || 'default_user_db',
  expiresIn: process.env.EXPIRES_IN || '1h',
};
