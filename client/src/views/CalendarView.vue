<template>
    <div class="calendar-view">
        <div class="calendar-wrap">
            {{ date.year }}年 {{ date.month }}月
            <div>
                <CalendarRow :dates="getDays()" :isHeader="true" />
            </div>
            <div v-for="(dates, i) of getDates()" :key="i">
                <CalendarRow :dates="dates" />
            </div>
        </div>
    </div>
</template>

<script>
import CalendarRow from '@/components/calendar/CalendarRow.vue';

export default {
    name: 'CanlendarView',
    components: {
        CalendarRow,
    },
    data() {
        return {
            /** @type {Number} 1-7 の数値. 1=月, 7=日 */
            startDay: 1,
            date: {
                year: 2024,
                month: 9,
            },
        };
    },
    methods: {
        getDays() {
            const defaultDays = ['日', '月', '火', '水', '木', '金', '土'];
            let days = defaultDays.concat(defaultDays);
            days = days.slice(this.startDay);
            return days.slice(0, 7);
        },
        getDates() {
            const thisYear = this.date.year;
            const thisMonth = this.date.month - 1;

            const befrMnsLastDate = new Date(thisYear, thisMonth, 0).getDate();
            const startDate = befrMnsLastDate - 7 + 1;
            const befrMnsDates = [...Array(7)].map((_, i) => startDate + i);
            const thisMnsLastDate = new Date(
                thisYear,
                thisMonth + 1,
                0
            ).getDate();
            const thisMnsDates = [...Array(thisMnsLastDate)].map(
                (_, i) => i + 1
            );
            const x = 7 - this.startDay;
            const thisMnsStartDay = new Date(thisYear, thisMonth, 1).getDay();
            let dates = befrMnsDates
                .concat(thisMnsDates)
                .slice(x - thisMnsStartDay);

            const aftrMnsDates = [...Array(42 - dates.length)].map(
                (_, i) => i + 1
            );

            dates = dates.concat(aftrMnsDates);

            let res = [];
            for (let i = 0; i < dates.length; i++) {
                const n = dates[i];
                if (i % 7 === 0) {
                    res.push([n]);
                } else {
                    res[res.length - 1].push(n);
                }
            }
            console.log(res);
            return res;
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar-view {
    text-align: center;
}
.calendar-wrap {
    display: flex;
    flex-direction: column;
}
</style>
