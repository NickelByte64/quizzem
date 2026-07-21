export class CorsConfig {
  /**
   * Returns the CORS options for the application.
   *
   * @see https://github.com/expressjs/cors#configuration-options
   */
  static getOptions() {
    return {
      origin: ['http://localhost:5173'],
      methods: 'GET,PUT,PATCH,POST,DELETE',
      credentials: true,
    };
  }
}
