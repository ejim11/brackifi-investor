import { investments, investor } from '@/axios.config';
import axios from 'axios';

// Replace with your Ethereum node's JSON-RPC endpoint
const RPC_URL = 'https://bsc-dataseed1.defibit.io/';
// 'https://base-mainnet.g.alchemy.com/v2/pCgztJQYuRFexRNH-aV_BOnRPeSkRZPG';
// https://bsc-dataseed1.binance.org/

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
      Authorization: 'Bearer ' + jwtToken + ' investor',
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

// Get all the transactions from an account

async function getTransactionCount(address: string) {
  const response = await axios.post(RPC_URL, {
    jsonrpc: '2.0',
    method: 'eth_getTransactionCount',
    params: [address, 'latest'],
    id: 1,
  });

  return response.data.result;
}

async function getTransactionByHash(hash: string) {
  const response = await axios.post(RPC_URL, {
    jsonrpc: '2.0',
    method: 'eth_getTransactionByHash',
    params: [hash],
    id: 1,
  });

  return response.data.result;
}

export async function getAllTransactions(address: string) {
  const transactionCountHex = await getTransactionCount(address);
  const transactionCount = parseInt(transactionCountHex, 16);

  console.log(`Total transactions for address ${address}: ${transactionCount}`);

  const transactions = [];

  for (let i = 0; i < transactionCount; i++) {
    const response = await axios.post(RPC_URL, {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByBlockNumberAndIndex',
      params: ['latest', `0x${i.toString(16)}`],
      id: 1,
    });

    console.log('res: ', response);

    const transaction = response.data.result;
    if (
      transaction &&
      (transaction.from === address || transaction.to === address)
    ) {
      transactions.push(transaction);
    }
  }

  console.log(transactions);
  return transactions;
}

// Get the latest block number first to define END_BLOCK and START_BLOCK
export const getLatestBlockNumber = async () => {
  const data = {
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: [],
    id: 1,
  };

  try {
    const response = await axios.post(RPC_URL, data);
    const latestBlock = parseInt(response.data.result, 16);
    return latestBlock;
  } catch (error) {
    console.error('Error fetching the latest block number:', error);
    return null;
  }
};

export const getTransactionsToAddress = async (
  address: string,
  startBlock: any,
  endBlock: any,
  stepSize: any
) => {
  let currentBlock = startBlock;

  while (true) {
    const toBlock =
      currentBlock + stepSize > endBlock ? endBlock : currentBlock + stepSize;

    const data = {
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [
        {
          address: address,
          fromBlock: `0x${currentBlock.toString(16)}`,
          toBlock:
            toBlock === endBlock ? 'latest' : `0x${toBlock.toString(16)}`,
        },
      ],
      id: 1,
    };

    try {
      const response = await axios.post(RPC_URL, data);
      console.log('response: ', response);
      const logs = response.data.result;

      logs.forEach((log: any) => {
        console.log({
          transactionHash: log.transactionHash,
          blockNumber: parseInt(log.blockNumber, 16),
          data: log.data,
        });
      });

      if (toBlock === endBlock) break;
      currentBlock += stepSize;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      break;
    }
  }
};

export const getTransactionsByAddress: Function = async (hash: string) => {
  const url = 'https://api.bscscan.com/api';
  const params = {
    module: 'account',
    action: 'tokentx',
    address: '0xF2188d49351CfA84DF6c6d09eaC783BAbc09F63f',
    startblock: 0,
    endblock: 99999999,
    page: 0,
    offset: 100,
    sort: 'asc',
    apikey: process.env.NEXT_PUBLIC_API_KEY_BSC,
  };

  const res = await axios.get(url, { params });

  const txns = res.data.result;

  console.log('txns: ', txns);

  // const filters = txns.filter((txn: any) => txn.hash === hash);

  const filteredTxn = txns
    .filter((txn: any) => txn.hash === hash)
    .slice()
    .sort((a: any, b: any) => b.blockNumber - a.blockNumber)[0];

  return filteredTxn ?? undefined;
};
