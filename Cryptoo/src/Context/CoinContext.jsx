import  {  createContext, useEffect, useState } from 'react'

export const CoinContext = createContext() ;
const CoinContextProvider = ({children}) => {

      const [ allCoinsData , setAllCoinsData ] = useState([]) ;
      const [ currencyType , setCurrencyType ] = useState({
            name:"usd" ,
            symbol:"$"
      })


      const contextData = {
            allCoinsData , currencyType , setCurrencyType
      } ;

useEffect(()=>{
      const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-EffMEBBDW3KUzfV7M85xH5Up'}
            
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyType.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoinsData(response))
            .catch(err => console.error(err));
},[currencyType])

  return (
    <CoinContext.Provider value={contextData}>
     {
      children
     }
    </CoinContext.Provider>
  )
}

export default CoinContextProvider ;