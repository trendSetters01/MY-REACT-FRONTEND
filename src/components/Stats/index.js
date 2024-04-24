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
      <section className="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
        {/* <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div> */}
        <h1>Coming soon...</h1>
      </section>
      {/* <section className="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </section> */}
    </>
  );
};

export default Stats;
