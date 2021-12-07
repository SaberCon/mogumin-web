---
title: 业务组件
sidemenu: false
---

> 此功能由[dumi](https://d.umijs.org/zh-CN/guide/advanced#umi-%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%A8%A1%E5%BC%8F)提供，dumi 是一个 📖 为组件开发场景而生的文档工具，用过的都说好。

# 业务组件

这里列举了 Pro 中所有用到的组件，这些组件不适合作为组件库，但是在业务中却真实需要。所以我们准备了这个文档，来指导大家是否需要使用这个组件。

## Footer 页脚组件

这个组件自带了一些 Pro 的配置，你一般都需要改掉它的信息。

```tsx
/**
 * background: '#f0f2f5'
 */
import React from 'react';
import Footer from '@/components/Footer';

export default () => <Footer />;
```

## HeaderDropdown 头部下拉列表

HeaderDropdown 是 antd Dropdown 的封装，但是增加了移动端的特殊处理，用法也是相同的。

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderDropdown from '@/components/HeaderDropdown';

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">个人中心</Menu.Item>
      <Menu.Item key="settings">个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover 展示菜单</Button>
    </HeaderDropdown>
  );
};
```

## HeaderSearch 头部搜索框

一个带补全数据的输入框，支持收起和展开 Input

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderSearch from '@/components/HeaderSearch';

export default () => {
  return (
    <HeaderSearch
      placeholder="站内搜索"
      defaultValue="umi ui"
      options={[
        { label: 'Ant Design Pro', value: 'Ant Design Pro' },
        {
          label: 'Ant Design',
          value: 'Ant Design',
        },
        {
          label: 'Pro Table',
          value: 'Pro Table',
        },
        {
          label: 'Pro Layout',
          value: 'Pro Layout',
        },
      ]}
      onSearch={(value) => {
        console.log('input', value);
      }}
    />
  );
};
```

### API

| 参数            | 说明                               | 类型                         | 默认值 |
| --------------- | ---------------------------------- | ---------------------------- | ------ |
| value           | 输入框的值                         | `string`                     | -      |
| onChange        | 值修改后触发                       | `(value?: string) => void`   | -      |
| onSearch        | 查询后触发                         | `(value?: string) => void`   | -      |
| options         | 选项菜单的的列表                   | `{label,value}[]`            | -      |
| defaultVisible  | 输入框默认是否显示，只有第一次生效 | `boolean`                    | -      |
| visible         | 输入框是否显示                     | `boolean`                    | -      |
| onVisibleChange | 输入框显示隐藏的回调函数           | `(visible: boolean) => void` | -      |

[comment]: <> (## NoticeIcon 通知工具)

[comment]: <> (通知工具提供一个展示多种通知信息的界面。)

[comment]: <> (```tsx)

[comment]: <> (/**)

[comment]: <> ( * background: '#f0f2f5')

[comment]: <> ( */)

[comment]: <> (import { message } from 'antd';)

[comment]: <> (import React from 'react';)

[comment]: <> (import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';)

[comment]: <> (export default &#40;&#41; => {)

[comment]: <> (  const list = [)

[comment]: <> (    {)

[comment]: <> (      id: '000000001',)

[comment]: <> (      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',)

[comment]: <> (      title: '你收到了 14 份新周报',)

[comment]: <> (      datetime: '2017-08-09',)

[comment]: <> (      type: 'notification',)

[comment]: <> (    },)

[comment]: <> (    {)

[comment]: <> (      id: '000000002',)

[comment]: <> (      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',)

[comment]: <> (      title: '你推荐的 曲妮妮 已通过第三轮面试',)

[comment]: <> (      datetime: '2017-08-08',)

[comment]: <> (      type: 'notification',)

[comment]: <> (    },)

[comment]: <> (  ];)

[comment]: <> (  return &#40;)

[comment]: <> (    <NoticeIcon)

[comment]: <> (      count={10})

[comment]: <> (      onItemClick={&#40;item&#41; => {)

[comment]: <> (        message.info&#40;`${item.title} 被点击了`&#41;;)

[comment]: <> (      }})

[comment]: <> (      onClear={&#40;title: string, key: string&#41; => message.info&#40;'点击了清空更多'&#41;})

[comment]: <> (      loading={false})

[comment]: <> (      clearText="清空")

[comment]: <> (      viewMoreText="查看更多")

[comment]: <> (      onViewMore={&#40;&#41; => message.info&#40;'点击了查看更多'&#41;})

[comment]: <> (      clearClose)

[comment]: <> (    >)

[comment]: <> (      <NoticeIcon.Tab)

[comment]: <> (        tabKey="notification")

[comment]: <> (        count={2})

[comment]: <> (        list={list})

[comment]: <> (        title="通知")

[comment]: <> (        emptyText="你已查看所有通知")

[comment]: <> (        showViewMore)

[comment]: <> (      />)

[comment]: <> (      <NoticeIcon.Tab)

[comment]: <> (        tabKey="message")

[comment]: <> (        count={2})

[comment]: <> (        list={list})

[comment]: <> (        title="消息")

[comment]: <> (        emptyText="您已读完所有消息")

[comment]: <> (        showViewMore)

[comment]: <> (      />)

[comment]: <> (      <NoticeIcon.Tab)

[comment]: <> (        tabKey="event")

[comment]: <> (        title="待办")

[comment]: <> (        emptyText="你已完成所有待办")

[comment]: <> (        count={2})

[comment]: <> (        list={list})

[comment]: <> (        showViewMore)

[comment]: <> (      />)

[comment]: <> (    </NoticeIcon>)

[comment]: <> (  &#41;;)

[comment]: <> (};)

[comment]: <> (```)

[comment]: <> (### NoticeIcon API)

[comment]: <> (| 参数 | 说明 | 类型 | 默认值 |)

[comment]: <> (| --- | --- | --- | --- |)

[comment]: <> (| count | 有多少未读通知 | `number` | - |)

[comment]: <> (| bell | 铃铛的图表 | `ReactNode` | - |)

[comment]: <> (| onClear | 点击清空数据按钮 | `&#40;tabName: string, tabKey: string&#41; => void` | - |)

[comment]: <> (| onItemClick | 未读消息列被点击 | `&#40;item: API.NoticeIconData, tabProps: NoticeIconTabProps&#41; => void` | - |)

[comment]: <> (| onViewMore | 查看更多的按钮点击 | `&#40;tabProps: NoticeIconTabProps, e: MouseEvent&#41; => void` | - |)

[comment]: <> (| onTabChange | 通知 Tab 的切换 | `&#40;tabTile: string&#41; => void;` | - |)

[comment]: <> (| popupVisible | 通知显示是否展示 | `boolean` | - |)

[comment]: <> (| onPopupVisibleChange | 通知信息显示隐藏的回调函数 | `&#40;visible: boolean&#41; => void` | - |)

[comment]: <> (| clearText | 清空按钮的文字 | `string` | - |)

[comment]: <> (| viewMoreText | 查看更多的按钮文字 | `string` | - |)

[comment]: <> (| clearClose | 展示清空按钮 | `boolean` | - |)

[comment]: <> (| emptyImage | 列表为空时的兜底展示 | `ReactNode` | - |)

[comment]: <> (### NoticeIcon.Tab API)

[comment]: <> (| 参数         | 说明               | 类型                                 | 默认值 |)

[comment]: <> (| ------------ | ------------------ | ------------------------------------ | ------ |)

[comment]: <> (| count        | 有多少未读通知     | `number`                             | -      |)

[comment]: <> (| title        | 通知 Tab 的标题    | `ReactNode`                          | -      |)

[comment]: <> (| showClear    | 展示清除按钮       | `boolean`                            | `true` |)

[comment]: <> (| showViewMore | 展示加载更         | `boolean`                            | `true` |)

[comment]: <> (| tabKey       | Tab 的唯一 key     | `string`                             | -      |)

[comment]: <> (| onClick      | 子项的单击事件     | `&#40;item: API.NoticeIconData&#41; => void` | -      |)

[comment]: <> (| onClear      | 清楚按钮的点击     | `&#40;&#41;=>void`                           | -      |)

[comment]: <> (| emptyText    | 为空的时候测试     | `&#40;&#41;=>void`                           | -      |)

[comment]: <> (| viewMoreText | 查看更多的按钮文字 | `string`                             | -      |)

[comment]: <> (| onViewMore   | 查看更多的按钮点击 | `&#40; e: MouseEvent&#41; => void`           | -      |)

[comment]: <> (| list         | 通知信息的列表     | `API.NoticeIconData`                 | -      |)

[comment]: <> (### NoticeIconData)

[comment]: <> (```tsx | pure)

[comment]: <> (export interface NoticeIconData {)

[comment]: <> (  id: string;)

[comment]: <> (  key: string;)

[comment]: <> (  avatar: string;)

[comment]: <> (  title: string;)

[comment]: <> (  datetime: string;)

[comment]: <> (  type: string;)

[comment]: <> (  read?: boolean;)

[comment]: <> (  description: string;)

[comment]: <> (  clickClose?: boolean;)

[comment]: <> (  extra: any;)

[comment]: <> (  status: string;)

[comment]: <> (})

[comment]: <> (```)

## RightContent

RightContent 是以上几个组件的组合，同时新增了 plugins 的 `SelectLang` 插件。

```tsx | pure
<Space>
  <HeaderSearch
    placeholder="站内搜索"
    defaultValue="umi ui"
    options={[
      { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
      {
        label: <a href="next.ant.design">Ant Design</a>,
        value: 'Ant Design',
      },
      {
        label: <a href="https://protable.ant.design/">Pro Table</a>,
        value: 'Pro Table',
      },
      {
        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        value: 'Pro Layout',
      },
    ]}
  />
  <Tooltip title="使用文档">
    <span
      className={styles.action}
      onClick={() => {
        window.location.href = 'https://pro.ant.design/docs/getting-started';
      }}
    >
      <QuestionCircleOutlined />
    </span>
  </Tooltip>
  <Avatar />
  {REACT_APP_ENV && (
    <span>
      <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    </span>
  )}
  <SelectLang className={styles.action} />
</Space>
```
