import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManagerType, ClientType } from '../types';

type MainSliceType = {
  clients: ClientType[];
  managers: ManagerType[];
};

const initialState: MainSliceType = {
  clients: [],
  managers: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<ClientType[]>) => {
      state.clients = action.payload;
    },
    setManagers: (state, action: PayloadAction<ManagerType[]>) => {
      state.clients = action.payload;
    },
  },
});

export const { setClients, setManagers } = mainSlice.actions;

export default mainSlice.reducer;
