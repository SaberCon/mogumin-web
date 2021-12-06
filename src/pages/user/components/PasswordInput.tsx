import { LockTwoTone } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import type { FieldProps, ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import type { PasswordProps } from 'antd/lib/input'
import React from 'react'

const PasswordInput: React.FC<ProFormFieldItemProps<PasswordProps>> = (props) => {
  const rules = [
    {
      required: true,
      message: '请输入密码',
    },
  ]
  const fieldProps: FieldProps & PasswordProps = {
    size: 'large',
    prefix: <LockTwoTone/>,
    ...props.fieldProps,
  }
  return (
    <ProFormText.Password
      name="password"
      placeholder="密码"
      rules={rules}
      {...props}
      fieldProps={fieldProps}
    />
  )
}

export default PasswordInput
