import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Slider from './filter/Slider'
import Term from './filter/Term'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByTerm, undo } from '../actions/filter'
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';


const styles = theme => ({
    container: {
         display: 'flex',
    },
    slider: {
        marginLeft: 20,
        width: 200,
    },
});


 class FilterBar extends PureComponent {
   
    render(){
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Term />

                <div className={classes.slider}>
                    <Slider />
                </div>
            </div>
        )
    }
}

export default combine(
    withStyles(styles),
)(FilterBar)