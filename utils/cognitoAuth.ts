import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";
const cognitoConfig = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
};
  
const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId || "",
    ClientId: cognitoConfig.ClientId || "",
});
  
  export function signUp(email:string, password:string, attributeList:any = []) {
    return new Promise((resolve, reject) => {
      userPool.signUp(
        email,
        password,
        attributeList,
        [],
        (err:any, result:any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result?.user);
        }
      );
    });
  }
  
  export function resendSignUp(email:string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
  
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  export function confirmSignUp(email:string, code:string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
  
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
  
  export function signIn(email:string, password:string) {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
  
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
  
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  export function forgotPassword(email:string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
            resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  export function confirmPassword(email:string, confirmationCode:string, newPassword:string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
  
      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }
  
  export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
  
      if (!cognitoUser) {
        reject(new Error("No user found"));
        return;
      }
  
      cognitoUser.getSession((err:any, session:any) => {
        if (err) {
          reject(err);
          return;
        }
        cognitoUser.getUserAttributes((err:any, attributes:any) => {
          if (err) {
            reject(err);
            return;
          }
          const userData = attributes.reduce((acc:any, attribute:any) => {
            acc[attribute.Name] = attribute.Value;
            return acc;
          }, {});
  
          resolve({ ...userData, email: cognitoUser.getUsername() });
        });
      });
    });
  }
  
  export function getSession() {
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error("No user found"));
        return;
      }
      cognitoUser.getSession((err:any, session:any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session);
      });
    });
  }
  