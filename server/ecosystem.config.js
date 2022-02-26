module.exports = {
  apps: [
    {
      name: "server",
      script: "./src/server.js",
      // number of app instance to be launched, how many core
      instances: "MAX",
      // true by default. if false, PM2 will not restart your app if it crashes or ends peacefully
      autorestart: true,
      // enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded
      watch: true,
      // your app will be restarted if it exceeds the amount of memory specified.
      // human-friendly format : it can be “10M”, “100K”, “2G” and so on
      max_memory_restart: "1G",
      // mode to start your app, can be “cluster” or “fork”, default fork
      exec_mode: "cluster",
      // env variables which will appear in your app
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};