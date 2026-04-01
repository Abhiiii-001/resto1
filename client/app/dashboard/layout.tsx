import { Metadata } from 'next';
import { DashboardLayout } from './_component/DashboardLayout';
import StoreProvider from '@/redux/redux';

export const metadata: Metadata = {
  title: 'Dashboard | Restro',
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
