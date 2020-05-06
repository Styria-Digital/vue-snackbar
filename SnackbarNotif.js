import SnackbarNotifications from './SnackbarNotif.vue';
import Vue2TouchEvents      from 'vue2-touch-events';

export default {

    install (Vue) {

        Vue.use(Vue2TouchEvents);

        const SnackbarComp = Vue.extend(SnackbarNotifications);
        let vm;

        Vue.prototype.$snackbar = {
            show: function (msgOptions) {

                const msgObjs = {
                    title: msgOptions.msgTitle ? msgOptions.msgTitle : 'Title',
                    text: msgOptions.msgText ? msgOptions.msgText : 'Text',
                    type: msgOptions.type ? msgOptions.type : 'warning',
                    duration: msgOptions.duration ? msgOptions.duration : 3000,
                    cta: msgOptions.cta ? msgOptions.cta : false,
                    idx: Math.floor(Math.random() * 1000000) + 1
                };

                if ( msgObjs.title.length + msgObjs.text.length > 30 && !msgOptions.duration ) {
                    let calcDuration = ( msgObjs.title.length + msgObjs.text.length ) * 100;
                    msgObjs.duration = calcDuration;
                }

                if (!vm) {
                    let selector = 'snackbar_notification__wrapper';

                    let elWrap = document.createElement('div');
                    elWrap.setAttribute('id', selector);
                    document.querySelector('body').appendChild(elWrap);

                    vm = new SnackbarComp({
                        data: {
                            items: []
                        }
                    }).$mount('#snackbar_notification__wrapper');
                }

                const snackItem = {
                    title: msgObjs.title,
                    text: msgObjs.text,
                    type: msgObjs.type,
                    duration: msgObjs.duration,
                    cta: msgObjs.cta,
                    idx: msgObjs.idx
                };

                vm.$data.items.push(snackItem);

            },

            update: function (id) {

                vm.$data.items = vm.$data.items.filter(item => item.idx !== id);

            }

        };

        Vue.$snackbarShow = function (msgOptions) {

            Vue.prototype.$snackbar.show(msgOptions);

        };

    }

};

// example calls
// from instance
/*
this.$snackbar.show({
    msgTitle:'Hello this is msg TITle',
    msgText:'Annnnd this is msg text, thank yoouu. more text please. more text please. more text please.',
    type: 'warning'
});

this.$snackbar.show({
    msgTitle:'Hello this is msg TITle',
    msgText:'Annnnd this is msg text, thank yoouu.',
    type: 'error'
});

this.$snackbar.show({
    msgTitle:'Hello this is msg TITle',
    msgText:'Annnnd this is msg text, thank yoouu.',
    type: 'success'
});

with reload call to action
this.$snackbar.show({
    msgTitle:'Hello this is msg TITle',
    msgText:'Annnnd this is msg text, thank yoouu.',
    type: 'error',
    cta: true
});
*/
// global / store
/*
Vue.$snackbarShow({
    msgTitle:'Hellouu',
    msgText:'You have successfully logged in',
    type: 'success'
});
*/
