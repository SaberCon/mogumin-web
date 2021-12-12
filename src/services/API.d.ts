declare namespace API {
  type CurrentUser = {
    id: number;
    username: string;
    phone: string;
    avatar: string;
  };

  type Page<T> = {
    total: number;
    list: T[];
  };

  type BaseAsset = {
    id: string;
    userId: number;
    ctime: string;
    mtime: string;
  };
}
