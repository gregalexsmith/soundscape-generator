import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { audioActions } from '../../core/audio';
import { roomSizes, roomTypes } from '../../core/audio/room-settings';

import styled from 'styled-components'
import { Col } from 'react-flexa';
import { Select } from 'antd';
const Option = Select.Option;

const Label = styled.label`
    font-weight: 700;
    padding-right: 4px;
`

const selectStyles = {
    width: '100%'
}

class RoomSettings extends Component {
    static propTypes = {
        setRoomSize: PropTypes.func.isRequired,
        setRoomType: PropTypes.func.isRequired,
    }
    
    selectRoomSize = (value) => {
        this.props.setRoomSize(value);
    }

    selectRoomType = (value) => {
        this.props.setRoomType(value);
    }

    render() {
        const { roomSize, roomType } = this.props
        const capitalize = (a) => a.charAt(0) + a.slice(1).toLowerCase();

        return (
            <React.Fragment>
                <Col xs={4}>
                    <Label htmlFor="room-size">Room Size: </Label>
                    <Select 
                        id="room-size" 
                        value={roomSize} 
                        onChange={this.selectRoomSize}
                        style={selectStyles}
                    >
                        {Object.keys(roomSizes).map(rs => (
                            <Option 
                                value={rs} 
                                key={rs}
                                title={capitalize(rs)}
                            >
                                {capitalize(rs)}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col  xs={4}>
                    <Label htmlFor="room-materials">Room Materials: </Label>
                    <Select 
                        id="room-materials" 
                        value={roomType}
                        onChange={this.selectRoomType}
                        style={selectStyles}
                    >
                        {Object.keys(roomTypes).map(rt => (
                            <Option value={rt} key={rt}>
                                {capitalize(rt)}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return{
        roomSize: state.audio.roomSize,
        roomType: state.audio.roomType
    }
}

export default connect(mapStateToProps, audioActions)(RoomSettings);





                