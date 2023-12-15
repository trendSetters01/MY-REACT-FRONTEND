import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import registerImg from "../../images/icons8-register-64.png";
import sendAssetImg from "../../images/icons8-send-64.png";
import mainGameImg from "../../images/icons8-game-64.png";
import optInOutImg from "../../images/icons8-option-64.png";
import destroyAssetImg from "../../images/icons8-delete-64.png";
import phantom from "../../images/icons8-ghost-64.png";
import userAccount from "../../images/icons8-connect-64.png";
import home from "../../images/icons8-exterior-64.png";
import swapImg from "../../images/icons8-swap-64.png";
import mintNFTARC3Img from "../../images/icons8-nft-64.png";
import PeraWalletButton from "../PeraWalletButton";

export default function Menu({ setConnectedAccountAddress, fixed }) {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div
        className="navbar bg-base-100"
        style={{ position: "relative", zIndex: "10000" }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fillRule="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li>
                <Link to="/" className="dropdown-item">
                <img
                    style={{
                      width: "25%",
                      height: "25%",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                    src={home}
                    alt={`Pahntom V2`}
                  /> Homepage
                </Link>
              </li> */}
              <li>
                <details>
                  <summary>Manage Account</summary>
                  <ul>
                    <li>
                      <Link to="/account-info" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={userAccount}
                          alt={`Pahntom V2`}
                        />
                        Account Information
                      </Link>
                    </li>
                    <li>
                      <Link to="/send-asset" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={sendAssetImg}
                          alt={`Send Asset`}
                        />
                        Send Asset
                      </Link>
                    </li>
                    <li>
                      <Link to="/opt-in-out" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={optInOutImg}
                          alt={`Opt-In/Out`}
                        />
                        Opt-In/Out
                      </Link>
                    </li>
                    <li>
                      <Link to="/destroy-asset" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={destroyAssetImg}
                          alt={`Destroy Asset`}
                        />
                        Destroy Asset
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              {/* <li>
                <details>
                  <summary>Mint Nfts</summary>
                  <li>
                    <Link to="/mint-nft-arc3" className="dropdown-item">
                      <img
                        style={{
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mintNFTARC3Img}
                        alt={`mint nft arc3`}
                      />
                      Mint ARC3 NFT
                    </Link>
                  </li>
                  <li>
                    <Link to="/mint-nft-arc69" className="dropdown-item">
                      <img
                        style={{
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mintNFTARC3Img}
                        alt={`mint nft arc3`}
                      />
                      Mint ARC69 NFT
                    </Link>
                  </li>
                </details>
              </li> */}
              {/* <li>
                <Link to="/register-your-address" className="dropdown-item">
                  <img
                    style={{
                      width: "25%",
                      height: "25%",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                    src={registerImg}
                    alt={`Pahntom V2`}
                  />
                  Register Your Address
                </Link>
              </li> */}
              <li>
                <details>
                  <summary>Phantom Services</summary>
                  <li>
                    <Link to="/mint-nft" className="dropdown-item">
                      <img
                        style={{
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mintNFTARC3Img}
                        alt={`mint nft`}
                      />
                      Mint NFT
                    </Link>
                  </li>
                  <li>
                    <Link to="/swap" className="dropdown-item">
                      <img
                        style={{
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={swapImg}
                        alt={`Swap`}
                      />
                      Swap
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards-adventure" className="dropdown-item">
                      <img
                        style={{
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mainGameImg}
                        alt={`main game`}
                      />
                      Test Game
                    </Link>
                  </li>
                </details>
              </li>
              <li>
                <details>
                  <summary>Collections</summary>
                  <ul>
                    <li>
                      <Link to="/phantom-v1" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={`https://ipfs.io/ipfs/bafkreiasgoxgnd33c2emwo6sqd4n6fxbaa2g7vio23e4ot3nvgq4hethia#i`}
                          alt={`Pahntom V1`}
                        />
                        Phantom Pals
                      </Link>
                    </li>
                    <li>
                      <Link to="/phantom-v2" className="dropdown-item">
                        <img
                          style={{
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={`https://ipfs.io/ipfs/bafkreif7xwh37wbwpyzv5id7ijchvs56hdmah25v32hhtu3igyhp257b4e`}
                          alt={`Pahntom V2`}
                        />
                        Phantom V2
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/">
            <img
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                border: "2px solid white",
                borderRadius: "10px",
              }}
              src={phantom}
              alt={`Pahntom`}
            />
          </Link>
        </div>
        {/* Twitter */}
        <div className="navbar-end gap-4">
          {/* <button className="btn btn-ghost btn-circle">
            <a
              href="https://twitter.com/PhantomV201"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fillRule="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </button> */}
          {/* <button className="btn btn-ghost btn-circle">
            <a
              href="https://twitter.com/PhantomPaals"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fillRule="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </button> */}
          {/* <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fillRule="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button> */}
          {/* <button className="btn btn-ghost btn-circle">
            <a
              href="https://discord.com/channels/926928752347328593/1164845610579529759"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              <svg
                className="h-5 w-5"
                fillRule="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
              </svg>
            </a>
          </button> */}

          <button className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </button>
          <button>
            <PeraWalletButton onConnect={setConnectedAccountAddress} />
          </button>
        </div>
      </div>
    </>
  );
}
