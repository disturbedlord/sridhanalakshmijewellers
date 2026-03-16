export type Address = {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  id?: string;
};

export type Addresses = {
  addresses: Address[];
};
