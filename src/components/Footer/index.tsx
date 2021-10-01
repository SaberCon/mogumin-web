import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

export default () => {
  const defaultMessage = 'SaberCon 个人出品'
  const currentYear = new Date().getFullYear()

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Backend',
          title: 'Backend',
          href: 'https://github.com/SaberCon/megumin',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/SaberCon',
          blankTarget: true,
        },
        {
          key: 'Frontend',
          title: 'Frontend',
          href: 'https://github.com/SaberCon/megumin-web',
          blankTarget: true,
        },
      ]}
    />
  )
}
