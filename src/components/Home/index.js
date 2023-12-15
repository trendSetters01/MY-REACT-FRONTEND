import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

import Roadmap from "./../RoadMap/index.js";

function Home({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
      console.log(response);
      const data = response;
      if (data.account) {
        setAccountData(data.account);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch account data:", err);
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <header className="mb-8 text-center dark:text-white">
        {/* Logo and Title */}
        <h1 className="text-4xl font-bold mb-2">Phantoms</h1>
        <p className="text-lg">Join us on an exciting journey!</p>
      </header>
      <main>
        <div className="tab-container text-black space-y-8">
          {/* Introduction Section */}
          <section className="introduction bg-gray-400 p-4 shadow rounded-lg dark:bg-gray-700">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Welcome to Phantoms!
            </h2>
            <p className="dark:text-gray-300">
              We're crafting a vibrant, user-driven platform. While we're still
              laying the groundwork, we invite you to stay connected as our
              project evolves!
            </p>
          </section>

          {/* Roadmap Section */}
          <Roadmap />

          {/* NFT Benefits Section */}
          <section className="nft-benefits text-black bg-gray-400 p-4 shadow rounded-lg dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Exclusive Benefits with Phantom NFTs
            </h2>
            <p className="dark:text-gray-300">
              As a holder of Phantom NFTs, you're not just owning digital art;
              you're part of the Phantoms inner circle. These NFTs will unlock
              exclusive benefits and privileges within the Phantoms ecosystem as
              we grow. Here's a sneak peek of what to expect:
            </p>
            <ul className="list-disc pl-5 dark:text-gray-300">
              <li>
                <strong>Early Access:</strong> Be the first to know and engage
                with new developments, updates, and features within the
                platform.
              </li>
              <li>
                <strong>Special Privileges:</strong> Enjoy unique opportunities
                and offers exclusive to Phantom NFT holders.
              </li>
              <li>
                <strong>Community Influence:</strong> Have a say in the
                direction of future expansions and improvements. Your feedback
                will be prioritized.
              </li>
              <li>
                <strong>Exclusive Events:</strong> Get invitations to
                holder-only events, AMAs with the leadership team, and more.
              </li>
            </ul>
            <p className="dark:text-gray-300">
              We're just getting started, and these NFTs are your gateway to
              grow along with us. Stay tuned for more exciting benefits!
            </p>
          </section>

          {/* Explore Token Section */}
          <section className="explore-token text-black bg-gray-400 p-4 shadow rounded-lg dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Explore Phantoms Token
            </h2>
            <p className="dark:text-gray-300">
              Transparency is key to our community. We invite you to view the
              live statistics and transactions of Phantom tokens on
              AlgoExplorer.
            </p>
            <p>
              <a
                href="https://algoexplorer.io/asset/1224920582"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                View Phantoms Token on AlgoExplorer
              </a>
            </p>
          </section>

          {/* Tokenomics Section */}
          <section className="tokenomics text-black bg-gray-400 p-4 shadow rounded-lg dark:bg-gray-700 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Initial Tokenomics Overview
            </h2>
            <div className="dark:text-gray-300">
              <p>
                <strong>
                  Tokenomics Evaluation for 1 Million Token Supply
                </strong>
              </p>
              <p>
                Our approach to tokenomics is rooted in principles of scarcity,
                precision, and community engagement. The initial supply of 1
                million tokens introduces a sense of exclusivity while requiring
                careful distribution and sensitivity to market dynamics.
              </p>
              <p>
                <strong>1. Scarcity and Exclusivity:</strong> The limited supply
                is designed to drive demand and value, leveraging psychological
                principles of scarcity.
              </p>
              <p>
                <strong>2. Precision in Distribution:</strong> Every token is
                valuable, and distribution must be handled with fairness and
                transparency to avoid centralization or undue influence.
              </p>
              <p>
                <strong>3. Price Sensitivity:</strong> A smaller supply may lead
                to higher price volatility, attracting attention from traders
                but also necessitating safeguards against market manipulation.
              </p>
              <p>
                <strong>4. Liquidity Concerns:</strong> Strategies to ensure
                ample liquidity will be crucial for market stability, especially
                in the early stages after launch.
              </p>
              <p>
                <strong>5. Engagement & Governance:</strong> Allocating a
                significant portion for community initiatives underscores our
                commitment to decentralized governance and active community
                involvement.
              </p>
              <p>
                <strong>6. Staking Dynamics:</strong> Balanced staking
                incentives are intended to encourage holding, contributing to
                price stability.
              </p>
              <p>
                <strong>7. Long-Term Vision & Adjustability:</strong> We
                anticipate the need for adaptability in our tokenomics to
                respond to evolving market conditions and community feedback.
              </p>
              <p>
                <strong>Conclusion:</strong> Our token supply cap is a
                foundational aspect of our project's identity. The outlined
                tokenomics are initial and subject to refinement in
                collaboration with our community.
              </p>
              <br />
              <p>
                <strong>Distribution for 1 Million Token Supply:</strong>
              </p>
              <ul>
                <li>Community Fund: 400,000 tokens (40%)</li>
                <li>Staking Rewards: 200,000 tokens (20%)</li>
                <li>Team & Advisors: 150,000 tokens (15%)</li>
                <li>Initial Distribution: 100,000 tokens (10%)</li>
                <li>Reserve: 100,000 tokens (10%)</li>
                <li>Partnerships: 50,000 tokens (5%)</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
