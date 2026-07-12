import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Table } from '../components/Table';

export const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <Table />
        </main>
      </div>
    </div>
  );
};