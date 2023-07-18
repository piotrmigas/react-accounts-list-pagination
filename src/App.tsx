import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totals?.count! / 10);
  const indexOfLastAccount = page * 10;
  const indexOfFirstAccount = indexOfLastAccount - 10;
  const currentAccounts = accounts.slice(indexOfFirstAccount, indexOfLastAccount);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const headers = {
        'x-apikey': '5d9f48133cbe87164d4bb12c',
      };
      const accountsResponse = await axios('https://recruitmentdb-508d.restdb.io/rest/accounts-v-2?totals=true', {
        headers,
      });
      const accountTypesResponse = await axios('https://recruitmentdb-508d.restdb.io/rest/accounttypes', { headers });
      setAccounts(accountsResponse.data.data);
      setAccountTypes(accountTypesResponse.data);
      setTotals(accountsResponse.data.totals);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1 className='title'>Accounts List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>{`${page}/${totalPages}`}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Profit & Loss</th>
                <th>Account Type</th>
              </tr>
            </thead>
            <tbody>
              {currentAccounts.map((account) => {
                const accountType = accountTypes.find((type) => type.id === account.accountType);
                return (
                  <tr key={account._id}>
                    <td>{account.name}</td>
                    <td>{account.profitLoss}</td>
                    <td>{accountType?.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
