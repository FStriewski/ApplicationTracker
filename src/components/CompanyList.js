import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import LogOutPage from './userHandling/LogOutPage'
import {connect} from 'react-redux'
import {fetchAllCompanys} from '../actions/fetchCompany'
import { removeCompany } from '../actions/removeCompany'
import {createCompany} from '../actions/createCompany'
import {Link, Redirect } from 'react-router-dom'
import CompanyForm from './CompanyForm'
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import * as combine from "lodash/fp/compose"
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    // textAlign: "center", 
  },
  header: {
    borderColor: "#711F9B",
    color: "#711F9B",
    fontSize: 14,
  },
  cell: {
    borderColor: "#711F9B",
  },
  heading: {
    color: "#711F9B",
    fontSize: 16,
  },
});


class CompanyList extends PureComponent {
  static propTypes = {
    Companys: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })).isRequired
  }

  componentWillMount() {
    this.props.fetchAllCompanys()
  }

  createCompany = (Company) => {
  this.props.createCompany(Company)
}

  removeCompany = (CompanyId) => {
  this.props.removeCompany(CompanyId)
}

  render() {
    const {companys, classes} = this.props
    return (
      <Paper className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add new...</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <CompanyForm onSubmit={this.createCompany} />
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Table className={classes.table}>
          <TableHead >
            <TableRow >

              <TableCell className={classes.header}>#</TableCell>
              <TableCell className={classes.header}>Name</TableCell>
              <TableCell className={classes.header}>Language</TableCell>
              <TableCell className={classes.header}>Score</TableCell>
              <TableCell className={classes.header}>Open Pos.</TableCell>
              <TableCell className={classes.header}>Remove</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {companys
             .sort((p1, p2) => (p2.score - p1.score))
            .map(company => {
              return (
                <TableRow key={company.id}>
                  <TableCell className={classes.cell}>{company.id}</TableCell>
                  <TableCell className={classes.cell}><Link to={`/Companys/${company.id}`}>{company.name}</Link></TableCell>
                  <TableCell className={classes.cell}>{company.language}</TableCell>
                  <TableCell className={classes.cell}>{company.score}</TableCell>
                  <TableCell className={classes.cell}>{company.applied}</TableCell>
                  <TableCell className={classes.cell}> <button onClick={() => this.removeCompany(company.id)}> X </button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

//  <h1>Create a new Company</h1>
//               <CompanyForm onSubmit={this.createCompany} />

const mapStateToProps = function (state) {
  return {
    // currentUser: state.currentUser,
    companys: state.companys
  }
}

export default combine(
  withStyles(styles),
  connect(mapStateToProps, { fetchAllCompanys, createCompany, removeCompany })
)(CompanyList)