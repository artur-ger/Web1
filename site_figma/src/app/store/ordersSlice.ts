import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, getCartKey } from './api';
import type { Order } from './types';

interface OrdersState {
  currentOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  currentOrder: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (payload: {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    delivery_address: string;
    delivery_comment?: string;
  }) => {
    return api.createOrder(getCartKey(), payload);
  },
);

export const fetchOrderByNumber = createAsyncThunk('orders/fetchOrderByNumber', async (orderNumber: string) => {
  return api.getOrderByNumber(orderNumber);
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.currentOrder = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось оформить заказ';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось загрузить заказ';
      });
  },
});

export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
