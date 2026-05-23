export interface IEnvVariables {
  BACKEND_PORT: number;
  FRONTEND_URL: string;
  // DB CREDENTIALS
  DB_CLIENT: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  // REDIS CREDENTIALS
  REDIS_HOST: string;
  REDIS_PORT: number;
  // Secret keys
  COOKIE_PARSER_SECRET_KEY: string;
  PASETO_PRIVATE_KEY: string;
  PASETO_PUBLIC_KEY: string;
}
