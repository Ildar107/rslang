import React, { useEffect, useState } from 'react';
import statsServices from '../../services/user.statistic.services';

const { getStatistics } = statsServices;
const MinigamesStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const { userId, JWT: jwt } = localStorage;
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
      const data = await getStatistics(jwt, url);
      const { optional } = data;
      // console.log(optional);
      setStats(Object.values(optional));
    }
    fetchStats();
  }, []);
  return (
    <table className="table table-hover">
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
          <tr className="table-dark" key={`${d} ${l} ${i}`}>
            <th scope="row">{g}</th>
            <td>{d}</td>
            <td>{l}</td>
            <td>{r}</td>
            <td>{w}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default MinigamesStats;
