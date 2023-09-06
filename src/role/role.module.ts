import { Module, Global } from '@nestjs/common'
import { RolesGuard } from './role.guard';

@Global()
@Module({
    providers: [RolesGuard],
})
export class RoleModule { }