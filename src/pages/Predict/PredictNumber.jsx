import { calculatePronostics } from "./calculatePronostics";
import '../../css/PredictNumber.css'
import { useSelector } from "react-redux";

export function PredictNumber() {
    const { game } = useSelector((state) => state.datas);
    const bestNumbers = calculatePronostics();

    return (
        <div className="show-result">
            <div className="number-result">
                {
                    bestNumbers[0].map((number) => {
                        return <div className={`ball ${game === 'euromillions' ? 'euromillions' : 'loto'}`} key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                    })
                }
            </div>

            <div className="bonus-result">
                {
                    bestNumbers[1].map((number) => {
                        return <div className={`${game === 'euromillions' ? 'euromillions-bonus' : 'ball loto-bonus'}`} key={`${number[0]}-${number[1]}`}>{number[0]}</div>
                    })
                }
            </div>

        </div>

    )
}