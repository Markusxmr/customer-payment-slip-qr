"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const PORT = process.env.PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: true });
    app.enableCors({
        credentials: true,
        allowedHeaders: ['authorization', 'content-type'],
        origin: ['http://localhost:10001'],
    });
    app.useStaticAssets(path_1.join(__dirname, '../..', 'public'));
    await app.listen(PORT);
    console.log(`Server is running on port: ${PORT || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map