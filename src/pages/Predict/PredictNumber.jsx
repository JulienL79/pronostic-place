import { calculatePronostics } from "./calculatePronostics";
import '../../css/PredictNumber.css'

export function PredictNumber() {
    const bestNumbers = calculatePronostics();

    return (
        <div className="show-result">
            <div className="number-result">
                {
                    bestNumbers[0].map((number) => {
                        return <div className="ball" key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                    })
                }
            </div>

            <div className="bonus-result">
                {
                    bestNumbers[1].map((number) => {
                        return <div className="star" key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                    })
                }
            </div>

        </div>

    )
}