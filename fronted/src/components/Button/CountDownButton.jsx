import React from "react";

//style
import { RoundButton } from "../shared_style";

//CountDownButton Method
export const CountDownButton = ({
    onClick,
    isDisabled
}) => (
    <RoundButton onClick={onClick} disabled={isDisabled}>
        -
    </RoundButton>
)