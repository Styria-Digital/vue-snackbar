<template>
    <div id="snackbarNotificationWrapper">
        <transition-group name="slide-fade">
            <snackbar-item
                v-for="item in items"
                :key="item.idx"
                :item="item"
            />
        </transition-group>
    </div>
</template>

<script>
import SnackbarItem from "./SnackbarItem";

export default {
    name: 'SnackbarNotifications',

    components: {
        SnackbarItem
    }
};
</script>

<style lang="scss">
    @import "./SnackbarNotif";
</style>
