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
                  <summary style={{ fontWeight: "bold" }}>
                    Manage Account
                  </summary>
                  <ul>
                    <li className="m-1">
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
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>
                    Phantoms Services
                  </summary>
                  <li className="m-1">
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
                  </li>
                  <li className="m-1">
                    <Link to="/onramp-swap" className="dropdown-item">
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
                      Onramp / Swap
                    </Link>
                  </li>
                </details>
              </li>
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Play to Win</summary>
                  <li className="m-1">
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
                  </li>
                  <li className="m-1">
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
                  </li>
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
                  <summary style={{ fontWeight: "bold" }}>
                    Token Activities
                  </summary>
                  <li className="m-1">
                    <Link to="/token-info" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "50px",
                        }}
                        src={tokenInfoImg}
                        alt={`token`}
                      />
                      Token Information
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link to="/trade-phntm" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        src={vestigeImg}
                        alt={`vestige`}
                      />
                      Trade on Vestige
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link to="/tinyman-lp-deposits" className="dropdown-item">
                      <svg
                        class="tinyman-header-icon"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_3459_4714)">
                          <path
                            d="M0 7.62283C0 4.95459 0 3.62047 0.519274 2.60134C0.976041 1.70488 1.70488 0.976041 2.60134 0.519274C3.62047 0 4.95459 0 7.62283 0H24.3772C27.0454 0 28.3795 0 29.3987 0.519274C30.2951 0.976041 31.024 1.70488 31.4807 2.60134C32 3.62047 32 4.95459 32 7.62283V24.3772C32 27.0454 32 28.3795 31.4807 29.3987C31.024 30.2951 30.2951 31.024 29.3987 31.4807C28.3795 32 27.0454 32 24.3772 32H7.62283C4.95459 32 3.62047 32 2.60134 31.4807C1.70488 31.024 0.976041 30.2951 0.519274 29.3987C0 28.3795 0 27.0454 0 24.3772V7.62283Z"
                            fill="#F2FE67"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.1557 -17.2917C17.2453 -18.2204 19.6804 -17.1463 20.4035 -14.977L22.3734 -9.06717C23.6519 -7.95687 24.3895 -6.34472 24.3895 -4.6458V9.99676C24.3895 11.3128 23.3226 12.3797 22.0066 12.3797C21.9676 12.3797 21.9289 12.3787 21.8904 12.3769V18.6838C21.8904 19.6415 22.5771 20.4614 23.52 20.6293L24.39 20.7842C25.3985 20.9638 26.1331 21.8407 26.1331 22.8652C26.1331 23.1151 26.0889 23.3583 26.0064 23.5847C26.0134 23.6272 26.0169 23.67 26.0169 23.713C26.0169 25.2858 21.3071 26.5608 15.4972 26.5608C9.68736 26.5608 4.97754 25.2858 4.97754 23.713C4.97754 22.3834 8.34287 21.2667 12.8932 20.953L12.9941 7.39254C11.808 6.23682 11.0914 4.60445 11.1513 2.81293L11.4678 -6.64732C11.4858 -7.18541 11.6899 -7.70059 12.0453 -8.10501L13.0738 -9.27529C13.1249 -9.33352 13.1507 -9.4098 13.1452 -9.48713L12.865 -13.4809C12.7509 -15.1066 13.6665 -16.6298 15.1557 -17.2917ZM16.6015 11.86V22.242C16.4275 22.274 16.2329 22.2887 16.0211 22.2864C15.6107 22.2819 15.1838 22.2144 14.8073 22.1291C14.5207 22.0641 14.282 21.7802 14.285 21.3767L14.3603 11.2488C14.8422 11.4751 15.9383 11.8258 16.6015 11.86ZM19.6237 12.2053C19.6237 12.78 19.9864 13.2701 20.4955 13.4589V18.6838C20.4955 20.3175 21.667 21.7161 23.2754 22.0025L24.1454 22.1575C24.4884 22.2185 24.7382 22.5168 24.7382 22.8652C24.7382 23.2076 24.5055 23.4746 24.2039 23.5248C22.7469 23.7675 20.2199 24.0807 18.2686 23.7853C18.1396 23.7657 17.9963 23.6369 17.9963 23.4094V8.47074C17.9963 8.06168 17.6647 7.73009 17.2557 7.73009C14.591 7.73009 12.4563 5.52273 12.5454 2.85957L12.8619 -6.60068C12.8691 -6.81609 12.9508 -7.02233 13.0931 -7.18423L14.1215 -8.35451C14.4187 -8.69268 14.5682 -9.1357 14.5367 -9.58478L14.2564 -13.5786C14.1834 -14.6188 14.7693 -15.5935 15.7222 -16.017C17.0593 -16.6113 18.6175 -15.924 19.0802 -14.5359L21.1019 -8.47088C21.1505 -8.32507 21.2394 -8.19602 21.3584 -8.0987C22.394 -7.25136 22.9946 -5.98391 22.9946 -4.6458V9.99676C22.9946 10.5424 22.5523 10.9848 22.0066 10.9848C21.4609 10.9848 21.0186 10.5424 21.0186 9.99676V-3.54514H19.6237V9.99676L19.6237 10.0065V12.2053Z"
                            fill="black"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.592 11.8604V22.2424C16.418 22.2743 16.2234 22.289 16.0115 22.2867C15.6012 22.2823 15.1743 22.2148 14.7978 22.1294C14.5112 22.0645 14.2725 21.7805 14.2755 21.3771L14.3508 11.2492C14.8327 11.4754 15.9288 11.8261 16.592 11.8604ZM19.6142 12.2056C19.6142 12.7804 19.9769 13.2704 20.486 13.4593V18.6842C20.486 20.3179 21.6575 21.7164 23.2659 22.0029L24.1359 22.1578C24.4789 22.2189 24.7287 22.5171 24.7287 22.8655C24.7287 23.208 24.496 23.4749 24.1944 23.5252C22.7374 23.7678 20.2104 24.0811 18.2591 23.7856C18.1301 23.7661 17.9868 23.6373 17.9868 23.4098V8.4711C17.9868 8.06204 17.6552 7.73045 17.2462 7.73045C14.5815 7.73045 12.4468 5.52308 12.5359 2.85993L12.8524 -6.60032C12.8596 -6.81573 12.9413 -7.02197 13.0836 -7.18387L14.112 -8.35416C14.4092 -8.69232 14.5587 -9.13534 14.5272 -9.58442L14.2469 -13.5782C14.1739 -14.6185 14.7598 -15.5931 15.7127 -16.0167C17.0498 -16.6109 18.608 -15.9236 19.0707 -14.5355L21.0924 -8.47052C21.141 -8.32471 21.2299 -8.19566 21.3489 -8.09834C22.3845 -7.251 22.9851 -5.98355 22.9851 -4.64544V9.99711C22.9851 10.5428 22.5428 10.9851 21.9971 10.9851C21.4514 10.9851 21.0091 10.5428 21.0091 9.99711V-3.54478H19.6142V9.99711L19.6142 10.0069V12.2056Z"
                            fill="#F2FE67"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_3459_4714">
                            <rect width="32" height="32" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      Tinyman LP Deposits
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link to="/phntm-staking" className="dropdown-item">
                      <img
                        style={{
                          backgroundColor: "white",
                          width: "25%",
                          height: "25%",
                          border: "2px solid white",
                          borderRadius: "50px",
                        }}
                        src={stakingimg}
                        alt={`token`}
                      />
                      Stake PHNTM on Cometa Hub
                    </Link>
                  </li>
                </details>
              </li>
              <li>
                <details>
                  <summary style={{ fontWeight: "bold" }}>Collections</summary>
                  <ul>
                    <li className="m-1">
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
                    <li className="m-1">
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
                    </li>
                  </ul>
                </details>
              </li>
              <li>
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
          <button>
            <PeraWalletButton onConnect={setConnectedAccountAddress} />
          </button>
        </div>
      </div>
    </>
  );
}
