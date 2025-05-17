import "./App.css";

const isWebview = (userAgent: string) => {
  return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
};

function isMobileSafari() {
  const ua = navigator.userAgent || "";
  const isWebkit = /WebKit/.test(ua);
  const isChrome = /CriOS/.test(ua); // Chrome on iOS
  const isFirefox = /FxiOS/.test(ua); // Firefox on iOS

  return isWebkit && !isChrome && !isFirefox;
}

function App() {
  if (isWebview(window.navigator.userAgent)) {
    return <h1>WebView!</h1>;
  }

  if (isMobileSafari()) {
    return <h1>Mobile Safari IOS</h1>;
  }

  return <p>{window.navigator.userAgent}</p>;
}

export default App;
