import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { ResultData } from "src/common/utils/result";
import { ExportTable } from "src/common/utils/export";
import { CreateConfigDto, UpdateConfigDto, ListConfigDto } from "./dto/index";
import { SysConfigEntity } from "./entities/config.entity";
// import { RedisService } from "src/module/redis/redis.service";
import { CacheEnum } from "src/common/enum/index";

import { DelFlagEnum } from "src/common/enum/index";

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(SysConfigEntity)
        private readonly sysConfigEntityRep: Repository<SysConfigEntity> // private readonly redisService: RedisService
    ) {}

    async create(createConfigDto: CreateConfigDto) {
        await this.sysConfigEntityRep.save(createConfigDto);
        return ResultData.ok();
    }

    async findAll(query: ListConfigDto) {
        const entity = this.sysConfigEntityRep.createQueryBuilder("entity");
        entity.where("entity.delFlag = :delFlag", { delFlag: DelFlagEnum.NORMAL });

        if (query.configName) {
            entity.andWhere(`entity.configName LIKE "%${query.configName}%"`);
        }

        if (query.configKey) {
            entity.andWhere(`entity.configKey LIKE "%${query.configKey}%"`);
        }

        if (query.configType) {
            entity.andWhere("entity.configType = :configType", { configType: query.configType });
        }

        if (query.params?.beginTime && query.params?.endTime) {
            entity.andWhere("entity.createTime BETWEEN :start AND :end", {
                start: query.params.beginTime,
                end: query.params.endTime
            });
        }

        if (query.pageSize && query.pageNum) {
            entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
        }

        const [list, total] = await entity.getManyAndCount();

        return ResultData.ok({
            list,
            total
        });
    }

    async findOne(configId: number) {
        const data = await this.sysConfigEntityRep.findOne({
            where: { configId: configId }
        });
        return ResultData.ok(data);
    }

    async findOneByConfigKey(configKey: string) {
        const data = await this.sysConfigEntityRep.findOne({
            where: { configKey: configKey }
        });
        return ResultData.ok(data);
    }

    async update(updateConfigDto: UpdateConfigDto) {
        // todo 数据用户权限
        await this.sysConfigEntityRep.update({ configId: updateConfigDto.configId }, updateConfigDto);
        return ResultData.ok();
    }

    async remove(configIds: number[]) {
        const list = await this.sysConfigEntityRep.find({
            where: { configId: In(configIds), delFlag: DelFlagEnum.DELETE },
            select: ["configType", "configKey"]
        });
        const item = list.find(item => item.configType === "Y");
        if (item) {
            return ResultData.fail(500, `内置参数【${item.configKey}】不能删除`);
        }
        // todo 用户数据权限
        const data = await this.sysConfigEntityRep.update({ configId: In(configIds) }, { delFlag: DelFlagEnum.DELETE });
        return ResultData.ok(data);
    }

    async export(res: Response, body: ListConfigDto) {
        delete body.pageNum;
        delete body.pageSize;
        const list = await this.findAll(body);
        const options = {
            sheetName: "参数管理",
            data: list.data.list,
            header: [
                { title: "参数主键", dataIndex: "configId" },
                { title: "参数名称", dataIndex: "configName" },
                { title: "参数键名", dataIndex: "configKey" },
                { title: "参数键值", dataIndex: "configValue" },
                { title: "系统内置", dataIndex: "configType" }
            ],
            dictMap: { configType: { Y: "是", N: "否" } }
        };
        ExportTable(options, res);
    }
}
