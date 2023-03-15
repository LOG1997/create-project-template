export interface IUserInfo {
  user_avatar: string;
  user_email: string;
  user_id: string;
  user_name: string;
  user_nickname: string;
  user_phone: string;
  user_role: string;
  user_status: boolean;
}
export interface IUserState {
  userInfo: IUserInfo;
}
