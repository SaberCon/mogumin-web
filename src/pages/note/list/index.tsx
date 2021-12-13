import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { useRequest } from 'ahooks'
import { deleteNote, listNote } from '@/pages/note/service'
import { Card, List, message, Popconfirm } from 'antd'
import { Link } from 'umi'
import { format, fromNow } from '@/utils/time'
import styles from './index.less'

const NoteList: React.FC = () => {
  const { data, run, loading } = useRequest(listNote)

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    message.success('删除文章成功')
    await run()
  }

  return (
    <PageContainer>
      <Card title="文章列表">
        <List
          className={styles.noteList}
          size="large"
          rowKey="id"
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link to={`/note/read/${item.id}`}>查看</Link>,
                <Link to={`/note/edit/${item.id}`}>编辑</Link>,
                <Popconfirm title="确定删除该文章吗" onConfirm={() => handleDelete(item.id)}>
                  <a className={styles.danger}>删除</a>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/note/read/${item.id}`}><a className={styles.title}>{item.title}</a></Link>}
                description={`上次修改时间为: ${fromNow(item.mtime)}`}
              />
              <div className={styles.listItem}>
                <span>创建时间</span>
                <p>{format(item.ctime)}</p>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  )
}

export default NoteList
