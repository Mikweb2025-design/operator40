import { createContext, useContext } from 'react';
import { translate } from '../i18n.js';

export const LangContext = createContext({ lang: 'it', t: (k, v) => translate(k, 'it', v), setLang: () => {} });
export function useT() { return useContext(LangContext); }
