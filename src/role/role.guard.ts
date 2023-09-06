import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRole)
            return true;

        const { user } = context.switchToHttp().getRequest()

        if (requiredRole == user.role)
            return true

        throw new UnauthorizedException("Você não é um Admin!");

    }
}