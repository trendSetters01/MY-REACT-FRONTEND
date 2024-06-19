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
import vestigeImg from "../../images/vestigeImg.webp";
import tokenInfoImg from "../../images/icons8-token-64.png";
import tinymanimg from "../../images/Tinyman_Logo_White.png";
import stakingimg from "../../images/logo.6aa1220768f78fbc9ba5.png";
import PeraWalletButton from "../PeraWalletButton";
import { useLocation } from "react-router-dom";

export default function Menu({ setConnectedAccountAddress, fixed }) {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div
        className="navbar bg-black gap-12 text-white shadow-lg"
        style={{
          position: "relative",
          zIndex: "10000",
          fontFamily: "Tw Cen MT",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              {/* hamburger icon */}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
            >
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Overview</summary>
                  <ul>
                    <li className="m-1">
                      <Link to="/dashboard" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={userAccount}
                          alt={`Pahntom V2`}
                        />
                        Dashboard
                      </Link>
                    </li>
                    {/* <li className="m-1">
                      <Link to="/account-info" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
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
                    <li className="m-1">
                      <Link to="/send-asset" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
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
                    <li className="m-1">
                      <Link to="/opt-in-out" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
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
                    <li className="m-1">
                      <Link to="/destroy-asset" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
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
                    </li> */}
                  </ul>
                </details>
              </li> 
              {/* <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>NFT Raffles</summary>
                  <ul>
                    <li className="m-1">
                      <Link to="/raffle" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={userAccount}
                          alt={`Pahntom V2`}
                        />
                        Phantom Pals Raffle
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>  */}
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>
                    Phantoms Services
                  </summary>
                  {/* <li className="m-1">
                    <Link to="/mint-nft" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
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
                  </li> */}
                  <li className="m-1">
                    <Link to="/onramp" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={swapImg}
                        alt={`Swap`}
                      />
                      Crypto On Ramp
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link to="/swap" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={swapImg}
                        alt={`Swap`}
                      />
                      Swap ASA
                    </Link>
                  </li>
                </details>
              </li>
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Play to Win</summary>
                  {/* <li className="m-1">
                    <Link to="/cards-rpg" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mainGameImg}
                        alt={`main game`}
                      />
                      Cards RPG
                    </Link>
                  </li> */}
                  {/* <li className="m-1">
                    <Link to="/phantoms-21" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mainGameImg}
                        alt={`main game`}
                      />
                      Phantoms 21
                    </Link>
                  </li> */}
                  <li className="m-1">
                    <Link to="/spin-the-wheel" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={mainGameImg}
                        alt={`main game`}
                      />
                      Spin the Wheel
                    </Link>
                  </li>
                </details>
              </li>
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Collections</summary>
                  <ul>
                    <li className="m-2">
                      <Link to="/phantom-v1" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
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
                    {/* <li className="m-1">
                      <Link to="/phantom-v2" className="dropdown-item">
                        <img
                          style={{
                            backgroundColor: "white",
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={`https://ipfs.io/ipfs/bafkreif7xwh37wbwpyzv5id7ijchvs56hdmah25v32hhtu3igyhp257b4e`}
                          alt={`Pahntom V2`}
                        />
                        Phantom Pals V2
                      </Link>
                    </li> */}
                  </ul>
                </details>
              </li>
              {/* <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Coming Soon</summary>
                  <ul>
                    <li className="m-1">
                      <Link
                        to="/bruce-lee-nft-polygon"
                        className="dropdown-item"
                      >
                        <img
                          style={{
                            backgroundColor: "white",
                            width: "25%",
                            height: "25%",
                            border: "2px solid white",
                            borderRadius: "10px",
                          }}
                          src={
                            "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/09a9f8ffeacf6c1b33c49ef39d7ec601"
                          }
                          alt={`Coming Soon`}
                        />
                        Byte City NFTs
                      </Link>
                    </li>
                  </ul>
                </details>
              </li> */}
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
              }}
              src={phantom}
              alt={`Pahntom`}
            />
          </Link>
        </div>
        {/* Twitter */}
        <div className="navbar-end gap-3">
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
          <button className="btn btn-ghost btn-circle">
            <a
              target="_blank"
              href="https://phantompals.medium.com"
              class="group"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z"></path>
                  <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </span>
              <span>Blog</span>
            </a>
          </button>

          {/* theme changer below  */}
          {/* <button className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </button> */}
          {location.pathname !== "/swap" ? (
            <PeraWalletButton onConnect={setConnectedAccountAddress} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
