module.exports = {
  apps: [
    {
      name: "agihf",
      script: "npm",
      args: "start"
    }
  ],

  deploy: {
    production: {
      user: "root",
      host: "187.124.99.198",
      ref: "origin/main",
      repo: "https://github.com/insight-edge-dev/aahii.git",
      path: "/var/www/AAHII",
      "post-deploy": "npm install && npm run build && pm2 startOrRestart ecosystem.config.js"
    }
  }
};