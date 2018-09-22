/**
 *Created by 2018/9/20
 *Author:songzhikuan
 */
'use strict';
const paths = require('./paths');
module.exports = {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        '@': `${paths.appSrc}/`,
        'utils': `${paths.appSrc}/utils`,
        'action': `${paths.appSrc}/action`,
        'antdConfig': `${paths.appSrc}/antdConfig`,
        'components': `${paths.appSrc}/components`,
        'constants': `${paths.appSrc}/constants`,
        'reducer': `${paths.appSrc}/reducer`,
        'style': `${paths.appSrc}/style`,
        '@hoc': `${paths.appSrc}/hoc`,
};