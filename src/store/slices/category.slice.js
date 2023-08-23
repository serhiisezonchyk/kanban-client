import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { getCategoriesFromGroup, addCategory, updateCategory, deleteCategory } from '../services/category.service';

const initialState = {
  data:null,
  status: 'loading',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesFromGroup.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getCategoriesFromGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getCategoriesFromGroup.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'loaded';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const categoryIndex = state.data.findIndex(category => category.id === +updatedCategory.id);
        if (categoryIndex !== -1) {
          state.data[categoryIndex] = {
            ...state.data[categoryIndex],
            ...updatedCategory.body,
          };
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const deletedCategoryId = action.payload?.id;
        if (deletedCategoryId) {
          const categoryIndex = state.data?.findIndex(
            (category) => category.id === +deletedCategoryId
          );
          if (categoryIndex !== -1) {
            state.data?.splice(categoryIndex, 1);
          }
        }
      });
  },
});
export const selectCategories = (state) => state.categories.data;
export const selectCategoriesLoading = (state) => state.categories.status ==='loading' || false;
export const { reducer: categoriesReducer, actions: categoriesActions } = categoriesSlice;
