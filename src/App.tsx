import "./App.css";

const isWebview = (userAgent: string) => {
  return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
};

function App() {
  if (isWebview(window.navigator.userAgent)) {
    return <h1>WebView!</h1>;
  }

  return <h1>Browser:*</h1>;
}

export default App;
