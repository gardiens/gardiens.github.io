import React from "react";
import style from './ReferenceTile.module.css';

export default function ReferenceTile({ title, author, description, img, link }) {
    return (
        <div className={style.tile}>
            <a href={link} target="_blank" rel="noreferrer" className={style.link_title}>
                <h3 className={style.title}>{title}</h3>
            </a>
            <a href={link} target="_blank" rel="noreferrer" className={style.link_image}>
                <img src={img} alt={title} className={style.image}/>
            </a>

            <h5 className={style.author} >{author}</h5>
            <p className={style.description}>{description}</p>
        </div>
    );
}
