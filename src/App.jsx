let UC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let LC = 'abcdefghijklmnopqrstuvwxyz';
let NO = "0123456789";
let SY = "!@#$%^&*().";

import { RxCopy } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdCheckmark } from "react-icons/io";
import { useEffect, useState } from 'react';

const App = () => {

  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [passlen, setPasslen] = useState(10);
  const [fPass, setFpass] = useState("");
  const [icon, setIcon] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClick = () => {
    let charSet = "";
    let finalPass = "";
    if (passlen == "") {
      toast.warn("Please enter password length...");
    }
    else if (uppercase || lowercase || number || symbol) {
      if (uppercase) { charSet += UC; }
      if (lowercase) { charSet += LC; }
      if (number) { charSet += NO; }
      if (symbol) { charSet += SY; }
      for (var i = 0; i < passlen; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setFpass(finalPass);
    }
    else {
      toast.warn("Please select check box...");
    }
  }

  const handleCopy = async () => {
    if (fPass == "") {
      toast.warn("Password box is empty...");
    }
    else {
      await navigator.clipboard.writeText(fPass);
      setIcon(true);
      toast.success("successfully copied...");
      setTimeout(() => {
        setIcon(false);
      }, 2500);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  return (
    <>
      {loader ? <div className="loader"><img src="/images/loader.gif" alt="" /></div> : ""}
      <ToastContainer />
      <p className="heading">Password Generator</p>
      <div className="main">
        <div className="paragraph">
          <p className="feature">Feature in this Password Generetor :</p>
          <ul>
            <li><u>Password Generation:  </u>&nbsp;
              Allows users to generate a password based on selected criteria (uppercase letter,lowercase letter,numbers and symbols).
            </li>
            <li><u>Password Length control:  </u>&nbsp;User can specify the length of the password.</li>
            <li><u>Password Display:  </u>&nbsp;Displayed the generated password in a box after clicking the Generate Password button.</li>
            <li><u>Copy Password:  </u>&nbsp;Allow users to copy the generated password.</li>
          </ul>
        </div>

        <div className="passgen">
          {/* input box */}
          <div className="p1">
            <input type="text" value={fPass} readOnly />
            <button className="btn1" onClick={handleCopy}>
              {icon ? <IoMdCheckmark /> : <RxCopy />}
            </button>
          </div>

          {/* password length */}
          <div className="p2">
            <label>Password length:</label>
            <input type="number" min={10} max={20} value={passlen} onChange={(event) => setPasslen(event.target.value)} />
          </div>

          {/* uppercase */}
          <div className="p2">
            <label>Include Uppercase</label>
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
          </div>

          {/* lowercase */}
          <div className="p2">
            <label>Include Lowercase</label>
            <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
          </div>

          {/* number */}
          <div className="p2">
            <label>Include Numbers</label>
            <input type="checkbox" checked={number} onChange={() => setNumber(!number)} />
          </div>

          {/* symbols */}
          <div className="p2">
            <label>Include Symbols</label>
            <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)} />
          </div>
          
          {/* button */}
          <div className="genpass">
            <button className="btn2" onClick={handleClick}>Generate Password</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
