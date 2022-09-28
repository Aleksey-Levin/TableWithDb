import React from 'react';
import Cell from "./Cell";

const Row = (props) => {
    return (
            <tr key={props.person.id}>
                {props.columns.map((cell, index)=>{
                    index = index % props.columns.length;
                    const type = props.columns[index].key;
                    return (
                        <Cell type = {props.columns[index]} value = {props.person[type]} key = {props.person.id + index}/>
                    )
                })}
            </tr>
    );
};

export default Row;