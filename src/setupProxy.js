const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:8080/",
            // target: "http://52.79.175.221:8080/",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};
