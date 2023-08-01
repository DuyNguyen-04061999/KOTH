import React from 'react'
import useWindowDimensions from '../../utils/useWindowDimensions';
import { images280423_l } from '../../utils/images280423_l';
import { color } from '../../utils/colors';
import { formatMoney } from '../../utils/helper';

export default function Gold(props) {
    const { value } = props;
    const { width } = useWindowDimensions()
    return (
        <div
            className="d-flex flex-column justify-content-between align-items-center"
            style={{
                padding: "0px 10px",
            }}
            >
            {width > 576 && (
                <div
                style={{
                    fontSize: "13px",
                    color: "#857cab",
                    fontWeight: "700",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <img
                    src={images280423_l.gold}
                    alt="..."
                    width={10}
                    height={10}
                    style={{ marginRight: "5px" }}
                />
                <span>Doge Gold</span>
                </div>
            )}
            <div className="d-flex">
                <p
                style={{
                    color: color.textWhite,
                    fontSize: "13px",
                }}
                >
                {value &&
                    Number.parseFloat(value) > 0 &&
                    formatMoney(Number.parseFloat(value))}
                </p>
            </div>
            </div>
    )
}
