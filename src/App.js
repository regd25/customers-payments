import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table'
import PaginationSelector from './components/PaginationSelector';
import PlatformCard from './components/PlatformCard';
import Header from './components/Header';

function App() {
  const headers = ["Nombre", "Email", "Cantidad de suscripciones", "Periodicidad", "Ultimo pago", "Proximo pago", "Total a pagar"]
  const [userPayments, setUserPayments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    totalPages: 0
  })
  useEffect(() => {
    const getUserPayments = () => {
      fetch(`http://localhost:4000/user/payments?page=${pagination.page}&limit=${pagination.limit}`)
        .then(response => response.json())
        .then(data => {
          if (pagination.totalPages === 0) setPagination({ ...pagination, totalPages: data.body.totalPages })
          setUserPayments(data.body.result)
        })
    }
    getUserPayments()
  }, [pagination]);

  const handlePageChange = (e) => {
    setPagination({ ...pagination, page: e })
  }
  const handleLimitChange = (e) => {

  }

  return (
    <>
      <Header title="Proximos pagos" />
      <div className="container">
        <div className="card">
          <Table>
            <Table.Header titles={headers} />
            {userPayments.map((item, index) => (
              <Table.ExpansibleRow
                key={index}
                detail={item.platforms}
                onDetail={(platforms) => <PlatformRow platforms={platforms} />}
                render={<Table.Columns data={item} />}
              />
            ))
            }
            <Table.Footer>
              <PaginationSelector
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            </Table.Footer>
          </Table>
        </div>
      </div>
    </>
  )
}


const PlatformRow = ({ platforms }) => (
  <tr>
    {platforms.map(item => (
      <td>
        <PlatformCard key={item.name} name={item.name} monthlyPrice={item.monthlyPrice} />
      </td>
    ))}
  </tr>
)



export default App;
