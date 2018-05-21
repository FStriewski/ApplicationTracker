import React from 'react'
import { connect } from 'react-redux'
import { filterByPosition } from '../../actions/filter'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { fetchAllCompanys } from '../../actions/company'

import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = theme => ({
    positionsContainer: {

        marginTop: 0,
        marginLeft: -60,
        width: "100%",
    },
});

class Positions extends React.Component {

    state = {
        fiterActive: false,
        position: "All",
    }

 
    filterPositions = () => {
        if (this.state.position === "All") {
            this.setState({
                position: "Open",
                fiterActive: true,
            })
            const openPositions = this.props.companys.filter(c => c.applied.toLowerCase() !== "n")
            this.props.filterByPosition(openPositions)
            return
        }
        if (this.state.position === "Open") {
            this.setState({
                position: "All",
                fiterActive: false,
            })
            this.props.fetchAllCompanys()
        }
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.positionsContainer}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.fiterActive}
                            onChange={this.filterPositions}
                            value="All"
                        />
                    }
                    label="Open only"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companys.present,
})

export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByPosition, fetchAllCompanys })
)(Positions)


