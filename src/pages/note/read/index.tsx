import React from 'react';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import { getNote } from '@/pages/note/service';

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useRequest(getNote, { defaultParams: [id] });

  return <PageContainer>{data ? <div>{data.content}</div> : <PageLoading />}</PageContainer>;
};

export default Read;
