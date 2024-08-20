import React from "react"

export interface Events {
    EventId: string
    EventType: string
    updatedAt: string
    date: string
    description: string
    Location: string
    Title: string
}
export interface ProviderType{
    children: React.ReactNode
}
export interface LoginInfo{
    email:string
    password:string
}
export interface User{
    MemberId: string
    Email: string
    FirstName:string
    LastName:string
    Password?: string
    Position: string
}

export interface NewMember{
    FirstName: string,
    LastName:string,
    Email:string,
    MemberId:string
 }

 export interface Credentials{
    Email:string
    MemberId:string
 }

 export interface EditUser{
    MemberId: string
    Email: string
    FirstName:string
    LastName:string
    Password?: string
    ConfirmPassword?: string
    Position: string
 }

 export interface EditEvent{
    Title: string
    description:string
    EventId:string
    Type?: string
    date?:string
 }