import React, { useState, useEffect } from "react";
// import { fetchTransactions } from "../../algorand/transactionHelpers/getStats";

const Stats = ({ accountAddress }) => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on component mount
  // useEffect(() => {
  //   if (accountAddress) {
  //     fetchTransactions(accountAddress).then((transactions) => {
  //       setTransactions(transactions);
  //       console.log("Transactions", transactions);
  //     });
  //   }
  // }, [accountAddress]);
  return (
    <>
      <section className="mt-4 stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
        <div className="stats bg-white text-black shadow">
          <div className="stat p-12">
            <div className="stat-title text-black animate-pulse">
              Coming Soon...
            </div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat p-12">
            <div className="stat-title text-black animate-pulse">
              Coming Soon...
            </div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat p-12">
            <div className="stat-title text-black animate-pulse">
              Coming Soon...
            </div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </section>
      <section className="stats bg-white text-black stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
        <div className="stat">
          <div className="stat-title text-black animate-pulse">
            Coming Soon...
          </div>
          <div className="stat-title text-black animate-pulse">
            Total Page Views
          </div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title text-black animate-pulse">
            Coming Soon...
          </div>
          <div className="stat-title text-black animate-pulse">
            Total Page Views
          </div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </section>
      <section className="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title text-xl text-white animate-pulse">
              Account balance,  Coming Soon...
            </div>
            <div className="stat-value">$89,400</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl text-white animate-pulse">
              Current balance,  Coming Soon...
            </div>
            <div className="stat-value">$89,400</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
