module.exports = {
  apps: [
    {
      name: `backend-test-case`,
      script: "./src/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "localhost",
      },
      env_development: {
        NODE_ENV: process.env.NODE_ENV,
      },
      env_staging: {
        NODE_ENV: process.env.NODE_ENV,
      },
      env_production: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
