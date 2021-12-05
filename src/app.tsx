import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import { message, notification } from 'antd'
import type { RequestConfig, RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import { getCurrentUser } from '@/services/user'
import * as storage from '@/utils/storage'
import type { RequestInterceptor, ResponseError } from 'umi-request'

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
    if (storage.has(TOKEN_KEY)) {
      try {
        return await getCurrentUser()
      } catch (error) {
        storage.remove(TOKEN_KEY)
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
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      // We don't apply watermark now.
      // content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const { location } = history
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

const errorHandler = (error: ResponseError) => {
  const { response } = error
  if (response.status === 400) {
    message.warning(error.data.msg)
  } else if (response.status !== 401) {
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: response.statusText,
    })
  }
  throw error
}

const authHeaderInterceptor: RequestInterceptor = (url, options) => {
  const token = storage.get(TOKEN_KEY)
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
  return {
    options: { ...options, interceptors: true, headers },
  }
}

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  errorConfig: { adaptor: (resData) => ({ success: true, data: resData }) },
}
