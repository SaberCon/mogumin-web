// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserParam = {
    username: string;
    avatar: string;
  };

  type ReminderParam = {
    summary: string;
    content?: string;
    link?: string;
    dueDate?: string;
    id?: string;
  };

  type PasswordParam = {
    name: string;
    pwd: string;
    username?: string;
    website?: string;
    desc?: string;
    id?: string;
  };

  type NoteParam = {
    title: string;
    content: string;
    id?: string;
  };

  type UserInfo = {
    username: string;
    phone: string;
    avatar: string;
    id: string;
  };

  type PageReminder = {
    total: number;
    list: Reminder[];
  };

  type Reminder = {
    summary: string;
    content?: string;
    link?: string;
    dueDate?: string;
    userId: string;
    id?: string;
    ctime?: string;
    mtime?: string;
  };

  type PagePassword = {
    total: number;
    list: Password[];
  };

  type Password = {
    name: string;
    pwd: string;
    username?: string;
    website?: string;
    desc?: string;
    userId: string;
    id?: string;
    ctime?: string;
    mtime?: string;
  };

  type OssData = {
    accessId: string;
    host: string;
    dir: string;
    policy: string;
    signature: string;
    expire: number;
  };

  type Note = {
    title: string;
    content: string;
    userId: string;
    id?: string;
    ctime?: string;
    mtime?: string;
  };

  type PageNote = {
    total: number;
    list: Note[];
  };
}
