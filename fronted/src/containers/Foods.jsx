import React, { Fragment } from "react";

export const Foods = ({
    match
}) => {
    return (
        <Fragment>
            フード一覧
            <p>
                restaurantsIDは、{match.params.restaurantsId}です。
            </p>
        </Fragment>
    )
}