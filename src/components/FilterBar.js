import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByTerm } from '../actions/filter'
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
// Don't remove:
    state = {}

    handleChange = (event) => {
        console.log(event.target.value)
        this.props.filterByTerm(event.target.value)
    }

    render(){
        const { classes } = this.props
        return (
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="search-term"></InputLabel>
                    <Input id="search-term" name="name" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
            </form>
        )
    }
}


const mapStateToProps = (state) => ({
       
    })


export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByTerm })
)(FilterBar)