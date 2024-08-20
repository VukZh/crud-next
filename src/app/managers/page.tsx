'use client';
import { BASE_URL } from '@/helpers/constants';
import useSWR from 'swr';
import { Managers } from '@/components';
import { fetcher } from '@/helpers/fetcher';
import { Button, Flex, Spin } from 'antd';

export default function ManagersPage() {
  const { data, isLoading, error } = useSWR(`${BASE_URL}/managers`, fetcher, {
    refreshInterval: 2000,
  });

  console.log(data);

  return (
    <div>
      {isLoading && (
        <Flex align="center" justify="center" style={{ height: '100vh' }}>
          <Spin size="large" />
        </Flex>
      )}
      {error && <p>Error: something went wrong</p>}
      {data && (
        <>
          <Button
            type="primary"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}>
            Add manager
          </Button>
          <Managers managers={data} />
        </>
      )}
    </div>
  );
}
