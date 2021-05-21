import React, { useState, useEffect} from 'react';
import { json, geoEqualEarth, geoPath } from 'd3';
import { feature } from 'topojson'

const jsonUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  const width = 960;
  const height = 500;

  const projection = geoEqualEarth()
    .scale(160)
    .translate([800/2 , 450/2])

  useEffect(() => {
    json(jsonUrl).then(topojsonData => {
      setData(feature(topojsonData, topojsonData.objects.countries).features);
      

    })



  }, [])


  return (
    <svg width={width} height={height}>
      <g className="marks">
        { data.map((d, i) => (
         <path 
         key = {`path-${i}`}
         d={ geoPath().projection(projection)(d) }

        
        />
        ))
}
      </g>
    </svg>
  );
}

export default App;
