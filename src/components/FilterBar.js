import React, { PureComponent } from 'react'
import { UndoActionCreators } from 'redux-undo';

import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByTerm, undo } from '../actions/filter'
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
});


class FilterBar extends PureComponent {

    handleChange = (event) => {
        let filter = this.props.companys.present.filter(company => company.name.toLowerCase().includes        (event.target.value.toLowerCase()) )
      
        return this.props.filterByTerm(filter)
    }


    handleBackspace = (e) => {
        if (e.keyCode === 8 && this.props.companys.past.length > 0) {
           return this.props.undo()
         }
         return 
    }


    render(){
        const { companys, classes } = this.props
        return (
            <div>
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="search-term">By Name</InputLabel>
                        <Input id="search-term" name="name" autoComplete="off" onChange={this.handleChange} onKeyDown={this.handleBackspace }/>
                </FormControl>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        companys: state.companys
    })


export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByTerm, undo})
)(FilterBar)