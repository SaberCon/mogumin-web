import React from 'react';
import { List } from 'antd';
import PhoneUpdateView from '@/pages/account/settings/components/PhoneUpdate';
import PasswordUpdateView from '@/pages/account/settings/components/PasswordUpdate';
import { useCurrentUserOrGoToLogin } from '@/hooks/useCurrentUser';
import { history, useParams } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const viewMap = {
  phone: <PhoneUpdateView />,
  password: <PasswordUpdateView />,
};

const SecurityView: React.FC = () => {
  const { subtype } = useParams<{ subtype?: string }>();
  const { currentUser } = useCurrentUserOrGoToLogin();
  if (subtype && viewMap[subtype]) {
    return viewMap[subtype];
  }

  const getModifyAction = (type: string) => (
    <a onClick={() => history.push(`/account/settings/security/${type}`)}>修改</a>
  );

  const data = [
    {
      title: '账户密码',
      description: '需要手机号验证',
      actions: [getModifyAction('password')],
    },
    {
      title: '密保手机',
      description: `已绑定手机：${currentUser.phone}`,
      actions: [getModifyAction('phone')],
    },
  ];

  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
