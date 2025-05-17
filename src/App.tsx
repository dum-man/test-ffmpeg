import Bowser from "bowser";

import "./App.css";

const browser = Bowser.getParser(window.navigator.userAgent);
const isWebView =
  browser.getPlatformType() === "mobile" && browser.getBrowserName() === "WebView";

function App() {
  if (isWebView) {
    return <h1>isWebView</h1>;
  }

  return (
    <ul style={{ listStyleType: "decimal" }}>
      <li>
        <h3>getBrowser:</h3>
        <p>{JSON.stringify(browser.getBrowser())}</p>
      </li>
      <li>
        <h3>BrowserName:</h3>
        <p>{browser.getBrowserName()}</p>
      </li>
      <li>
        <h3>getBrowserVersion:</h3>
        <p>{JSON.stringify(browser.getBrowserVersion())}</p>
      </li>
      <li>
        <h3>getEngine:</h3>
        <p>{JSON.stringify(browser.getEngine())}</p>
      </li>
      <li>
        <h3>getEngineName:</h3>
        <p>{browser.getEngineName()}</p>
      </li>
      <li>
        <h3>getOS:</h3>
        <p>{JSON.stringify(browser.getOS())}</p>
      </li>
      <li>
        <h3>getOSName:</h3>
        <p>{browser.getOSName()}</p>
      </li>
      <li>
        <h3>getOSVersion:</h3>
        <p>{browser.getOSVersion()}</p>
      </li>
      <li>
        <h3>getPlatform:</h3>
        <p>{JSON.stringify(browser.getPlatform())}</p>
      </li>
      <li>
        <h3>getPlatformType:</h3>
        <p>{browser.getPlatformType()}</p>
      </li>
      <li>
        <h3>getResult:</h3>
        <p>{JSON.stringify(browser.getResult())}</p>
      </li>
      <li>
        <h3>getUA:</h3>
        <p>{browser.getUA()}</p>
      </li>
      <li>
        <h3>isBrowser === WebView:</h3>
        <p>{browser.isBrowser("WebView") ? "WebView" : "notWebView"}</p>
      </li>
      <li>
        <h3>parse:</h3>
        <p>{JSON.stringify(browser.parse())}</p>
      </li>
      <li>
        <h3>parsePlatform:</h3>
        <p>{JSON.stringify(browser.parsePlatform())}</p>
      </li>
      <li>
        <h3>parseEngine:</h3>
        <p>{JSON.stringify(browser.parseEngine())}</p>
      </li>
      <li>
        <h3>parseOS:</h3>
        <p>{JSON.stringify(browser.parseOS())}</p>
      </li>
    </ul>
  );
}

export default App;
