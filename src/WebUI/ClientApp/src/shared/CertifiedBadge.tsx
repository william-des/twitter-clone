import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CertifiedBadge: React.FC = () => {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-primary ml-1" />;
}

export default CertifiedBadge;