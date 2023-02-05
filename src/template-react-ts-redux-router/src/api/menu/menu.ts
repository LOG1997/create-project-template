import request from "@/api/request";

export function getUserInfo(params: any) {
  return request({
    url: "/user/info",
    method: "get",
    params,
  });
}
