import { nanoid } from "nanoid";
import { SelectedMonthContext } from "../../context/SelectedMonth";
import { useContext } from "react";
import SCSS from "./monthBtns.module.scss";

export const MonthBtns = () => {
    const { month, updateMonth } = useContext(SelectedMonthContext);
    const months = [];

    function handleClick(month: number) {
        updateMonth(month);
    }
    return (
        <div className={SCSS.btnBar}>
            {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ].map((month, i) => {
                return (
                    <button
                        key={nanoid()}
                        onClick={() => {
                            handleClick(i);
                        }}
                    >
                        {month}
                    </button>
                );
            })}
        </div>
    );
};