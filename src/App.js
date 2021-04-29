import "./App.css";
import web3 from "./web3";
import lottery, { address } from "./lottery";
import { useEffect, useState } from "react";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.getManager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(address);
      setBalance(balance);
      setPlayers(players);
      setManager(manager);
      console.log(manager)
    }
    fetchData();
  }, [ message]);

  const submitFormHandler = async (e) => {
    e.preventDefault(); 

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...")

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether')
    });

    setMessage("You have been entered!")

  }

  const onPickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success")

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    setMessage("A winner has been picked!")
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} players entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </p>

      <hr></hr>

      <form onSubmit={submitFormHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to bid</label>
          <input 
            value={amount}
            onChange={event => setAmount(event.target.value)}
          />
        </div>
        <button>Enter Lottery</button>
      </form>
      
      <hr></hr>

      <h4>Ready to pick a winner?</h4>
      <button onClick={onPickWinner}>Pick a Winner!</button>

      <hr></hr>

      <h1>{message}</h1>
    </div>
  );
};

export default App;
