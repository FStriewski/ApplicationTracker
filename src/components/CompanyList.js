import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import LogOutPage from './userHandling/LogOutPage'
import {connect} from 'react-redux'
import { fetchAllCompanys, removeCompany, createCompany} from '../actions/company'
import { filterByLanguage, filterByPosition } from '../actions/filter'
import {Link } from 'react-router-dom'
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
import Visibility from '@material-ui/icons/Visibility';
import FilterBar from './FilterBar'
import Button from 'material-ui/Button';


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
    backgroundColor: "#F3F0F2",
    fontSize: 15,
  },
  heading: {
    color: "#711F9B",
    fontSize: 16,
  },
  button: {
    color: "#711F9B",
    fontSize: 14,
    textTransform: "capitalize",
    borderColor: "#711F9B",
    padding: 0,
    textDecoration: "underline",
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

state = {
  language: "All",
  position: "All",
  filterLanguageActive: false,
  filterPositionActive: false,
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

  filterLanguage = () => {
    if (this.state.language === "All") {
      this.setState({
        language: "INT",
        filterLanguageActive: true,
      })
      const int = this.props.companys.filter(c => c.language !== "NL")
      this.props.filterByLanguage(int)
      return 
    }
    if (this.state.language === "INT") {
      this.setState({
        language: "All",
        filterLanguageActive: false,
      })
      this.props.fetchAllCompanys()
    }
  }

  filterPosition = () => {
    if (this.state.position === "All") {
      this.setState({
        position: "Open",
        filterPositionActive: true,
      })
      const openPositions = this.props.companys.filter(c => c.applied.toLowerCase() !== "n" )
      this.props.filterByPosition(openPositions)
      return
    }
    if (this.state.position === "Open") {
      this.setState({
        position: "All",
        filterPositionActive: false,
      })
      this.props.fetchAllCompanys()
    }
  }

  render() {
    const {companys, classes} = this.props
    return (
      <Paper className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>({companys.length} found) -- Add more...</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <CompanyForm onSubmit={this.createCompany} />
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

<FilterBar/>

        <Table className={classes.table}>
          <TableHead >
            <TableRow >

              <TableCell className={classes.header}>#</TableCell>
              <TableCell className={classes.header}>Name</TableCell>
              <TableCell className={classes.header}>
                <Button className={classes.button} onClick={this.filterLanguage}>{this.state.filterLanguageActive ? <Visibility/>: "" }Language </Button>
              </TableCell>
              <TableCell className={classes.header}>Score</TableCell>
              <TableCell className={classes.header}>
                <Button className={classes.button} onClick={this.filterPosition}>{this.state.filterPositionActive ? <Visibility /> : ""}Jobs </Button>
              </TableCell>
              <TableCell className={classes.header}>Link </TableCell>
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
                  <TableCell className={classes.cell}><a href={company.link} target="_blank">Link</a></TableCell>
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
  connect(mapStateToProps, { fetchAllCompanys, createCompany, removeCompany, filterByLanguage, filterByPosition })
)(CompanyList)