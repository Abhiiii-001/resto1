import { Metadata } from 'next';
import { DashboardLayout } from './_component/DashboardLayout';

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
