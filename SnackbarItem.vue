<template>
    <div
        v-touch:swipe.left="swipeHandler"
        :class="[ item.type, { has_button: item.cta } ]"
        class="snackbar_notification"
    >
        <p
            class="snackbar_notification__title"
            v-html="item.title"
        />

        <div class="snackbar_notification__content">
            <p v-html="item.text" />
        </div>

        <!-- TODO: Consult with Luka about all possible CTA -->
        <div
            v-if="item.cta"
            class="snackbar_notification__cta"
            @click="reloadApp"
        >
            Reload
        </div>

        <!-- TODO: Consult with Luka about displaying animation if CTA is available -->
        <div
            :class="{ is_animation: !item.cta }"
            class="snackbar_notification__bar"
            :style="`animation-duration: ${item.duration}ms;`"
        />
    </div>
</template>


<script>

export default {
    name: 'SnackbarItem',

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    created () {
        if (!this.item.cta) {
            this.autoCloseNotif();
        } else {
            this.closeOnLocationChange();
        }
    },

    beforeDestroy: function () {
        if (this.item.cta) {
            window.removeEventListener('locationchange', this.closeNotifItem);
        }
    },

    methods: {
        reloadApp () {
            this.$eventHub.$emit('sameRouteClicked');
            this.closeNotifItem();
        },

        autoCloseNotif () {
            setTimeout(() => {
                this.closeNotifItem();
            }, this.item.duration);
        },

        closeOnLocationChange () {
            history.pushState = ( () => window.dispatchEvent(new Event('locationchange')) );

            window.addEventListener('locationchange', this.closeNotifItem);
        },

        closeNotifItem () {
            this.$snackbar.update(this.item.idx);
        },

        swipeHandler (direction) {
            if ( typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1 && direction === 'left' ) {
                this.closeNotifItem();
            }
        }
    }

};
</script>
