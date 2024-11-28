import UserTable from './UserTable';
import './App.css'

export default function App() {
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Таблица Пользователхо</h1>
      <UserTable />
    </div>
  );
}
