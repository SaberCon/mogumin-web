import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'
import { Alert, message, Tabs } from 'antd'
import React, { useState } from 'react'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { history } from 'umi'
import Footer from '@/components/Footer'

import styles from './index.less'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { login, sendCode, SmsType } from '@/services/user'
import { setInLocal, setInSession } from '@/utils/storage'

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
)

const Login: React.FC = () => {
  const [type, setType] = useState<'PWD' | 'SMS'>('PWD')
  const [loginStatus, setLoginStatus] = useState<{ ok: boolean, loginType?: 'PWD' | 'SMS' }>({ ok: true })
  const { refreshCurrentUser } = useCurrentUser()

  const handleSubmit = async (values: any) => {
    const { phone, password, captcha, autoLogin } = values
    try {
      const token = await login(type, phone, type == 'PWD' ? password : captcha)
      if (autoLogin) {
        setInLocal(TOKEN_KEY, token)
      } else {
        setInSession(TOKEN_KEY, token)
      }
      message.success('登录成功！')
      await refreshCurrentUser()
      history.push(history.location.query?.redirect as string || '/')
    } catch (error) {
      setLoginStatus({ ok: false, loginType: type })
    }
  }
  const { ok, loginType } = loginStatus

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="http://oss.sabercon.cn/base/logo.svg"/>}
          title="Megumin"
          subTitle="Megumin 是一个用 Ant Design 构建的个人网站"
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式 :',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon}/>,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon}/>,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon}/>,
          ]}
          onFinish={handleSubmit}
        >
          <Tabs activeKey={type} onChange={setType as (s: string) => void}>
            <Tabs.TabPane key="PWD" tab="密码登录"/>
            <Tabs.TabPane key="SMS" tab="验证码登录"/>
          </Tabs>

          {type === 'PWD' && !ok && type === loginType && <LoginMessage content="密码错误"/>}
          {type === 'SMS' && !ok && type === loginType && <LoginMessage content="验证码错误"/>}

          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className={styles.prefixIcon}/>,
            }}
            name="phone"
            placeholder="手机号"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误',
              },
            ]}
          />

          {type === 'PWD' && (
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                },
              ]}
            />
          )}

          {type === 'SMS' && (
            <ProFormCaptcha
              phoneName="phone"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder="验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} 秒后重新获取`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                },
              ]}
              onGetCaptcha={async (phone) => {
                await sendCode(SmsType.LOGIN, phone)
                message.success('获取验证码成功！')
              }}
            />
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
