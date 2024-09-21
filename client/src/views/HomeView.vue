<template>
    <div class="home">
        <CalendarView />
    </div>
</template>

<script>
import CalendarView from '@/views/CalendarView.vue';

export default {
    name: 'HomeView',
    components: {
        CalendarView,
    },
};
</script>
