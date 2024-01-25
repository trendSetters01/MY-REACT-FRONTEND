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
      className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-teal-600 to-purple-600"
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
              <h3 className="text-xl font-semibold mb-4">
                Vision and Progress
              </h3>
              <p>
                <strong>Phantoms</strong> embarks on a pioneering journey within
                the Algorand blockchain ecosystem, dedicated to unlocking the
                potential of blockchain for tangible, real-world applications.
                Our ambition is to cultivate a space where innovation meets
                community, fostering an environment of growth, learning, and
                engagement.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Dynamic Evolution:</strong> Phantoms is not static; it
                  is a voyage of discovery and adaptation. While our initial
                  phase might be experimental, our eyes are set on a clear
                  horizon. Feedback from our community is our compass, guiding
                  our project's evolution from experimental to established,
                  ensuring our path aligns with both our vision and the needs of
                  our participants.
                </li>
                <li>
                  <strong>Financial Considerations:</strong> All interactions
                  within Phantoms, including purchases, are at your discretion.
                  We urge caution but in saying that every transaction, every
                  interaction is a vote of confidence in what we can achieve
                  together. With the pioneering spirit comes a degree of
                  uncertainty, and we encourage every member of our community to
                  navigate this journey with awareness and thoughtfulness.
                </li>
                <li>
                  <strong>Security Commitment:</strong> Our pledge to security
                  is foundational, permeating every layer of the Phantoms
                  ecosystem. We recognize the challenges inherent in
                  safeguarding a digital community and commit to relentless
                  vigilance and best practices in security measures. Our journey
                  from experimental to foundational includes a continuous
                  enhancement of our security posture.
                </li>
                <li>
                  <strong>Transparent Evolution:</strong> Transparency is the
                  cornerstone of trust. As Phantoms evolves, so too will our
                  methods, strategies, and technologies. We commit to keeping
                  our community informed and engaged, viewing this journey as a
                  collaborative endeavor that shapes the project's trajectory
                  and ultimate success.
                </li>
              </ul>
              <p>
                By participating in Phantoms, you're not just witnessing
                innovation; you're part of a collective pushing the boundaries
                of blockchain's potential. This project, while beginning with
                exploration, is on a path to defining its course, solidifying
                its impact, and achieving lasting significance. We invite you to
                join us with an open mind and a pioneering spirit, ready to
                contribute to a future where Phantoms stands as a testament to
                the power of community-driven blockchain endeavors.
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
                    The primary intent behind Phantoms is to foster a space for
                    innovation and community growth within digital collectibles
                    and blockchain technology, rather than financial gain.
                  </p>
                  <p className="mt-2 mb-4">
                    All interactions within Phantoms, including purchases and
                    transactions, are at the discretion of participants. As with
                    any pioneering venture, Phantoms involves inherent risks.
                    We're continually developing, embracing an exploratory
                    approach to blockchain application, and we advise all
                    participants to engage with an understanding of this
                    experimental nature.
                  </p>
                  <p className="mt-2 mb-4">
                    Security and platform integrity are paramount to the
                    Phantoms team. We commit to the highest security standards
                    and best practices, yet acknowledge that absolute security
                    in the digital domain cannot be fully guaranteed. Our pledge
                    is to be vigilant, responsive, and proactive in maintaining
                    and enhancing security measures.
                  </p>
                  <p className="mt-2 mb-4">
                    Phantoms is dedicated to transparency, open communication,
                    and adaptability. We keep our community informed about our
                    processes, developments, and any challenges we encounter. As
                    the project evolves, so too will our strategies and
                    practices, enhancing the project's overall security,
                    usability, and value.
                  </p>
                  <p className="mt-2 mb-4">
                    For any questions or concerns, please reach out to us at{" "}
                    <a
                      href="mailto:support@phantomshub.com"
                      className="text-blue-500 hover:underline"
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
