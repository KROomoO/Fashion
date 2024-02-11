const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api", {
            // ## local
            // target: "http://localhost:4000",
            // ## Backend
            target: "ec2-13-125-64-198.ap-northeast-2.compute.amazonaws.com",
            changeOrigin: true,
        })
    );
};
