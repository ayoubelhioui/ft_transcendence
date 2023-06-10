"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const add_default_user_interceptor_1 = require("./global/interceptors/add-default-user.interceptor");
const user_service_1 = require("./components/user/user.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.useGlobalInterceptors(new add_default_user_interceptor_1.AddDefaultUserInterceptor(app.get(user_service_1.UserService)));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map