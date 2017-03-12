let indexPath = "./prod/index.html";

module.exports = {
  port: 5555,
  server: {
    baseDir: [".", "prod"],
    middleware: {
      1: require("connect-history-api-fallback")({ index: indexPath })
    }
  },
  startPath: indexPath
};