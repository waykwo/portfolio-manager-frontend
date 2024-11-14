import { Header } from "./Header";
import { PortfolioPage } from "./PortfolioPage";
import { Footer } from "./Footer";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

function App() {
  let unauthenticatedComponents;
  if (localStorage.jwt === undefined) {
    unauthenticatedComponents = (
      <>
        <LoginPage />
        <SignupPage />
      </>
    )
  }

  return (
    <div>
      <div className="container mx-auto p-6 flex-auto bg-sky-50" >
        <Header />
      </div>
      <div className="container mx-auto p-6 flex-auto bg-sky-50 border-y-4 border-slate-300">
        {unauthenticatedComponents}
        <PortfolioPage />
      </div>
      <div className="container mx-auto p-6 flex-auto bg-sky-50" >
        <Footer />
      </div>
    </div>
  )
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
