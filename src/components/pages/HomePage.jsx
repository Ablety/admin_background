/*
*Created by 2018/9/12
*Author:songzhikuan
*/

import React from 'react';
import OverviewBoard from "../lib/OverviewBoard/src/OverviewBoard";
import {connect} from "react-redux";

const mapStateToProps = state => {
    const {screenWidth, screenHeight} = state.screenData;
    return {
        screenData: {
            screenWidth,
            screenHeight
        }
    };
};

@connect(mapStateToProps, null)
export default class HomePage extends React.Component {

    render() {
        const {screenData,...props} = this.props;
        const defaultStyle = {
            // height:screenData.screenHeight,
        };
        const settings = {
            className: props['className'] + ' inner_HomePage_container',
            style: defaultStyle
        };
        return (
            <div {...settings}>
                <OverviewBoard />
            </div>
        )
    }
}