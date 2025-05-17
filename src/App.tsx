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

function isInAppWebView() {
  // Method 1: Check for specific user agent patterns
  const userAgent = navigator.userAgent.toLowerCase();

  // Look for common WebView indicators
  const androidWebViewIndicators = [
    "wv", // Android WebView
    "android.webkit", // Another Android WebView indicator
    "; wv)",
  ];

  // For Android, check for specific WebView identifiers
  if (userAgent.includes("android")) {
    for (const indicator of androidWebViewIndicators) {
      if (userAgent.includes(indicator)) {
        return true;
      }
    }

    // If it has Android but not Chrome, likely a WebView
    if (!userAgent.includes("chrome")) {
      return true;
    }
  }

  // For iOS, check if it has Apple's OS identifiers but lacks Safari or includes 'wkwebview'
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  ) {
    // If not containing 'safari/' or containing 'wkwebview', likely a WebView
    if (
      !userAgent.includes("safari/") ||
      userAgent.includes("crios/") ||
      userAgent.includes("fxios/") ||
      userAgent.includes("wkwebview")
    ) {
      return true;
    }
  }

  // Method 2: Check for absence of common browser features
  if (
    window.browser === undefined &&
    typeof window.openDatabase !== "undefined" &&
    navigator.standalone === undefined
  ) {
    return true;
  }

  // Method 3: Check for WebView bridge or custom schemes
  try {
    // iOS WKWebView detection
    if (window.webkit && window.webkit.messageHandlers) {
      return true;
    }

    // Android JavaScript interface detection
    if (window.Android || window.JSBridge || window.WebViewJavascriptBridge) {
      return true;
    }
  } catch (e) {
    // Access to these properties might be restricted
    console.log("Error checking for WebView bridges:", e);
  }

  // If none of the above conditions match, probably not in a WebView
  return false;
}

function App() {
  if (isInAppWebView()) {
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
