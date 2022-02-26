import React from "react"
import { Context } from "./context"
import { states } from "./states";



const StateWise = () => {



  const [overall] = React.useState(React.useContext(Context))
  const statewise = []
  Object.keys(overall).map(ele =>

    statewise.push({
      state: states[ele] ? states[ele] : ele,

      confirmed: overall[ele]['total']['confirmed'],
      recovered: overall[ele]['total']['recovered'],
      deceased: overall[ele]['total']['deceased'],
      tested: overall[ele]['total']['tested'],
      active: function () {
        return (this.confirmed - (this.recovered + this.deceased))
      },
      recoveryrate: function () {
        return ((this.recovered / this.confirmed) * 100).toFixed(2)
      },
      activerate: function () {
        return ((this.deceased / this.confirmed) * 100).toFixed(2)
      }
    })
  )
  statewise.sort((a, b) => b.confirmed - a.confirmed)

  const rows = statewise.map(ele =>
    <tr key={ele.state}>
      <td>{ele.state}</td>
      <td className="number">{ele.confirmed}</td>
      <td className="number"><span className="active">↑{ele.activerate()}</span><br />{ele.active()}</td>
      <td className="number"><span className="recovery">↑{ele.recoveryrate()}</span><br />{ele.recovered}</td>
      <td className="number">{ele.deceased}</td>
      <td className="number">{ele.tested}</td>
    </tr>
  )


  return (
    <table>
      <thead>
        <tr>
          <th>State/UT</th>
          <th>Confirmed</th>
          <th>Active</th>
          <th>Recovered</th>
          <th>Deceased</th>
          <th>Tested</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default StateWise


/**
 *   "AN": {
    "delta": {
      "tested": 1376,
      "vaccinated1": 3,
      "vaccinated2": 13
    },
    "delta21_14": {
      "confirmed": 9
    },
    "delta7": {
      "confirmed": 3,
      "recovered": 5,
      "tested": 8936,
      "vaccinated1": 884,
      "vaccinated2": 10640
    },
    "districts": {
      "Nicobars": {
        "delta7": {
          "vaccinated1": 62,
          "vaccinated2": 811
        },
        "meta": {
          "population": 36842
        },
        "total": {
          "vaccinated1": 25394,
          "vaccinated2": 20313
        }
      },
      "North and Middle Andaman": {
        "delta": {
          "vaccinated2": 8
        },
        "delta7": {
          "vaccinated1": 90,
          "vaccinated2": 1839
        },
        "meta": {
          "population": 105597
        },
        "total": {
          "vaccinated1": 78945,
          "vaccinated2": 59522
        }
      },
      "South Andaman": {
        "delta": {
          "vaccinated1": 3,
          "vaccinated2": 28
        },
        "delta7": {
          "vaccinated1": 732,
          "vaccinated2": 8012
        },
        "meta": {
          "population": 238142
        },
        "total": {
          "vaccinated1": 189662,
          "vaccinated2": 120322
        }
      },
      "Unknown": {
        "delta21_14": {
          "confirmed": 9
        },
        "delta7": {
          "confirmed": 3,
          "recovered": 5
        },
        "total": {
          "confirmed": 7651,
          "deceased": 129,
          "recovered": 7518
        }
      }
    },
    "meta": {
      "date": "2021-10-31",
      "last_updated": "2021-11-01T11:03:10+05:30",
      "population": 397000,
      "tested": {
        "date": "2021-10-31",
        "source": "https://dhs.andaman.gov.in/NewEvents/851.pdf"
      },
      "vaccinated": {
        "date": "2021-10-31"
      }
    },
 */