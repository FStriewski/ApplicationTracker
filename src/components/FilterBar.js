import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByTerm } from '../actions/filter'
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { fetchAllCompanys } from '../actions/company'
import TextField from "material-ui/TextField"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
});


class FilterBar extends PureComponent {
// Don't remove:
    state = {
     term : "",
    }

    // searchingByOrderName = term => {
    //      return function (x) {
    //          return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    //      };
    //  }

    searchHandler = event => {
        this.setState({ term: event.target.value })
        console.log(this.state.term)
    }


    

    // handleChange = (event) => {
    
    //   return this.props.companys.filter(company => company.name.toLowerCase().includes(event.target.value.toLowerCase()) || 'none')
    
    // }

    render(){
        const { companys, classes } = this.props
        return (
            <div>
            <form>
                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="search-term"></InputLabel>
                    <Input id="search-term" name="name" value={this.state.name} onChange={this.handleChange} />
                </FormControl> */}
            <TextField
                label="Search Name"
                type="text"
                onChange={this.searchHandler}
                />
                </form>

                    {/* {companys.filter( x =>
                    x.name.toLowerCase().includes(this.state.term.toLowerCase()) 
                     
                        
                        )} */}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
        companys: state.companys
    })


export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByTerm, fetchAllCompanys })
)(FilterBar)