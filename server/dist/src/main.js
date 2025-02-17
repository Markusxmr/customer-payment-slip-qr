"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const frontend_module_1 = require("./modules/frontend/frontend.module");
const env_1 = require("./common/env");
const kill_process_on_port_util_1 = require("./common/utils/kill-process-on-port.util");
async function bootstrap() {
    await (0, kill_process_on_port_util_1.killProcessOnPort)(env_1.env.PORT);
    const apiApp = await core_1.NestFactory.create(app_module_1.AppModule);
    apiApp.setGlobalPrefix('api');
    apiApp.enableCors({
        credentials: true,
        allowedHeaders: ['authorization', 'content-type'],
        origin: '*',
    });
    await apiApp.listen(env_1.env.PORT);
    console.log(`Server is running on port: ${env_1.env.PORT}`);
    await (0, kill_process_on_port_util_1.killProcessOnPort)(env_1.env.FRONTEND_PORT);
    const frontendApp = await core_1.NestFactory.create(frontend_module_1.FrontendModule);
    await frontendApp.listen(env_1.env.FRONTEND_PORT);
    console.log(`Frontend is running on port: ${env_1.env.FRONTEND_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map