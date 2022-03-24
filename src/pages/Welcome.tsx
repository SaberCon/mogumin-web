import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Alert, Card, Typography } from 'antd'
import styles from './Welcome.less'

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Alert
        message={'Megumin 个人网站，已经发布。'}
        type="success"
        showIcon
        banner
        style={{ margin: -12, marginBottom: 24 }}
      />
      <Typography.Text strong>
        后端仓库{' '}
        <a href="https://github.com/SaberCon/megumin" rel="noopener noreferrer" target="__blank">
          欢迎使用
        </a>
      </Typography.Text>
      <CodePreview>git clone git@github.com:SaberCon/megumin.git</CodePreview>
      <Typography.Text
        strong
        style={{ marginBottom: 12 }}
      >
        前端仓库{' '}
        <a href="https://github.com/SaberCon/megumin-web" rel="noopener noreferrer" target="__blank">
          欢迎使用
        </a>
      </Typography.Text>
      <CodePreview>git clone git@github.com:SaberCon/megumin-web.git</CodePreview>
    </Card>
  </PageContainer>
)
