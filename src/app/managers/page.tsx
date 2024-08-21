'use client';
import { BASE_URL } from '@/helpers/constants';
import useSWR from 'swr';
import { Managers } from '@/components';
import { fetcher } from '@/helpers/fetcher';
import CreateEditManagerModal from '../../components/createEditManagerModal/createEditManagerModal';
import { Loader, Error } from '@/components';
import { useEffect } from 'react';
import { useMainStore } from '@/hooks/useClientsAndManagers';

export default function ManagersPage() {
  const { data, isLoading, error } = useSWR(`${BASE_URL}/managers`, fetcher);

  const { handleSetManagers } = useMainStore();

  useEffect(() => {
    if (data) {
      handleSetManagers(data);
    }
  }, [data]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <Error />}
      {data && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}>
            <CreateEditManagerModal isCreate={true} />
          </div>
          <Managers managers={data} />
        </>
      )}
    </div>
  );
}
