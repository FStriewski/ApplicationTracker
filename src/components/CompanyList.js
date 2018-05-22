import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllCompanys, createCompany } from '../actions/company'
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
    marginTop: theme.spacing.unit * 4,
    overflowX: 'auto',
  },
  expansion: {
    backgroundColor: "#e0dede",
    borderColor: "#d8d8d8",
    borderWidth: "0.5px",
    borderStyle: "solid",
    
  },

});


class CompanyList extends PureComponent {
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

    fetchAllCompany: PropTypes.func.isRequired,
    createCompany: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchAllCompanys()
  }

  handleSubmit = (company) => {
    this.props.createCompany(company)
  }

  render() {
    const { companys, classes } = this.props
    return (
      // <div id="companyListWrapper">
        <Paper className={classes.root}>
          <ExpansionPanel className={classes.expansion}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>  Add more...</Typography>
            </ExpansionPanelSummary>
              <CompanyForm onSubmit={this.handleSubmit} />
          </ExpansionPanel>

          <ExpansionPanel className={classes.expansion}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Filter - [<b>{companys.length}</b> found] </Typography>
            </ExpansionPanelSummary>

            <FilterBar />

          </ExpansionPanel>

          <CompanyTable />

        </Paper>
      // </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    companys: state.companys.present
  }
}

export default combine(
  withStyles(styles),
  connect(mapStateToProps, { fetchAllCompanys, createCompany })
)(CompanyList)