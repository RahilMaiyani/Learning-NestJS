import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.ts';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.ts';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ConflictException("A user with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        });

        const token = await this.generateToken(user.id, user.email);

        const { password: _, ...userWithoutPassword } = user;

        return {
            message: "User registered successfully",
            user: userWithoutPassword,
            accessToken: token,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const token = await this.generateToken(user.id, email);

        const { password: _, ...userWithoutPassword } = user;

        return {
            message: "Login successfull",
            user: userWithoutPassword,
            accessToken: token,
        };
    }

    private async generateToken(id: string, email: string): Promise<string> {
        const payload = { sub: id, email };
        return this.jwtService.signAsync(payload);
    }
}
