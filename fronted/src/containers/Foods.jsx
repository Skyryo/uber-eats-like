import React, { Fragment, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//components
import { LocalMallIcon } from "../components/Icon";
import { FoodWrapper } from "../components/FoodWrapper";
import Skeleton from "@material-ui/lab/Skeleton";
import { FoodOrderDialog } from "../components/FoodOrderDialog";

//apis
import { fetchFoods } from "../apis/foods";

//reducers
import {
    initialState as foodsInitialState,
    foodsActionTypes,
    foodsReducer
} from "../reducers/foods";

//image
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";

//constants
import { REQUEST_STATE } from "../constants";
import { COLORS } from "../style_constants";

//style css in js
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
    height: 90px;
`;

const FoodsList = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
    margin: 16px;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }
`;

const submitOrder = () => {
    console.log('Submited!!')
};

//Foods Method
export const Foods = ({
    match
}) => {
    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

    const initialState = {
        isOpenOrderDialog: false,
        selectedFood: null,
        selectedFoodCount: 1
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        dispatch({ type: foodsActionTypes.FETCING });
        fetchFoods(match.params.restaurantsId)
        .then((data) => 
            dispatch({
                type:foodsActionTypes.FETCH_SUCCESS,
                payload: {
                    foods: data.foods
                }
            })  
        )
    }, []);

    return (
        <Fragment>
            <HeaderWrapper>
                <Link to="/restaurants">
                    <MainLogoImage src={MainLogo} alt="main logo" />
                </Link>
                <BagIconWrapper>
                    <Link to="/orders">
                        <ColoredBagIcon fontSize="large" />
                    </Link>
                </BagIconWrapper>
            </HeaderWrapper>
            <FoodsList>
                {
                    foodsState.fetchState === REQUEST_STATE.LOADING ?
                        <Fragment>
                            {
                                [...Array(12).keys()].map(i =>
                                    <ItemWrapper key={i}>
                                        <Skeleton key={i} variant="rect" width={450} height={180} />
                                    </ItemWrapper>    
                                )
                            }
                        </Fragment>
                    :

                    foodsState.foodsList.map(food =>
                        <ItemWrapper key={food.id}>
                            <FoodWrapper
                                food={food}
                                onClickFoodWrapper={
                                    (food) =>  setState({
                                        ...state,
                                        isOpenOrderDialog: true,
                                        selectedFood: food
                                    })
                                }
                                imageUrl={FoodImage}
                            />
                        </ItemWrapper>
                    )
                }
            </FoodsList>

            {
                state.isOpenOrderDialog &&
                    <FoodOrderDialog
                        food={state.selectedFood}
                        isOpen={state.isOpenOrderDialog}
                        countNumber={state.selectedFoodCount}
                        onClickCountUp={() => setState({
                            ...state,
                            selectedFoodCount: state.selectedFoodCount + 1
                        })}
                        onClickCountDown={() => setState({
                            ...state,
                            selectedFoodCount: state.selectedFoodCount - 1
                        })}
                        onClickOrder={() => submitOrder()}
                        onClose={() => setState({
                            ...state,
                            isOpenOrderDialog: false,
                            selectedFood: null,
                            selectedFoodCount: 1
                        })}
                    />
            }

        </Fragment>
    )
}