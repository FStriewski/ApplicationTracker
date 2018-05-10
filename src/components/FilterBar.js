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

    handleChange = (event) => {

      let filter = this.props.companys.filter(company => company.name.toLowerCase().includes(event.target.value.toLowerCase()) )
      
    return this.props.filterByTerm(filter)
    }

    render(){
        const { companys, classes } = this.props
        return (
            <div>
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="search-term"></InputLabel>
                    <Input id="search-term" name="name"  onChange={this.handleChange} />
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
    connect(mapStateToProps, { filterByTerm })
)(FilterBar)