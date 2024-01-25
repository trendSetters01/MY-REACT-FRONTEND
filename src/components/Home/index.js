import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

import Roadmap from "./../RoadMap/index.js";

function Home({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Introduction");

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
    <div
      style={{
        maxWidth: "100vw",
      }}
      className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-black to-purple-600"
    >
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
          {[
            "Introduction",
            "Roadmap",
            "NFT Benefits",
            "Tokenomics",
            "Phantoms Wallets",
            "Disclaimers",
          ].map((tab) => (
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
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Introduction" && (
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

        {activeTab === "Roadmap" && <Roadmap />}

        {activeTab === "NFT Benefits" && (
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

        {activeTab === "Tokenomics" && (
          <section className="tokenomics bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            {/* Tokenomics content */}
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
                precision, and community engagement. The initial supply of
                around 1 million tokens introduces a sense of exclusivity while
                requiring careful distribution and sensitivity to market
                dynamics.
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
                <strong>Distribution for 6 Million Token Supply:</strong>
              </p>
              <ul className="grid grid-cols-3 gap-4">
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Community Fund: 2,100,000 tokens (Approx. 35%) - Including
                    200,000 distributed and 100,000 for upcoming giveaways
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Staking Rewards: 1,200,000 tokens (20%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Team & Advisors: 400,000 tokens (Approx. 7%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Initial Distribution/Liquidity: 700,000 tokens (Approx. 12%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Reserve: 600,000 tokens (10%)
                  </li>
                </div>
                <div>
                  <li className="mt-2 mb-4">
                    <StarIcon />
                    Partnerships: 800,000 tokens (Approx. 13%)
                  </li>
                </div>
              </ul>
            </div>
          </section>
        )}
        {activeTab === "Phantoms Wallets" && (
          <section className="wallets bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Phantoms Wallets Overview
            </h2>
            <div className="dark:text-gray-300">
              <p className="mt-2 mb-4">
                We're dedicated to transparency and accountability. Below are
                the links to our Wallet addresses, showcasing real-time
                transactions and holdings:
              </p>
              <ul className="list-disc pl-5 dark:text-gray-300">
                <li className="mt-2 mb-4">
                  <strong>Reserve Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/YI7APPJQ6P2CLKW5E7YZ5NFMC4KBGES2EXN72ADUNX2BNQPKOOMIBVHWJU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
                <li className="mt-2 mb-4">
                  <strong>Community Funds Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/DBF3CRXDC36CARJREL3X6C7N3C373WPBPKRYFFHA7XBTTEB2ZIM4ZN64U4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
                <li className="mt-2 mb-4">
                  <strong>V1 NFT Staking Rewards Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/JWT3AWBTG2MRUCJQYY2L3QIZHQOO7XYICUTYWPLZ3WCB5YGQS65ITQAE5Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
                <li className="mt-2 mb-4">
                  <strong>Staking Rewards Reserve Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/2FKEVDZE2VVFWV65CGUS3EIR3OAZZQTA6EENRJIOSRKPVULH5M43QULK54"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
                <li className="mt-2 mb-4">
                  <strong>Team and Advisors Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/ILGNJUCJ3U5UCJFK5AFT4FKCRFSZLAN45W4HZRZWTXSOM3GCQPLJJG2BD4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
                <li className="mt-2 mb-4">
                  <strong>Partnerships Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/ER3NVYQQGRYHQSDRTL4ICMPWOTZMRXVJO44FCDLSEXNPGD3ERFP26DAB6Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    View Wallet
                  </a>
                </li>
              </ul>
              <p>
                Your support and trust in our project are invaluable. We remain
                committed to transparency and fostering a strong, engaged
                community around PHNTM.
              </p>
            </div>
          </section>
        )}
        {activeTab === "Disclaimers" && (
          <section className="disclaimers bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Phantoms Disclaimers
            </h2>
            <div className="dark:text-gray-300 space-y-4">
              <p>
                Phantoms is an initiative on the Algorand blockchain,
                aimed at harnessing blockchain technology for real-world
                applications. Our mission is to create a platform for growth,
                learning, and community engagement.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Financial Considerations:</strong> All interactions
                  within Phantoms, including purchases, are at your discretion.
                  We urge caution and inform you about the experimental nature
                  of our project.
                </li>
                <li>
                  <strong>Security Commitment:</strong> Security is our top
                  priority. We continuously strive to protect our community,
                  though no system can guarantee absolute security.
                </li>
                <li>
                  <strong>Transparency and Evolution:</strong> Phantoms commits
                  to transparency and adaptability. We will keep the community
                  informed and evolve our practices to enhance the project's
                  value.
                </li>
              </ul>
              <p>
                By participating in Phantoms, you recognize the innovative yet
                experimental aspect of the project. We are dedicated to
                improvement and encourage you to join us with an open mind.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
                onClick={() => setShowModal(!showModal)}
              >
                Read More
              </button>
              {showModal && (
                <div className="dark:text-gray-300">
                  <p className="mt-2 mb-4">
                    Primary intent behind Phantoms is not to generate financial
                    gains for its participants but to foster a space for
                    experimentation, learning, and growth within the realms of
                    digital collectibles and blockchain utility.
                  </p>
                  <p className="mt-2 mb-4">
                    All interactions, including purchases and transactions
                    within the Phantoms ecosystem, are conducted at the
                    participant's discretion. Users should be aware that, like
                    any innovative venture exploring new frontiers, Phantoms
                    carries inherent risks. The project is in continuous
                    development, reflecting an exploratory approach to
                    blockchain application. As such, all participants are
                    advised to proceed with caution, understanding the
                    experimental nature of their involvement.
                  </p>
                  <p className="mt-2 mb-4">
                    The Phantoms team places a paramount emphasis on security
                    and the integrity of the platform. We are dedicated to
                    implementing the highest standards of security measures and
                    best practices to safeguard the community and its assets.
                    However, in the digital domain, absolute security cannot be
                    unequivocally guaranteed. We pledge to be responsive and
                    proactive in addressing, mitigating, and informing our
                    community of any security concerns that may arise.
                  </p>
                  <p className="mt-2 mb-4">
                    We are committed to transparency, open communication, and
                    adaptability. We believe in keeping our community
                    well-informed about our processes, ongoing developments, and
                    any challenges we face along the way. As Phantoms evolves,
                    so too will our strategies, technologies, and practices.
                    Which, in turn, will aid with our goal of enhancing the
                    project's security, usability, and value to our community.
                  </p>
                  <p className="mt-2 mb-4">
                    By engaging with Phantoms, participants acknowledge the
                    experimental nature of the project and the potential for
                    unforeseen issues. Our team is dedicated to continuous
                    improvement, learning from experiences, and adapting to meet
                    the future head-on. We invite you to join us on this journey
                    with an open mind and a spirit of exploration.
                  </p>
                  <p className="mt-2 mb-4">
                    Please let us know if you have any questions or concerns.
                    Reach out to us at{" "}
                    <a
                      href="mailto: support@phantomshub.com"
                      className="mt-4 text-blue-500 hover:underline"
                    >
                      support@phantomshub.com
                    </a>
                  </p>
                </div>
              )}
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
