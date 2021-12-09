import React, { useLayoutEffect, useRef, useState } from 'react'
import { GridContent } from '@ant-design/pro-layout'
import { Menu } from 'antd'
import BaseView from './components/BaseView'
import BindingView from './components/BindingView'
import NotificationView from './components/NotificationView'
import SecurityView from './components/SecurityView'
import { history, useParams } from 'umi'
import styles from './index.less'

const menuMap = {
  base: '基本设置',
  security: '安全设置',
  binding: '账号绑定',
  notification: '消息通知',
}

const viewMap = {
  base: <BaseView/>,
  security: <SecurityView/>,
  binding: <BindingView/>,
  notification: <NotificationView/>,
}

const Settings: React.FC = () => {
  const [mode, setMode] = useState<'inline' | 'horizontal'>('inline')
  const dom = useRef<HTMLDivElement>()
  let { type } = useParams<{ type: string }>()
  if (!menuMap[type]) {
    type = 'base'
  }

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return
      }
      const { offsetWidth } = dom.current
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        setMode('horizontal')
        return
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        setMode('horizontal')
        return
      }
      setMode('inline')
    })
  }

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize)
      resize()
    }
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [dom.current])

  const getMenu = () => Object.keys(menuMap).map((item) => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>)

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={ref => {
          if (ref) {
            dom.current = ref
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={mode}
            selectedKeys={[type]}
            onClick={({ key }) => history.push(`/account/settings/${key}`)}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[type]}</div>
          {viewMap[type]}
        </div>
      </div>
    </GridContent>
  )
}

export default Settings
