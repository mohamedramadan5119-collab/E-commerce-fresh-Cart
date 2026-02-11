import NextAuth, { DefaultSession, User } from "next-auth"
import { UserResponse } from "./authinterface"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  interface User{
    user:UserResponse , 
    token:string,

  }
  interface Session {
    user:UserResponse
  }
}



declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string
  }
}