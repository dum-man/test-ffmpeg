import Bowser from "bowser";

import "./App.css";

const browser = Bowser.getParser(window.navigator.userAgent);
const isWebView =
  browser.getPlatformType() === "mobile" && browser.getBrowserName() === "WebView";

function App() {
  if (isWebView) {
    return <h1>isWebView</h1>;
  }

  return <h1>Browser</h1>;
}

export default App;
