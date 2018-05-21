import React from 'react'
import { connect } from 'react-redux'
import { filterByLanguage } from '../../actions/filter'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { fetchAllCompanys } from '../../actions/company'

import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = theme => ({
    languageContainer: {
        marginLeft: -100,
        width: "100%",
    },
});

class Language extends React.Component {

    state = {
        fiterActive: false,
        language: "All",
    }

    filterLanguage = () => {
        if (this.state.language === "All") {
            this.setState({
                language: "INT",
                fiterActive: true,
            })
            const int = this.props.companys.filter(c => c.language !== "NL")
            this.props.filterByLanguage(int)
            return
        }
        if (this.state.language === "INT") {
            this.setState({
                language: "All",
                fiterActive: false,
            })
            this.props.fetchAllCompanys()
        }
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.languageContainer}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.fiterActive}
                            onChange={this.filterLanguage}
                            value="All"
                        />
                    }
                    label="INT only"
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
    connect(mapStateToProps, { filterByLanguage, fetchAllCompanys })
)(Language)


