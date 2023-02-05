import request from "@/api/request";

export function postForm(data: any) {
  return request({
    url: "/user/post-form",
    method: "post",
    data,
  });
}
