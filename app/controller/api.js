/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/api.js
 */
'use strict';

const Controller = require('egg').Controller;
class ApiController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.api.show({ id: params.id });
        helper.render(200, res);
    }
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.api.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.api.show({ name: body.name, menu_id: body.menu_id });
        if (showRes) {
            helper.render(401, {}, '接口名称已存在');
            return;
        }
        const res = await service.api.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const showRes = await service.api.show({ name: body.name, menu_id: body.menu_id });
        if (showRes && `${showRes.id}` !== `${params.id}`) {
            helper.render(401, {}, '接口名称已存在');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.api.update(body, options);
        helper.render(res ? 200 : 501, {});
    }
    async destroy() {
        const { ctx: { service, helper, params } } = this;
        const row = {
            is_delete: 1,
        };
        const options = {
            where: { id: params.id },
        };
        const res = await service.api.update(row, options);
        helper.render(res ? 200 : 501, {});
    }
}

module.exports = ApiController;
