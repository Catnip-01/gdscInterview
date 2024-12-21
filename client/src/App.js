import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.href = "https://www.youtube.com/watch?v=BT9h5ifR1tY";
  }, []);

  return <div>Redirecting...</div>;
}

export default App;
