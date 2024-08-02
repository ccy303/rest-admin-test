import { Injectable, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { ResultData } from "src/common/utils/result";
import { CacheEnum } from "src/common/enum/index";

@Injectable()
export class CacheServiceRep {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    private readonly caches = [
        { cacheName: "login_tokens:", cacheKey: "", cacheValue: "", remark: "用户信息" },
        { cacheName: "sys_config:", cacheKey: "", cacheValue: "", remark: "配置信息" },
        { cacheName: "sys_dict:", cacheKey: "", cacheValue: "", remark: "数据字典" },
        { cacheName: "captcha_codes:", cacheKey: "", cacheValue: "", remark: "验证码" },
        { cacheName: "repeat_submit:", cacheKey: "", cacheValue: "", remark: "防重提交" },
        { cacheName: "rate_limit:", cacheKey: "", cacheValue: "", remark: "限流处理" },
        { cacheName: "pwd_err_cnt:", cacheKey: "", cacheValue: "", remark: "密码错误次数" }
    ];

    async set(key: string, val: any, ttl?: number): Promise<void> {
        const data = JSON.stringify(val);
        if (!ttl) return await this.cacheManager.set(key, data);
        return await this.cacheManager.set(key, data, ttl);
    }

    async get(key: string): Promise<string | undefined> {
        if (!key || key === "*") return null;
        const res: string | undefined = await this.cacheManager.get(key);
        return res ? JSON.parse(res) : res;
    }

    async getNames() {}

    async getKeys(id: string) {}

    async clearCacheKey(id: string) {}

    async clearCacheName(id: string) {}

    async clearCacheAll() {}

    async getValue(params) {}

    async getInfo() {}
}
