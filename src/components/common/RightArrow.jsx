import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowRight } from "react-icons/md";

export class RightArrow extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const size = this.props.size || 72;
        const color = this.props.clickAble || false ? "#3F51B5" : "#6C6C6C";
        const onClick = this.props.onClick || null;
        return (
            <div onClick={onClick}>
             <MdKeyboardArrowRight size={size} color={color} />
            </div>
        );
    }
}

RightArrow.propTypes = {
    clickAble: PropTypes.bool.isRequired,
    size: PropTypes.number,
    onClick: PropTypes.func
};