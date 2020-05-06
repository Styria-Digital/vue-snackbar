# vue-snackbar

## Plugin install
```
npm i @badu/vue-snackbar
```

## Add to App.vue
```
import SnackbarNotif        from '@badu/vue-snackbar';
Vue.use(SnackbarNotif);
```

## Options
```
title: message title
text: message description
type: message type > 'success', 'error', 'warning'
duration: message duration, in ms or it will be calculated from message length
cta: call to action (reload page)
```

## Usage
### from instance / component
```
this.$snackbar.show({
    msgTitle:'Someting is wrong',
    msgText:'Please try again',
    type: 'warning'
});

this.$snackbar.show({
    msgTitle:'Hello dear user',
    msgText:'You entered wrong password or username',
    duration: 2000,
    type: 'error'
});

this.$snackbar.show({
    msgTitle:'Hello dear user',
    msgText:'You have successfully logged in'
    type: 'success'
});
```

### with reload call to action
```
this.$snackbar.show({
    msgTitle:'Hello dear user',
    msgText:'You entered wrong password or username',
    type: 'error',
    cta: true
});
```

### global / store
```
Vue.$snackbarShow({
    msgTitle:'Hello dear user',
    msgText:'You have successfully logged in',
    type: 'success'
});
```
