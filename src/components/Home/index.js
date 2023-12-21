import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

import Roadmap from "./../RoadMap/index.js";

function Home({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("introduction");

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
      setAccountData(response.account ? response.account : null);
      setError(response.message ? response.message : null);
      setLoading(false);
    } catch (err) {
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
          Phantoms
        </h1>
        <p className="text-xl font-light text-gray-100">
          Join us on an exciting journey!
        </p>
      </header>
      <main>
        <div className="tabs flex justify-center mb-4">
          {["introduction", "roadmap", "nftBenefits", "tokenomics"].map(
            (tab) => (
              <button
                style={{ marginBottom: "2em" }}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 mx-2 text-sm font-semibold rounded-lg ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-black to-gray-500 hover:from-blue-400 hover:to-pink-500 text-white"
                    : "text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {activeTab === "introduction" && (
          <section
            style={{ height: "40vh" }}
            className="bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg"
          >
            {/* Introduction content */}
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Welcome to Phantoms!
            </h2>
            <p className="dark:text-gray-300">
              We're crafting a vibrant, user-driven platform. While we're still
              laying the groundwork, we invite you to stay connected as our
              project evolves!
            </p>
          </section>
        )}

        {activeTab === "roadmap" && <Roadmap />}

        {activeTab === "nftBenefits" && (
          <section
            style={{ minHeight: "50vh" }}
            className="nft-benefits bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg"
          >
            {/* NFT Benefits content */}
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
        )}

        {activeTab === "tokenomics" && (
          <section className="tokenomics bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            {/* Tokenomics content */}
            <h2 className="text-2xl font-semibold mb-4">
              Explore Phantoms Token
            </h2>
            <p className="dark:text-gray-300">
              Transparency is key to our community. We invite you to view the
              live statistics and transactions of Phantom tokens on
              AlgoExplorer.
            </p>
            <p className="mt-2 mb-4">
              <a
                href="https://algoexplorer.io/asset/1279721720"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                View Phantoms Token on AlgoExplorer
              </a>
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Initial Tokenomics Overview
            </h2>
            <div className="dark:text-gray-300">
              <p>
                <strong>
                  Tokenomics Evaluation for 7 Million Token Supply
                </strong>
              </p>
              <p className="mt-2 mb-4">
                Our approach to tokenomics is rooted in principles of scarcity,
                precision, and community engagement. The initial supply of 1
                million tokens introduces a sense of exclusivity while requiring
                careful distribution and sensitivity to market dynamics.
              </p>
              <p className="mt-2 mb-4">
                <strong>1. Scarcity and Exclusivity:</strong> The limited supply
                is designed to drive demand and value, leveraging psychological
                principles of scarcity.
              </p>
              <p className="mt-2 mb-4">
                <strong>2. Precision in Distribution:</strong> Every token is
                valuable, and distribution must be handled with fairness and
                transparency to avoid centralization or undue influence.
              </p>
              <p className="mt-2 mb-4">
                <strong>3. Price Sensitivity:</strong> A smaller supply may lead
                to higher price volatility, attracting attention from traders
                but also necessitating safeguards against market manipulation.
              </p>
              <p className="mt-2 mb-4">
                <strong>4. Liquidity Concerns:</strong> Strategies to ensure
                ample liquidity will be crucial for market stability, especially
                in the early stages after launch.
              </p>
              <p className="mt-2 mb-4">
                <strong>5. Engagement & Governance:</strong> Allocating a
                significant portion for community initiatives underscores our
                commitment to decentralized governance and active community
                involvement.
              </p>
              <p className="mt-2 mb-4">
                <strong>6. Staking Dynamics:</strong> Balanced staking
                incentives are intended to encourage holding, contributing to
                price stability.
              </p>
              <p className="mt-2 mb-4">
                <strong>7. Long-Term Vision & Adjustability:</strong> We
                anticipate the need for adaptability in our tokenomics to
                respond to evolving market conditions and community feedback.
              </p>
              <p className="mt-2 mb-4">
                <strong>Conclusion:</strong> Our token supply cap is a
                foundational aspect of our project's identity. The outlined
                tokenomics are initial and subject to refinement in
                collaboration with our community.
              </p>
              <br />
              <p className="text-xl font-semibold mb-4">
                <strong>Distribution for 7 Million Token Supply:</strong>
              </p>
              <ul className="grid grid-cols-3 gap-4">
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Community Fund: 2,800,000 tokens (40%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Staking Rewards: 1,400,000 tokens (20%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Team & Advisors: 1,050,000 tokens (15%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Initial Distribution: 700,000 tokens (10%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Reserve: 700,000 tokens (10%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Partnerships: 350,000 tokens (5%)
                  </li>
                </div>
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
};

export default Home;
