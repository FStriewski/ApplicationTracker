import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByTerm, undo } from '../../actions/filter'
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
    formControl: {
        width: 200,
        marginBottom: 10,
        marginLeft: 40,
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
        let filter = this.props.companys.present.filter(company => company.name.toLowerCase().includes(e.target.value.toLowerCase()))

        return this.props.filterByTerm(filter)
    }


    handleBackspace = (e) => {
        if (e.keyCode === 8 && this.props.companys.past.length > 0) {
            return this.props.undo()
        }
        return
    }

    render() {
        const { companys, classes } = this.props
        return (

                <form>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="search-term">By Name</InputLabel>
                        <Input id="search-term" name="name" autoComplete="off" onChange={this.handleChange} onKeyDown={this.handleBackspace} />
                    </FormControl>
                </form>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companys
})


export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByTerm, undo })
)(FilterBar)