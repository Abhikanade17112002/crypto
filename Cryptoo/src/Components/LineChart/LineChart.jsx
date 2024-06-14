import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
const LineChart = ({historicaldata}) => {
      const [ data , setData] = useState([["date","prices"]]) ;
      useEffect(()=>{
            let dataCopy = [["date","prices"]] ;
       if(historicaldata?.prices)
      {
           historicaldata?.prices?.map((item)=>{
            dataCopy?.push([`${new Date(item[0])?.toLocaleDateString()?.slice(0,-5)}`,Number(item[1])])
           })
           setData(dataCopy);
      }
      
      },[historicaldata])
  return (
      <Chart  chartType='LineChart' data={data} height={"100%"} width={"100%"} ></Chart>
  )
}

export default LineChart