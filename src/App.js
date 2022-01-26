import { useEffect, useState } from 'react';
import './App.css';

import PaginationSelector from './components/PaginationSelector';
import PlatformCard from './components/PlatformCard';

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
    console.log("clicked", e)
    setPagination({ ...pagination, page: e })
  }
  const handleLimitChange = (e) => {

  }

  return (
    <>
      <header>
        <h2>Proximos pagos</h2>
      </header>
      <div className="container">
        <div className="card">
          <table className="table-users">
            <Header titles={headers} />
            {userPayments.map((item, index) => (
              <ExpansibleRow
                key={index}
                detail={item.platforms}
                onDetail={(platforms) => <PlatformRow platforms={platforms} />}
                render={<Columns data={item} />}
              />
            ))
            }
              <Footer>
                <PaginationSelector page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} onLimitChange={handleLimitChange} />
              </Footer>
          </table>
        </div>
      </div>
    </>
  )
}
const Header = ({ titles, ...rest }) =>
  titles.length > 0 &&
  titles.map((title, index) =>
    <th key={index} {...rest}>{title}</th>
  )

const Footer = ({ children }) => (
  <tr>
    <td>
      {children}
    </td>
  </tr>
)
const Columns = ({ data }) => (
  <>
    {Object.values(data).map((column, index) => typeof column !== 'object' && <td key={index}>{column}</td>)}
  </>
)
const ExpansibleRow = ({ detail, onDetail, render }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <tr>
        {render}
        <td>
          <span className="expansible-row-button material-icons" onClick={() => setIsOpen(!isOpen)}>expand_more</span>
        </td>
      </tr>
      {isOpen && onDetail(detail)}
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
