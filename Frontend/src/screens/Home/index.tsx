import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Table: React.FC<any> = (props) => {
  const { data, search, page, perPage, setPage } = props

  const [sortColumn, setSortColumn] = useState<any>(null);
  const [sortDirection, setSortDirection] = useState<any>(null);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      if (sortDirection === 'ascending') {
        setSortDirection('descending');
      } else if (sortDirection === 'descending') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortColumn(column);
        setSortDirection('ascending');
      }
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  const memoizedData = useMemo(() => {
    let filteredData = data;

    if (Array.isArray(filteredData)) {
      // Filter by search
      if (search.length > 0) {
        filteredData = filteredData?.filter((item: any) => {
          return (
            item['sha256_hash'].toLowerCase().includes(search.toLowerCase())
          );
        });
      }

      // Sort by column
      if (sortColumn !== null) {
        filteredData = filteredData?.sort((a: any, b: any) => {
          if (a[sortColumn] < b[sortColumn]) {
            return sortDirection === 'ascending' ? -1 : 1;
          }
          if (a[sortColumn] > b[sortColumn]) {
            return sortDirection === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }

      // Paginate data
      const startIndex = page * perPage;
      const endIndex = startIndex + perPage;
      return filteredData?.slice(startIndex, endIndex)
    }
    return []
  }, [data, search, sortColumn, sortDirection, page, perPage]);

  return (
    <>
      <table className='table table-striped table-hover table-bordered'>
        {memoizedData.length > 0 ? (<>
          <thead>
            <tr>
              <th onClick={() => handleSort('sha256_hash')}>
                Sha256 Hash
                {sortColumn === 'sha256_hash' &&
                  (sortDirection === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('first_seen')}>
                First seen
                {sortColumn === 'first_seen' &&
                  (sortDirection === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('tags')}>
                Tags
                {sortColumn === 'tags' &&
                  (sortDirection === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('file_type')}>
                File Type
                {sortColumn === 'file_type' &&
                  (sortDirection === 'ascending' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {memoizedData?.map((item: any) => (
              <tr key={item.id}>
                <td><Link to={`/detail?hash=${item['sha256_hash']}`}>{item['sha256_hash']}</Link></td>
                <td>{item['first_seen']}</td>
                <td>{`${item['tags'][0]}, ${item['tags'][1]}`}</td>
                <td>{item['file_type']}</td>
              </tr>
            ))}
          </tbody>
        </>) : <>There is no data</>}
      </table>

      <div>
        <button className="btn btn-primary btn-sm me-2" onClick={() => setPage((prevPage: number) => prevPage - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className="btn btn-primary btn-sm"
          onClick={() => setPage((prevPage: number) => prevPage + 1)}
          disabled={memoizedData?.length < perPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const serverUrl = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    axios.get(`${serverUrl}/bazaar/getRedLineStealer`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
        setData([])
      })
  }, []);

  const handleLimitChange = (value: any) => {
    setPerPage(value);
    setPage(1);
  };

  const handleClickSearch = () => {
    if (search.length > 0) {
      axios.get(`${serverUrl}/bazaar/search?hash=${search}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
          setData([])
        })
    } else {
      axios.get(`${serverUrl}/bazaar/getRedLineStealer`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
          setData([])
        })
    }
  }

  return <>
    <div className='d-flex mb-3 justify-content-between'>
      <div className="input-group" style={{ width: 500 }}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search by hash" />
        <button className="btn btn-outline-secondary" type="button" onClick={handleClickSearch}>Search</button>
      </div>
      <div className='d-flex align-items-center'>
        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-primary dropdown-toggle"
            type="button"
            id="limitDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Rows limit: {perPage}
          </button>
          <ul className="dropdown-menu" aria-labelledby="limitDropdown">
            <li>
              <button
                className={`dropdown-item ${perPage === 10 ? 'active' : ''}`}
                onClick={() => handleLimitChange(10)}
              >
                10
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${perPage === 50 ? 'active' : ''}`}
                onClick={() => handleLimitChange(50)}
              >
                50
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${perPage === 100 ? 'active' : ''}`}
                onClick={() => handleLimitChange(100)}
              >
                100
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Table data={data} search={search} page={page} perPage={perPage} setPage={setPage} />
  </>;
};

export default Home;
