<template>
    <div class="calendar-row">
        <div v-for="(date, i) of dates" :key="i" :class="{ header: isHeader }">
            <span>{{ date }}</span>
        </div>
        <CalendarStack v-if="!isHeader" text="テスト" />
    </div>
</template>

<script>
import CalendarStack from './CalendarStack.vue';
export default {
    name: 'CalendarRow',
    components: {
        CalendarStack,
    },
    props: {
        isHeader: {
            type: Boolean,
            default: false,
        },
        dates: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar-row {
    display: flex;
    justify-content: center;
    & > div {
        outline: 1px solid red;
        flex-grow: 1;
        height: 5rem;
        & > span {
            display: block;
            padding: 0 3px;
            text-align: left;
        }
        &.header {
            height: unset;
            & > span {
                display: block;
                padding: 0 3px;
                text-align: center;
            }
        }
    }
}
</style>
