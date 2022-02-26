import React from "react"
import { states } from "../components/states"


export const FetchTimelineData = () => {
    const [timeline, settimeline] = React.useState()

    const fetchtimelinedata = async () => {
        try {

            const api = await fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
            const data = await (await fetch(api.url)).json();
            settimeline(data);
        } catch (error) {
            console.log(error.message);
        }

    }
    React.useEffect(() => {
        fetchtimelinedata()
    }, [])

    const data = []
    if (timeline) {
        Object.keys(timeline).forEach((ele) => {
            if (ele !== "UN") {
                const name = states[ele] ? states[ele] : ele
                let confirmed = 0
                let recovered = 0
                let deceased = 0
                const date = Object.values(timeline[ele]["dates"]).splice(Object.values(timeline[ele]["dates"]).length - 30, Object.values(timeline[ele]["dates"]).length)
                date.forEach(ele => {
                    const keys = Object.keys(ele['total'])
                    confirmed += keys.includes("confirmed") ? ele["total"]["confirmed"] : 0
                    recovered += keys.includes("recovered") ? ele["total"]["recovered"] : 0
                    deceased += keys.includes("deceased") ? ele["total"]["deceased"] : 0
                });
                data.push({
                    name: name,
                    confirmed: confirmed,
                    active: (confirmed - (recovered + deceased)),
                    recovered: recovered,
                    deceased: deceased,
                });
            }



        });
    }
    /**
     * 0:
    delta:
    confirmed: 1
    tested: 1823
    vaccinated1: 17
    vaccinated2: 59
    [[Prototype]]: Object
    delta7:
    confirmed: 4
    recovered: 11
    tested: 11976
    vaccinated1: 1505
    vaccinated2: 6294
    [[Prototype]]: Object
    total:
    confirmed: 7622
    deceased: 129
    recovered: 7484
    tested: 556135
    vaccinated1: 289999
    vaccinated2: 154338
     */
    return data

}