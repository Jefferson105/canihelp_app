import React, { useMemo, useReducer, useState, useEffect } from 'react';

import Scroller from '@components/date-picker/scroller';

import { Button, Container, SubTitle } from '@styles/index';
import { MONTHS } from '@constants/date';
import { getArrByNum } from '@utils/index';

interface IProps {
    date?: Date;
    onChange: (date: Date) => void;
}

const reducer = (state, data) => {
    return {
        ...state,
        ...data
    };
};

const DatePicker = ({ date, onChange }: IProps) => {
    const [initialDate] = useState(date || new Date());

    const [state, dispatch] = useReducer(reducer, {
        currentDate: initialDate,
        monthArr: [],
        dayArr: [],
        yearArr: []
    });

    const { currentDate, monthArr, dayArr, yearArr } = state;

    const { day, month, year } = useMemo(
        () => ({
            day: currentDate.getDate(),
            year: currentDate.getFullYear(),
            month: currentDate.getMonth()
        }),
        [currentDate]
    );

    const onChangeDate = (type, i) => {
        let val = i;

        let dateChanged = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );

        switch (type) {
            case 'year':
                dateChanged.setFullYear(val);
                break;
            case 'month':
                const lastDay = dateChanged.getDate();
                const newMonth = MONTHS.map((m) => m.name).indexOf(val);

                const maxDays = MONTHS[newMonth].days;

                if (lastDay > maxDays) dateChanged.setDate(maxDays);

                dateChanged.setMonth(newMonth);
                break;
            case 'day':
                dateChanged.setDate(val);
                break;
        }

        const now = new Date();

        const curYear = now.getFullYear();
        const curMonth = now.getMonth();
        const curDay = now.getDate();

        if (dateChanged < now) dateChanged = now;

        const isYearEqual = curYear === dateChanged.getFullYear();
        const isMonthEqual = curMonth === dateChanged.getMonth();

        const startMonth = isYearEqual ? curMonth : 0;
        const startDay = isYearEqual && isMonthEqual ? curDay : 1;

        dispatch({
            currentDate: dateChanged,
            monthArr: [
                undefined,
                ...MONTHS.slice(startMonth, MONTHS.length).map((m) => m.name),
                undefined
            ],
            dayArr: [
                undefined,
                ...getArrByNum(startDay, MONTHS[dateChanged.getMonth()].days),
                undefined
            ],
            yearArr: [undefined, curYear, curYear + 1, curYear + 2, undefined]
        });

        //onChange(currentDate.current);
    };

    useEffect(() => {
        onChangeDate('nda', 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            color="rgba(0,0,0,.7)"
            align="center"
            justify="center"
            height="100%"
        >
            <Container color="#fff" pad="20px" align="flex-end">
                <SubTitle>Escolha uma data</SubTitle>
                <Container
                    width="200px"
                    justify="space-between"
                    dir="row"
                    height="150px"
                    marg="20px 0 0 0"
                >
                    <Scroller
                        data={monthArr}
                        index={monthArr.indexOf(MONTHS[month].name) - 1}
                        onScroll={onChangeDate.bind({}, 'month')}
                        width="90px"
                    />
                    <Scroller
                        data={dayArr}
                        index={dayArr.indexOf(day) - 1}
                        onScroll={onChangeDate.bind({}, 'day')}
                        width="40px"
                    />
                    <Scroller
                        data={yearArr}
                        index={yearArr.indexOf(year) - 1}
                        onScroll={onChangeDate.bind({}, 'year')}
                        width="50px"
                    />
                </Container>
                <Button
                    width={80}
                    height={30}
                    top={10}
                    text="OK"
                    onPress={() => onChange(currentDate)}
                />
            </Container>
        </Container>
    );
};

export default DatePicker;
