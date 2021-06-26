import React from "react";
import Button from "../shared/Button";

interface PlaceholderProps {
    className: string;
    title: string;
    description: string;
    button: {
        text: string;
        onClick: VoidFunction;
    }
}

const Placeholder: React.FC<PlaceholderProps> = props => {
    return (
        <div className={`${props.className} text-center`}>
            <h2 className="font-bold text-xl">{props.title}</h2>
            <p className="text-gray-600 my-1">
                {props.description}
            </p>
            <Button className="mt-2 py-2 px-4" onClick={props.button.onClick}>
                {props.button.text}
            </Button>
        </div>
    );
}

export default Placeholder;