import { useState, useEffect } from "react";
import "./calendar.scss";

type Holiday = {
    name: string;
    start: Date;
    end: Date;
};

type Props = {
    month: number;
    year: number;
    holidays: Holiday[];
};

const Calendar = ({ month, year, holidays }: Props) => {
    const [days, setDays] = useState<Date[]>([]);

    useEffect(() => {
        const date = new Date(year, month - 1, 1);
        const firstDayOfWeek = date.getDay();
        const lastDayOfMonth = new Date(year, month, 0).getDate();

        const prevMonthDays = Array.from(
            { length: firstDayOfWeek },
            (_, i) => new Date(year, month - 1, 1 - firstDayOfWeek + i)
        );
        const thisMonthDays = Array.from(
            { length: lastDayOfMonth },
            (_, i) => new Date(year, month - 1, i + 1)
        );
        const nextMonthDays = Array.from(
            { length: 6 * 7 - (prevMonthDays.length + thisMonthDays.length) },
            (_, i) => new Date(year, month, i + 1)
        );

        setDays([...prevMonthDays, ...thisMonthDays, ...nextMonthDays]);
    }, [month, year]);

    const getHolidayColor = (date: Date) => {
        const holiday = holidays.find(h => date >= h.start && date <= h.end);
        return holiday ? "blue" : "black";
    };

    const handleDayClick = (date: Date) => {
        console.log(`Clicked on ${date.toLocaleDateString()}`);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header"></div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5].map(weekIndex => (
                        <tr key={weekIndex}>
                            {days
                                .slice(weekIndex * 7, weekIndex * 7 + 7)
                                .map((date, dayIndex) => (
                                    <td
                                        key={weekIndex * 7 + dayIndex}
                                        style={{ color: getHolidayColor(date) }}
                                        onClick={() => handleDayClick(date)}
                                    >
                                        {date.getDate()}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
