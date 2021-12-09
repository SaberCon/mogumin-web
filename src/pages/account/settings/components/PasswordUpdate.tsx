import React, { useState } from 'react'
import { message, Popover, Progress } from 'antd'
import { useCurrentUserOrGoToLogin } from '@/hooks/useCurrentUser'
import ProForm from '@ant-design/pro-form'
import { SmsType, updatePwd } from '@/services/user'
import Captcha from '@/pages/user/components/Captcha'
import PhoneInput from '@/pages/user/components/PhoneInput'
import PasswordInput from '@/pages/user/components/PasswordInput'

const passwordProgressMap: Record<string, 'normal' | 'exception' | 'active' | 'success'> = {
  strong: 'success',
  medium: 'normal',
  weak: 'exception',
}

const PasswordUpdate: React.FC = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUserOrGoToLogin()
  const [passwordLength, setPasswordLength] = useState(0)
  const passwordStatus = passwordLength > 12 ? 'strong' : passwordLength > 6 ? 'medium' : 'weak'

  return (
    <ProForm
      submitter={{ searchConfig: { submitText: '修改密码' } }}
      onFinish={async (values) => {
        await updatePwd(values.password, values.code)
        message.success('修改密码成功')
        refreshCurrentUser()
      }}
      onReset={() => setPasswordLength(0)}
      style={{ maxWidth: '360px', paddingTop: '16px' }}
    >
      <PhoneInput disabled initialValue={currentUser.phone}/>
      <Captcha smsType={SmsType.UPDATE_PWD}/>
      <Popover
        content={
          <>
            <div>强度: {passwordStatus}</div>
            <Progress
              status={passwordProgressMap[passwordStatus]}
              percent={passwordLength * 5}
              showInfo={false}
            />
            <div>请至少输入 6 个字符, 不要使用容易被猜到的密码</div>
          </>
        }
        placement="right"
        visible={passwordLength > 0}
      >
        <PasswordInput fieldProps={{ onChange: e => setPasswordLength(e.target.value.length) }}/>
      </Popover>
    </ProForm>
  )
}

export default PasswordUpdate
