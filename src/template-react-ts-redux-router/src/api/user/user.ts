import request from "@/api/request";

export function getUserInfo(params: any) {
  return request({
    url: "/user/userInfo",
    method: "get",
    params,
  });
}
export function getAdminUsers(params: any) {
  return request({
    url: "/admin/users",
    method: "get",
    params,
  });
}
