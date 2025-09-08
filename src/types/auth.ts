export interface SignUpParams {
  client_id: string;
  email: string;
  password: string;
  phone_number?: string;
  connection: string;
  given_name?: string;
  family_name?: string;
  name?: string;
}
