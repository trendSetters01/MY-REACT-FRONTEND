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
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
          Phantom Pals
        </h1>
        <p
          className="text-xl font-light text-gray-100"
          style={{
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          Join us on an exciting journey!
        </p>
      </header>
      <main>
        <div className="tabs flex justify-center mb-4">
          {[
            "Introduction",
            "Roadmap",
            "Phantom Pals Wallets",
            "Disclaimers",
          ].map((tab) => (
            <button
              style={{
                marginBottom: "2em",
                fontFamily: "Tw Cen MT",
                fontWeight: "bold",
                fontSize: "large",
              }}
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
              Welcome to Phantom Pals!
            </h2>
            <p
              className="dark:text-gray-300"
              style={{
                fontFamily: "Bahnschrift",
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              We're crafting a vibrant, user-driven platform. While we're still
              laying the groundwork, we invite you to stay connected as our
              project evolves!
            </p>
          </section>
        )}

        {activeTab === "Roadmap" && <Roadmap />}

        {activeTab === "Phantom Pals Wallets" && (
          <section className="wallets bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Phantoms (Phantom Pals) Wallets Overview
            </h2>
            <div
              className="dark:text-gray-300"
              style={{
                fontFamily: "Bahnschrift",
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
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
                  <strong>Play to Win Rewards Wallet:</strong>{" "}
                  <a
                    href="https://allo.info/account/JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ"
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
            </div>
          </section>
        )}
        {activeTab === "Disclaimers" && (
          <section className="disclaimers bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Phantoms (Phantom Pals) Disclaimers
            </h2>
            <div
              className="dark:text-gray-300 space-y-4"
              style={{
                fontFamily: "Bahnschrift",
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Vision and Progress
              </h3>
              <p>
                <strong>Phantom Pals</strong> embarks on a pioneering journey
                within the Algorand blockchain ecosystem, dedicated to unlocking
                the potential of blockchain for tangible, real-world
                applications. Our ambition is to cultivate a space where
                innovation meets community, fostering an environment of growth,
                learning, and engagement.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Dynamic Evolution:</strong> Phantom Pals is not
                  static; it is a voyage of discovery and adaptation. While our
                  initial phase might be experimental, our eyes are set on a
                  clear horizon. Feedback from our community is our compass,
                  guiding our project's evolution from experimental to
                  established, ensuring our path aligns with both our vision and
                  the needs of our participants.
                </li>
                <li>
                  <strong>Financial Considerations:</strong> All interactions
                  within Phantom Pals, including purchases, are at your
                  discretion. We urge caution but in saying that every
                  transaction, every interaction is a vote of confidence in what
                  we can achieve together. With the pioneering spirit comes a
                  degree of uncertainty, and we encourage every member of our
                  community to navigate this journey with awareness and
                  thoughtfulness.
                </li>
                <li>
                  <strong>Security Commitment:</strong> Our pledge to security
                  is foundational, permeating every layer of the Phantom Pals
                  ecosystem. We recognize the challenges inherent in
                  safeguarding a digital community and commit to relentless
                  vigilance and best practices in security measures. Our journey
                  from experimental to foundational includes a continuous
                  enhancement of our security posture.
                </li>
                <li>
                  <strong>Transparent Evolution:</strong> Transparency is the
                  cornerstone of trust. As Phantom Pals evolves, so too will our
                  methods, strategies, and technologies.
                </li>
              </ul>
              <p>
                By participating in Phantom Pals, you're not just witnessing
                innovation; you're part of a collective pushing the boundaries
                of blockchain's potential. This project, while beginning with
                exploration, is on a path to defining its course, solidifying
                its impact, and achieving lasting significance. We invite you to
                join us with an open mind and a pioneering spirit, ready to
                contribute to a future where Phantom Pals stands as a testament
                to the power of community-driven blockchain endeavors.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
                onClick={() => setShowModal(!showModal)}
              >
                {showModal ? "Read Less" : "Read More"}
              </button>
              {showModal && (
                <div className="dark:text-gray-300">
                  <p className="mt-2 mb-4">
                    Phantom Pals is dedicated to transparency, open
                    communication, and adaptability. We keep our community
                    informed about our processes, developments, and any
                    challenges we encounter. As the project evolves, so too will
                    our strategies and practices, enhancing the project's
                    overall security, usability, and value.
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
