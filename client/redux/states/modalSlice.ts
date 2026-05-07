import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "UPGRADE_PLAN" | "PAYMENT_CONFIRMATION" | "DELETE_CONFIRMATION";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data?: any;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: ModalType; data?: any }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
