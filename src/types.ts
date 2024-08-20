type GenderType = 'Male' | 'Female';

type StatusType = 'active' | 'archive' | 'pending';

export type ClientType = {
  id: string;
  manager_id: string;
  name: string;
  date_of_birth: Date;
  phone: string;
  gender: GenderType;
  status: StatusType;
};

export type ManagerType = {
  id: string;
  name: string;
};
