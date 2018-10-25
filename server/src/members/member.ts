export interface MemberInterface  {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  contact: string;
  address: AddressInterface;
  authorized: string[];
  customers: string[];
  kycDetails: Kyc;
}

export interface AddressInterface {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Kyc {
	status: string;
	documentRequired: string[];
}
