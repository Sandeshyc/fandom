import React, { createContext, useContext, useState, useEffect } from 'react';


export const getTheUserId = () => {
  return localStorage.getItem('userId');
}


type UserDataProps = {
    userId: string;
    providerId: string;
    email?: string;
    accessToken?: string;
    emailVerified?: boolean;
};
export const storeUserData = ({
    userId,
    providerId,
    email,
    accessToken,
    emailVerified,
    }:UserDataProps) => {
    
}