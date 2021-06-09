import React from "react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

interface LinkParserProps {
	children: string;
}

const LinkParser: React.FC<LinkParserProps> = (props) => {
	const parsed = useMemo(() => {
		const text = props.children;

		const regex = /[@#]\w+/g;
		let match = regex.exec(text);
		if (!match) return text;

		let lastIndex = 0;
		const elements = [];
		do {
			if (lastIndex < match.index) {
				elements.push(text.substring(lastIndex, match.index));
			}

			elements.push(
				<NavLink
					key={match.index}
					className="text-primary"
					to={match[0].startsWith("@") ? "/" + match[0].substr(1) : ""}
					onClick={(e) => e.stopPropagation()}
				>
					{match[0]}
				</NavLink>
			);

			lastIndex = match.index + match[0].length;
		} while ((match = regex.exec(text)) !== null);

		if (lastIndex < text.length) {
			elements.push(text.substring(lastIndex));
		}

		return elements;
	}, [props.children]);

	return <React.Fragment>{parsed}</React.Fragment>;
};

export default LinkParser;
