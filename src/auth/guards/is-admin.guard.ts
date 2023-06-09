import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isAdmin = this.reflector.get<boolean>(
    //   'isAdmin',
    //   context.getHandler(),
    // );

    // if (!isAdmin) {
    //   return true; // Skip the guard if the route is not marked as 'isAdmin'
    // }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming the JWT strategy sets the authenticated user on the request object

    // Implement your logic to check if the user is an admin
    // For example, you can check if the user has an 'admin' role or any other criteria
    const isAdminUser = user.isAdmin;

    return isAdminUser; // Return true if the user is an admin, otherwise false
  }
}
