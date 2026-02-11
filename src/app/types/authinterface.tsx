export interface successLogin {
  message: string
  user: UserResponse
  token: string
}

export interface failedLogin {
  statusMsg: string
  message: string
}



export interface UserResponse {
  _id: string;   
  name: string;
  email: string;
  role: string;
}