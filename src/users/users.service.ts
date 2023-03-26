import { Injectable } from "@nestjs/common";
import { UsersModel } from "./users.model";

@Injectable()
export class UsersService {
    usersList: UsersModel[] = [];

    insertUser(name: string) {
        const user = new UsersModel(Math.random(), name);
        this.usersList.push(user)
    }
}