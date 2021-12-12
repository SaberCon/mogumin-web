import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Prompt, useParams } from 'umi'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Card, message } from 'antd'
import type { BaseNote } from '@/pages/note/service'
import { getNote, saveNote } from '@/pages/note/service'

const Edit: React.FC = () => {
  const [unsaved, setUnsaved] = useState(false)
  const { id } = useParams<{ id?: string }>()
  const [form] = ProForm.useForm()

  return (
    <PageContainer>
      <Card>
        <ProForm<BaseNote>
          form={form}
          submitter={{ searchConfig: { submitText: id ? '修改' : '新增' } }}
          onFinish={async (values) => {
            await saveNote({ id, ...values })
            message.success('保存成功')
            setUnsaved(false)
            if (!id) {
              form.resetFields()
            }
          }}
          onValuesChange={() => setUnsaved(true)}
          request={id ? () => getNote(id) : undefined}
          size="large"
        >
          <ProFormText
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
            width="xl"
          />
          <ProFormText
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          />
        </ProForm>
        <Prompt when={unsaved} message="文章未保存，确定退出么？"/>
      </Card>
    </PageContainer>
  )
}

export default Edit
