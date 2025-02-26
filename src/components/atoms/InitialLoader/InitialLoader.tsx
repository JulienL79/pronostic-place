import { useEffect, useState } from 'react';
import './InitialLoader.css'
import { useDataStore } from '@store/useDataStore';

export const InitialLoader = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }, []);

    return (
        <div className={`initial-loader ${visible ? "show" : "hide"}`}>
            <div>
                <p>Pronostic Place</p>
                <figure className="sphere"><span className="shadow"></span></figure>
            </div>
        </div>
    );
};
