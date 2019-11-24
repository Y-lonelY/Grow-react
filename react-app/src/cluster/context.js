import React from 'react';
import { locale as customizeLocale } from '@/assets/locale';

export const LocaleContext = React.createContext({
    locale: 'zh_cn',
    assets: customizeLocale.zh_cn,
    toggleLocale: () => {}
});