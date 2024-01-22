import { Document } from "mongoose";

export interface User extends Document{

    readonly fullName: string,
    readonly age: number,
    readonly email: string,
    readonly password: string,
    //readonly posts: ,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,

}