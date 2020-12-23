export interface Iuser {
  use_id?: string;
  use_name: string;
  use_lastname: string;
  use_password: string;
  use_email: string;
  use_phone: string;
  is_valid: boolean;
}

export interface DataAndCountUser {
  count: number;
  rows: Partial<Iuser>[];
}
