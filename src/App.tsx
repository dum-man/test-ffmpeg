/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./App.css";

const isWebview = (userAgent: string) => {
  return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
};

// function isMobileSafari() {
//   const ua = navigator.userAgent;
//   const isWebkit = /WebKit/.test(ua);
//   const isChrome = /CriOS/.test(ua); // Chrome on iOS
//   const isFirefox = /FxiOS/.test(ua); // Firefox on iOS

//   return isWebkit && !isChrome && !isFirefox;
// }

// function hasWebViewRestrictions() {
//   let isBlocked = false;
//   try {
//     const newWin = window.open("", "_blank");
//     if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
//       isBlocked = true;
//     } else {
//       newWin.close();
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
//   } catch (e: any) {
//     isBlocked = true;
//   }

//   return isBlocked;
// }

const hasMissingFeatures = () => {
  const missingFeatures = [];

  if (typeof window.open !== "function") missingFeatures.push("window.open");
  if (!window.localStorage) missingFeatures.push("localStorage");
  if (!window.history || !history.pushState) missingFeatures.push("History API");

  if (missingFeatures.length) {
    return true;
  }

  return false;
};

function App() {
  if (isWebview(window.navigator.userAgent) || hasMissingFeatures()) {
    return <h1>WebView!!!</h1>;
  }

  // if (isMobileSafari()) {
  //   return (
  //     <div>
  //       <h1>Mobile Safari IOS</h1>
  //       <p>{window.navigator.userAgent}</p>
  //     </div>
  //   );
  // }

  return <p>{window.navigator.userAgent}</p>;
}

export default App;
