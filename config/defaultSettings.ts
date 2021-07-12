import {Settings as LayoutSettings} from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Mogumin',
  pwa: false,
  logo: 'http://oss.sabercon.cn/base/logo.svg',
  iconfontUrl: '',
}

export default Settings
