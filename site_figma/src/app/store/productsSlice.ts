import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import type { Category, Product } from './types';

interface ProductsState {
  items: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  selectedProduct: null,
  status: 'idle',
  selectedStatus: 'idle',
  error: null,
};

export const fetchCatalogData = createAsyncThunk('products/fetchCatalogData', async () => {
  const [products, categories] = await Promise.all([api.getProducts(), api.getCategories()]);
  return { products, categories };
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
  return api.getProductById(id);
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCatalogData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCatalogData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Не удалось загрузить каталог';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.error = action.error.message || 'Не удалось загрузить товар';
      });
  },
});

export default productsSlice.reducer;
