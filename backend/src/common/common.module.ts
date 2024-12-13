import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.Service";
import { UserService } from "./user.Service";

@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService, UserService],
    exports: [UserService, PrismaService]
})
export class CommonModule{}