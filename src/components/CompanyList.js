import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import LogOutPage from './userHandling/LogOutPage'
import {connect} from 'react-redux'
import { fetchAllCompanys} from '../actions/company'

import CompanyForm from './CompanyForm'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import * as combine from "lodash/fp/compose"
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterBar from './FilterBar'
import CompanyTable from './CompanyTable'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    height: "80%",
  },
  expansion: {
    backgroundColor:"#f2f2f2" 
  }
});


class CompanyList extends PureComponent {

  componentWillMount() {
    this.props.fetchAllCompanys()
  }

  render() {
    const {companys, classes} = this.props
    return (
      <div id="companyListWrapper">
      <Paper className={classes.root}>
        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>({companys.length} found) -- Add more...</Typography>
          </ExpansionPanelSummary>
          {/* <ExpansionPanelDetails> */}
            <Typography>
              <CompanyForm onSubmit={this.createCompany} />
          </Typography>
          {/* </ExpansionPanelDetails> */}
        </ExpansionPanel>

        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Filter...</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                <FilterBar />
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      <CompanyTable />
    
      </Paper>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    companys: state.companys
  }
}

export default combine(
  withStyles(styles),
  connect(mapStateToProps, { fetchAllCompanys })
)(CompanyList)