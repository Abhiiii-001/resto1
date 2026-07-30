import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "VARIANT_MODAL" | "RESTAURANT_MODAL";

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; data?: any }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
