export type InvestorDetails = {
  name: string;
  email: string;
  phoneNumber: string;
  proofOfIdentity: string;
  proofOfAddress: string;
  nextOfKin: {
    name: string;
    email: string;
    address: string;
  };
};
