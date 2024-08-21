import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

type DispatchFunc = () => AppDispatch;
export const useTypedDispatch: DispatchFunc = useDispatch;
