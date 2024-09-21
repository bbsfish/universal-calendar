<template>
    <div class="calendar-stack">
        <span>テスト</span>
    </div>
</template>

<script>
export default {
    name: 'CalendarContents',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar-contents {
    display: inline-block;
}
</style>
