import React from 'react'
import { StepsForm } from '@ant-design/pro-form'
import { Result } from 'antd'
import { useCurrentUserOrGoToLogin } from '@/hooks/useCurrentUser'
import { checkCode, SmsType, updatePhone } from '@/services/user'
import Captcha from '@/pages/user/components/Captcha'
import PhoneInput from '@/pages/user/components/PhoneInput'

const PhoneUpdate: React.FC = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUserOrGoToLogin()
  return (
    <div style={{ paddingTop: '16px' }}>
      <StepsForm submitter={{ render: (props, dom) => (props.step !== 2 ? dom : false) }}>
        <StepsForm.StepForm
          title="验证身份"
          onFinish={async (values) => {
            try {
              await checkCode(SmsType.UNBIND_PHONE, values.unbindCode)
              return true
            } catch (error) {
              return false
            }
          }}
        >
          <PhoneInput disabled initialValue={currentUser.phone} name="currentPhone"/>
          <Captcha smsType={SmsType.UNBIND_PHONE} phoneName="currentPhone" name="unbindCode"/>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="绑定手机"
          onFinish={async (values) => {
            try {
              await updatePhone(values.phone, values.unbindCode, values.code)
              refreshCurrentUser()
              return true
            } catch (error) {
              return false
            }
          }}
        >
          <PhoneInput/>
          <Captcha smsType={SmsType.BIND_PHONE}/>
        </StepsForm.StepForm>
        <StepsForm.StepForm title="操作成功">
          <Result status="success" title="您的手机号已修改成功"/>
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  )
}

export default PhoneUpdate
