import React from "react";
import "./App.css";

function App() {
  const downloadAPK = () => {
    // Trigger the download by pointing to the APK file in the public directory
    window.location.href = "/jmb.apk";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Download APK</h1>
        <p>Click the button below to download the APK file:</p>
        <button onClick={downloadAPK} style={styles.button}>
          Download APK
        </button>
      </header>
    </div>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default App;
