import { Injectable, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"

Injectable({})
export class AuthService{
    constructor(private jwtService: JwtService){}
}
