import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUnspentBalance, fetchVillageUnspentBalance } from '../api/unSpentBalanceApi.js';
import type { RootState } from './index';
import type { VillageData } from '../api/unSpentBalanceApi';

// Action Types
const UNSPENT_BALANCE_ACTIONS = {
  FETCH: 'unspentBalance/fetch',
} as const;

// State Type
interface UnspentBalanceState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UnspentBalanceState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk with proper typing
export const getUnspentBalance = createAsyncThunk(
  UNSPENT_BALANCE_ACTIONS.FETCH,
  async (districtCode: string, thunkAPI) => {
    try {
      const response = await fetchUnspentBalance(districtCode);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const unspentBalanceSlice = createSlice({
  name: 'unspentBalance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnspentBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnspentBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUnspentBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectUnspentBalance = (state: RootState) => state.unspentBalance.data ?? [];
export const selectUnspentBalanceLoading = (state: RootState) => state.unspentBalance.loading;
export const selectUnspentBalanceError = (state: RootState) => state.unspentBalance.error;

// Village Data Slice
interface VillageState {
  data: VillageData[] | null;
  loading: boolean;
  error: string | null;
}

const initialVillageState: VillageState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchVillageData = createAsyncThunk(
  'village/fetch',
  async ({ districtCode, blockCode }: { districtCode: string; blockCode: string }, thunkAPI) => {
    try {
      return await fetchVillageUnspentBalance(districtCode, blockCode);
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);

const villageSlice = createSlice({
  name: 'village',
  initialState: initialVillageState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVillageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVillageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVillageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectVillageData = (state: RootState) => state.village.data ?? [];
export const selectVillageLoading = (state: RootState) => state.village.loading;
export const selectVillageError = (state: RootState) => state.village.error;

export const unspentBalanceReducer = unspentBalanceSlice.reducer;
export const villageReducer = villageSlice.reducer;
