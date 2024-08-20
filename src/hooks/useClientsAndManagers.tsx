import { useTypedDispatch } from './useTypedDispatch.tsx';
import { useTypedSelector } from './useTypedSelector.tsx';
import { useCallback } from 'react';
import { setManagers, setClients } from '@/store/mainSlice';
import { ManagerType, ClientType } from '@/types';

const useMainStore = () => {
  const dispatch = useTypedDispatch();
  const { clients, managers } = useTypedSelector((state) => state.main);

  const handleSetManagers = useCallback(
    (data: ManagerType[]) => {
      dispatch(setManagers(data));
    },
    [dispatch],
  );

  const handleSetClients = useCallback(
    (data: ClientType[]) => {
      dispatch(setClients(data));
    },
    [dispatch],
  );
  return {
    clients,
    managers,
    handleSetManagers,
    handleSetClients,
  };
};

export { useMainStore };
