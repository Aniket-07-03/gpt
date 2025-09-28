interface UnspentBalanceData {
  blockName: string;
  totalGramPanchayats: number;
  totalVillages: number;
  totalPopulation: number;
  totalFundsReceived: string;
  totalFundsSpent: string;
  utilizationPercentage: number;
  topPerformingGP: string;
  bottomPerformingGP: string;
  lastUpdated: string;
  status: string;
}

export interface VillageData {
  villageName: string;
  totalFundsReceived: string;
  totalFundsSpent: string;
  utilizationPercentage: number;
  lastUpdated: string;
}

export async function fetchUnspentBalance(districtCode: string): Promise<UnspentBalanceData[]> {
  const params = new URLSearchParams({
    stateCode: '27',
    districtCode: districtCode,
    finYear: '2024-2025',
    schemeCode: '3287',
    type: 'V',
    schemeComponent: '',
    fromAmount: '',
    toAmount: '',
    amountIn: 'RS'
  });

  const url = `https://egramswaraj.gov.in/getUnspentBalanceBlockData.do?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data as UnspentBalanceData[];
  } catch (error) {
    console.error('Error fetching unspent balance:', error);
    throw error;
  }
}

export async function fetchVillageUnspentBalance(districtCode: string, blockCode: string): Promise<VillageData[]> {
  const params = new URLSearchParams({
    stateCode: '27',
    districtCode: districtCode,
    blockCode: blockCode,
    finYear: '2024-2025',
    schemeCode: '3287',
    schemeComponent: '',
    fromAmount: '',
    toAmount: '',
    amountIn: 'RS'
  });

  const url = `https://egramswaraj.gov.in/getUnspentBalanceVillageData.do?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch village data');
    }
    const data = await response.json();
    return data as VillageData[];
  } catch (error) {
    console.error('Error fetching village unspent balance:', error);
    throw error;
  }
}
