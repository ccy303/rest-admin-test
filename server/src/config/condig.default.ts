export default () => ({
    isLocal: process.env.NODE_ENV == "development",
    app: {
        port: parseInt(process.env.PORT, 10) || 3004,
        prefix: ""
    },
    jwt: {
        secret: process.env.JWT_SECRET || "3GWwbZtVLM8NRMY6HBD4kfnpBMT8yAkpqnRn8FJN6RHdCkLSWCaFgwQLTcAN8gEA",
        expire: process.env.JWT_EXPIRE || 8 * 60 * 60,
        refreshExpire: process.env.JWT_REFRESH_EXPIRE || 24 * 60 * 60
    },
    typeorm: {
        dataSource: {
            type: "mysql",
            host: process.env.MYSQL_HOST || "127.0.0.1",
            port: process.env.MYSQL_PORT || 3306,
            username: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "ccy.303",
            database: process.env.MYSQL_DATABASE || "nestjs_admin",
            // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
            synchronize: process.env.NODE_ENV == "development",
            // 打印日志
            logging: false,
            // 字符集
            charset: "utf8mb4",
            // 是否开启缓存
            cache: true,
            // 失败重连次数
            retryAttempts: 10,
            //  失败重连延迟
            retryDelay: 3000,
            // 自动加载实体
            autoLoadEntities: true,
            // 实体所在目录
            entities: [`${__dirname}/**/*.entity{.ts,.js}`]
        }
    },
    cos: {
        SecretId: process.env.COS_SECRET_ID || "AKID24ylQwIVaWREsNjyAEpkzJkFy8MpYCtZ",
        SecretKey: process.env.SECRET_KEY || "topu3OoUQYetKtYIwTWnInXPLPb8ufCk",
        Region: process.env.REGION || "ap-guangzhou",
        Bucket: process.env.BUCKET || "yuanjing-bi-test-1316790818",
        Domain: process.env.DOMAIN || "https://yuanjing-bi-test-1316790818.cos.ap-guangzhou.myqcloud.com"
    },
    perm: {
        router: {
            whitelist: [
                { path: "/captchaImage", method: "GET" },
                { path: "/register", method: "POST" },
                { path: "/login", method: "POST" },
                { path: "/logout", method: "POST" },
                { path: "/perm/{id}", method: "GET" },
                { path: "/upload", method: "POST" }
            ]
        }
    }
});

console.log(123)
