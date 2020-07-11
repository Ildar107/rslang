import React, { useEffect, useState } from 'react';
import statsServices from '../../services/user.statistic.services';
import './MinigamesStats.scss';

const { getStatistics } = statsServices;
const MinigamesStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const { userId, JWT: jwt } = localStorage;
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
      const data = await getStatistics(jwt, url);
      let { optional } = data;
      if (!optional) return;
      // console.log(optional);
      optional = Object.values(optional).reverse();
      setStats(optional);
    }
    fetchStats();
  }, []);
  return (
    <div className="minigames-table-container">
      <h3>
        Статистика мини-игр
      </h3>
      <table className="table table-hover table-sm table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Game</th>
            <th scope="col">Date</th>
            <th scope="col">Level</th>
            <th scope="col">Correct</th>
            <th scope="col">Incorrect</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({
            g, d, l, r, w,
          }, i) => (
            <tr key={`${d} ${l} ${i}`}>
              <th scope="row">{g}</th>
              <td>{d}</td>
              <td>{l}</td>
              <td>{r}</td>
              <td>{w}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MinigamesStats;
