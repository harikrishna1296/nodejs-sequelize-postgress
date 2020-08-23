(function (routeConfig) {

    routeConfig.init = function (app) {
        // *** routes *** //
        var indexRouter = require("./Routes/index");
        var passport = require('passport')
        var userRouter = require('./Routes/user')
        var productRouter = require('./Routes/product')
        var orderRouter = require('./Routes/order')
        app.use("/", indexRouter);
        app.use("/user", userRouter);
        app.use("/product", productRouter)
        app.use("/order", orderRouter)
    };
})(module.exports);
