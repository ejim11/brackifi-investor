import { investments, investor } from '@/axios.config';

// create an investment service
export const createInvestmentService = async (data: any, jwtToken: string) => {
  return await investments.post('/', data, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};

//   Get all the investors investments
export const getAllInvestmentsService = async (
  jwtToken: string,
  investorId: string
) => {
  return await investor.get(`/${investorId}/investments`, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};

export const makeWithdrawalRequestService = async (
  jwtToken: string,
  investorId: string,
  investmentId: string,
  data: any
) => {
  return await investor.patch(
    `/${investorId}/investments/${investmentId}/make-withdrawal`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + jwtToken,
      },
    }
  );
};
