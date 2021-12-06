import type { SmsType } from '@/services/user'
import { sendCode } from '@/services/user'
import { MailTwoTone } from '@ant-design/icons'
import type { ProFormCaptchaProps } from '@ant-design/pro-form'
import { ProFormCaptcha } from '@ant-design/pro-form'
import type { FieldProps } from '@ant-design/pro-form/lib/interface'
import type { InputProps } from 'antd'
import React from 'react'

const Captcha: React.FC<Partial<ProFormCaptchaProps> & { smsType: SmsType }> = ({ smsType, ...restProps }) => {
  const rules = [
    {
      required: true,
      message: '请输入验证码',
    },
  ]
  const fieldProps: FieldProps & InputProps = {
    size: 'large',
    prefix: <MailTwoTone/>,
    ...restProps.fieldProps,
  }
  return (
    <ProFormCaptcha
      name="code"
      placeholder="验证码"
      rules={rules}
      phoneName="phone"
      captchaProps={{ size: 'large' }}
      captchaTextRender={(timing, count) => (timing ? `${count} 秒后重新获取` : '获取验证码')}
      onGetCaptcha={async (mobile) => sendCode(smsType, mobile)}
      {...restProps}
      fieldProps={fieldProps}
    />
  )
}

export default Captcha
