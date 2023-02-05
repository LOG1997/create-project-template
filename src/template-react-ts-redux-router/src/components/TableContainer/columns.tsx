import React from "react";
import { Space, Tag } from "antd";
import { ITableConstant, ITableAction } from "@/types/table";

export const generateColumns = <T extends { id: string }>(constant: ITableConstant[]) => {
  return constant.map((item: ITableConstant) => {
    if (item.isLink) {
      return {
        title: item.title,
        dataIndex: item.dataIndex,
        key: item.key,
        // fixed: () => { return item.fixed || '' },
        width: item.width || 100,
        ellipsis: item.ellipsis || false,
        render: (text: string) => <a>{text}</a>,
      };
    }
    else if (item.isTag) {
      return {
        title: item.title,
        key: item.key,
        dataIndex: item.dataIndex,
        // fixed: () => { return item.fixed || '' },
        width: item.width || 100,
        ellipsis: item.ellipsis || false,
        render: (tags: []) => {
          if (!tags) return (<></>)
          const tagElement = tags.map((tag: string) => {
            // *配置标签显示颜色
            let color = tag.length > 4 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })
          return tagElement
        }
      };
    }
    else if (item.isAction) {
      return {
        title: item.title,
        key: item.key,
        dataIndex: item.dataIndex,
        width: item.width || 100,
        // * fixed属性与
        // fixed: item.fixed || '',
        ellipsis: item.ellipsis || false,
        render: (_: ITableConstant, record: T) => {
          const actionElement =
            <Space size="middle">
              {item.actions?.map((action: ITableAction) => {
                return (
                  <a key={action.title} onClick={() => action.func(record.id)}>{action.title}</a>
                )
              })}
            </Space>
          return actionElement

        }
      };
    }
    else {
      return {
        title: item.title,
        dataIndex: item.dataIndex,
        key: item.key,
        width: item.width || 100,
        // fixed: () => { return item.fixed || '' },
        ellipsis: item.ellipsis || false,
      };
    }
  });
};