module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'blog',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'www.ayuki.ink',
      ref  : 'origin/master',
      repo : 'https://github.com/MrMystes/blog.git',
      path : '/home/deploy/blog',
      'post-deploy' : 'npm install && npm run build'
    }
  }
};
