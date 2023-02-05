import { IMenuItem } from "@/types/menu";

export const menuList: IMenuItem[] = [
  {
    key: "1",
    label: "首页",
    icon: "home",
    path: "/home",
  },
  {
    key: "2",
    label: "管理",
    icon: "admin",
    path: "/admin",
    auth: [1, 2],
    children: [
      {
        key: "2-1",
        label: "用户管理",
        path: "/admin/user",
        auth: [1, 2],
      },
      {
        key: "2-2",
        label: "角色管理",
        path: "/admin/role",
        auth: [1, 2],
      },
      {
        key: "2-3",
        label: "菜单管理",
        path: "/admin/menu",
      },
    ],
  },
  {
    key: "3",
    label: "信息填报",
    icon: "fillInfo",
    path: "/form",
    auth: [0],
  },
  {
    key: "4",
    label: "审批",
    icon: "manage",
    path: "/manage",
    auth: [1],
  },
  {
    key: "5",
    label: "统计",
    icon: "statistics",
    path: "/dashbord",
    auth: [1, 2],
  },
  {
    key: "6",
    label: "信息展示",
    icon: "dataShow",
    path: "/dataShow",
    auth: [1, 2],
  },
];
