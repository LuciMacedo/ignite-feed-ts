import { ImgHTMLAttributes } from "react";
import styles from "../avatar/styles.module.css"


interface avatarProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props}:avatarProps) {
    return (  
        <img className={ hasBorder ? styles.avatarWithBorder : styles.avatar} 
        {...props}/> 
    );
}



