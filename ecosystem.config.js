const conf = require('./config.json');

module.exports = {
  apps : [{
    name: conf.app_name,
    script: conf.app_root,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: conf.development_port
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: conf.production_port
    }
  }]
}