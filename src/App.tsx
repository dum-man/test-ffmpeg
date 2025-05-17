/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./App.css";

// const isWebview = (userAgent: string) => {
//   return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
// };

// function isMobileSafari() {
//   const ua = navigator.userAgent;
//   const isWebkit = /WebKit/.test(ua);
//   const isChrome = /CriOS/.test(ua); // Chrome on iOS
//   const isFirefox = /FxiOS/.test(ua); // Firefox on iOS

//   return isWebkit && !isChrome && !isFirefox;
// }

function App() {
  function isInWebView() {
    const userAgent = navigator.userAgent;
    const hasWebViewUA =
      /WebView|(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent) ||
      /wv/.test(userAgent);
    const hasWebViewProps =
      //@ts-ignore
      window.ReactNativeWebView || window.webkit?.messageHandlers || window.__WV;
    //@ts-ignore
    const missingBrowserFeatures = !navigator.standalone || !window.matchMedia;
    return hasWebViewUA || hasWebViewProps || missingBrowserFeatures;
  }

  if (isInWebView()) {
    return <h1>WebView!</h1>;
  }

  // if (isWebview(window.navigator.userAgent)) {
  //   return <h1>WebView!</h1>;
  // }

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
