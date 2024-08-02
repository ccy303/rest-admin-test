import { Module, Global } from "@nestjs/common";
import { CacheServiceRep } from "./cache.service";
import { CacheControllerRep } from "./cache.controller";

@Global()
@Module({
    controllers: [CacheControllerRep],
    providers: [CacheServiceRep],
    exports: [CacheServiceRep]
})
export class CacheModuleRep {}
