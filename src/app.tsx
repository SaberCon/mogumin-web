import type {Settings as LayoutSettings} from '@ant-design/pro-layout'
import {PageLoading} from '@ant-design/pro-layout'
import {message, notification} from 'antd'
import type {RequestConfig, RunTimeLayoutConfig} from 'umi'
import {history, Link} from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import {BookOutlined, LinkOutlined} from '@ant-design/icons'
import {getCurrentUser} from '@/services/user'
import * as storage from '@/utils/storage'
import type {RequestInterceptor, ResponseError} from 'umi-request'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 */
export async function getInitialState(): Promise<{
  settings: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
}> {
  const fetchUserInfo = async () => {
    if (storage.has(TOKEN_HEADER)) {
      try {
        return await getCurrentUser()
      } catch (error) {
        storage.remove(TOKEN_HEADER)
      }
    }
    history.push(loginPath)
    return undefined
  }

  return {
    settings: {},
    currentUser: history.location.pathname !== loginPath ? await fetchUserInfo() : undefined,
  }
}

/** ProLayout 支持的api https://procomponents.ant.design/components/layout */
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  }
}

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'New or modified data is successful. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Data deleted successfully. ',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (token, username, password error). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request sent was for a record that did not exist. ',
  405: 'The request method is not allowed. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource is permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred on the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable. ',
  504: 'The gateway timed out. ',
}

const errorHandler = (error: ResponseError) => {
  const {response} = error
  if (response && response.status) {
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: response.statusText || codeMessage[response.status],
    })
  } else if (error.name === 'BizError') {
    message.error(error.data.msg)
  } else {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    })
  }
  throw error
}

const authHeaderInterceptor: RequestInterceptor = (url, options) => {
  const token = storage.get(TOKEN_HEADER)
  return {
    options: {...options, interceptors: true, headers: token ? {[TOKEN_HEADER]: token} : {}},
  }
}

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
}
