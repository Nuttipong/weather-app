import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft } from "react-icons/md";

export class LeftArrow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const size = this.props.size || 72;
        const color = this.props.clickAble || false ? "#3F51B5" : "#6C6C6C";
        const onClick = this.props.onClick || null;

        return (
            <div onClick={onClick}>
             <MdKeyboardArrowLeft size={size} color={color} />
            </div>
        );
    }
}

LeftArrow.propTypes = {
    clickAble: PropTypes.bool.isRequired,
    size: PropTypes.number,
    onClick: PropTypes.func
};