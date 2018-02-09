import React from "react";
import { CSSTransition } from 'react-transition-group';
import styles from './Fade.less';

const Fade = ({children, ...props}) => (
    <CSSTransition {...props} timeout={300} classNames='fade'>
        {children}
    </CSSTransition>
);

export default Fade;