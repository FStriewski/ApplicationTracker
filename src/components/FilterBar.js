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
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
    container: {
         display: 'flex',
    },
    slider: {
        marginLeft: 20,
        width: 200,
    },
    formControl: {
        width: 200,
        marginBottom: 10,
    }
});


class FilterBar extends PureComponent {
    static propTypes = {
        companys: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            market: PropTypes.string,
            focus: PropTypes.string,
            score: PropTypes.number.isRequired,
            language: PropTypes.oneOf(['INT', 'NL']),
            applied: PropTypes.oneOf(['y', 'n']),
            link: PropTypes.string.isRequired,
            comments: PropTypes.string,
        })).isRequired,

        filterByTerm: PropTypes.func.isRequired,
        undo: PropTypes.func.isRequired,
    }

    handleChange = (e) => {
        let filter = this.props.companys.present.filter(company => company.name.toLowerCase().includes        (e.target.value.toLowerCase()) )
      
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
            <div className={classes.container}>
                <Term />

                <div className={classes.slider}>
                    <Slider />
                </div>
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