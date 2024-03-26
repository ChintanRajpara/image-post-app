module.exports = {
  apps: [
    {
      name: "egress-manager",
      script: "./build/src/main.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: { NODE_ENV: "production" },
    },
  ],
};
