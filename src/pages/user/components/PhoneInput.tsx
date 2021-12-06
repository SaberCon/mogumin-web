import { MobileTwoTone } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-form'
import type { FieldProps, ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import type { InputProps } from 'antd'
import React from 'react'

const PhoneInput: React.FC<ProFormFieldItemProps<InputProps>> = (props) => {
  // 手机号为禁用状态时一般只是作展示用, 无需校验
  const rules = props.disabled
    ? []
    : [
      {
        required: true,
        message: '请输入手机号',
      },
      {
        pattern: /^1\d{10}$/,
        message: '手机号不合法',
      },
    ]
  const fieldProps: FieldProps & InputProps = {
    size: 'large',
    prefix: <MobileTwoTone/>,
    ...props.fieldProps,
  }
  return (
    <ProFormText
      name="phone"
      placeholder="手机号"
      rules={rules}
      {...props}
      fieldProps={fieldProps}
    />
  )
}

export default PhoneInput
