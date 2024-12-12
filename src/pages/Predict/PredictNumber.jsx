import { calculatePronostics } from "./calculatePronostics";

export function PredictNumber() {
    const bestNumbers = calculatePronostics();

    return (
        <>
            {
                bestNumbers[0].map((number) => {
                    return <div className="ball" key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                })
            }
            {
                bestNumbers[1].map((number) => {
                    return <div className="bonus" key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                })
            }
        </>

    )
}