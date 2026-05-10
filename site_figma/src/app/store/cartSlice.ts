import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, getCartKey } from './api';
import type { Cart } from './types';

interface CartState {
  value: Cart | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  mutationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  value: null,
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  return api.getCart(getCartKey());
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    return api.addCartItem(getCartKey(), productId, quantity);
  },
);

export const changeCartItemQuantity = createAsyncThunk(
  'cart/changeCartItemQuantity',
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    return api.updateCartItemQuantity(getCartKey(), itemId, quantity);
  },
);

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (itemId: string) => {
  return api.removeCartItem(getCartKey(), itemId);
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState(state) {
      state.value = null;
      state.status = 'idle';
      state.mutationStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось загрузить корзину';
      })
      .addCase(addItemToCart.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.value = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message || 'Не удалось добавить товар в корзину';
      })
      .addCase(changeCartItemQuantity.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.value = action.payload;
      })
      .addCase(changeCartItemQuantity.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message || 'Не удалось изменить количество';
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.value = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message || 'Не удалось удалить товар';
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
