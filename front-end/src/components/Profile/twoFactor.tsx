import { useState } from "react"


const twoFactor = () => {
    const [TwoFactor, setTwoFactor] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTwoFactor(event.target.value);
      };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Need To Send A Request To The Backend Server
    };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
            Enter The Code That You Have Received In Your Email:
            <input type="text" value={TwoFactor} onChange={handleChange} />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  )
}

export default twoFactor
