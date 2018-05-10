import React from 'react';
import { Button, Input, Alert } from 'antd';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as index_act from "../../actions/index";
import { mapstate } from "../../reducers/shuju"
import {
	Link
} from 'react-router-dom';

class Page1 extends React.Component {
	constructor(arg) {
		super(arg);

	}

	componentWillMount = () => {
	}

	render() {
		return (
			<div className="home">
				嘿嘿1
      </div>
		)
	}
}

function bindact(dispatch) {
	return bindActionCreators(index_act, dispatch)
}


export default connect(mapstate, bindact)(Page1);