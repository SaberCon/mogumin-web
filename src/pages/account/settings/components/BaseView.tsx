import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import ProForm, { ProFormText, } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import styles from './BaseView.less'
import { getOssData, updateUser } from '@/services/user'
import type { RcFile, UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'
import { useCurrentUserOrGoToLogin } from '@/hooks/useCurrentUser'

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView: React.FC<{ avatar: string; setAvatar: (avatar: string) => void }> = ({ avatar, setAvatar }) => {
  const { data, run } = useRequest(getOssData)

  const onChange = ({ file }: UploadChangeParam) => {
    if (file.status === 'done') {
      setAvatar(`${data!.host}/${file.url}`)
    }
  }

  const getExtraData = (file: UploadFile) => {
    return {
      key: file.url,
      OSSAccessKeyId: data!.accessId,
      policy: data!.policy,
      Signature: data!.signature,
    }
  }

  const beforeUpload = async (file: RcFile) => {
    if (!data || data.expire * 1000 < Date.now()) {
      await run()
      return false
    }
    Object.defineProperty(file, 'url', {
      value: `${data.dir}${Date.now()}-${file.name}`,
      enumerable: true,
    })
    return file
  }

  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar"/>
      </div>
      <Upload
        accept="image/*"
        showUploadList={false}
        action={data?.host}
        onChange={onChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined/>
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  )
}

const BaseView: React.FC = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUserOrGoToLogin()
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const { loading, run } = useRequest(updateUser, {
    manual: true,
    onSuccess: () => {
      message.success('更新成功')
      refreshCurrentUser()
    },
  })

  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={(values: API.CurrentUser) => run({ ...values, avatar })}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
                loading
              },
            }}
            initialValues={currentUser}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              name="username"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入您的昵称!',
                },
              ]}
            />
          </ProForm>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={avatar} setAvatar={setAvatar}/>
        </div>
      </>
    </div>
  )
}

export default BaseView
