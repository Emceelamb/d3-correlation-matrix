import { useState, useEffect } from "react";
import { csv } from "d3";

const row = (d:any) => {
  d["SYMBOL"] = d["SYMBOL"].split('_')[0].toUpperCase()
  for (const sym in d){
    if (sym === "SYMBOL"){
      continue
    }
    d[sym] = +d[sym]
  }
  return d
}
const useData = (csvUrl: string ) => {
  const [data, setData] = useState<Object[]>();

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, [csvUrl]);

  return data;
};

export { useData };
