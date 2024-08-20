'use client';
import { Clients } from '@/components';
import useSWR from 'swr';
import { Button, Checkbox, Divider, Flex, Popover, Spin } from 'antd';
import type { CheckboxProps } from 'antd';
import { BASE_URL } from '@/helpers/constants';
import { fetcher } from '@/helpers/fetcher';
import { useState } from 'react';
import { ClientType } from '@/types';
import { SettingOutlined } from '@ant-design/icons';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['active', 'archive', 'pending'];
const defaultCheckedList = ['active', 'archive', 'pending'];

export default function ClientsPage() {
  const { data, isLoading, error } = useSWR(`${BASE_URL}/clients`, fetcher, {
    refreshInterval: 2000,
  });

  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const hide = () => {
    console.log('hide');
    setOpenFilter(false);
  };

  const filteredClients = data
    ? Array.from(data).filter((client) => {
        if (checkedList.length === 0) {
          return false;
        }
        return checkedList.includes(client.status);
      })
    : [];

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
            Add client
          </Button>
          <Popover
            content={
              <a>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}>
                  Show all
                </Checkbox>
                <Divider style={{ margin: '10px 0' }} />
                <CheckboxGroup
                  options={plainOptions}
                  value={checkedList}
                  onChange={onChange}
                />
                <Button onClick={hide}>Close</Button>
              </a>
            }
            title="Status filter"
            trigger="click"
            open={openFilter}
            // onOpenChange={handleOpenChange}
          >
            <Button
              type="primary"
              onClick={() => setOpenFilter(true)}
              style={{ position: 'absolute', right: '10px', top: '10px' }}
              shape="circle"
              icon={<SettingOutlined />}></Button>
          </Popover>

          <Clients clients={filteredClients as ClientType[]} />
        </>
      )}
    </div>
  );
}
