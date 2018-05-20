
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllCompanys, removeCompany, createCompany } from '../actions/company'
import { filterByLanguage, filterByPosition } from '../actions/filter'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import * as combine from "lodash/fp/compose"
import Visibility from '@material-ui/icons/Visibility';
import Button from 'material-ui/Button';


const styles = theme => ({
    table: {
        minWidth: 700,
        height: "80%"
        // textAlign: "center", 
    },
    header: {
        borderColor: "#454154",
        color: "#454154",
        fontSize: 14,
    },
    cell: {
        borderColor: "#454154",
        backgroundColor: "white",
        color: "#454154",
        fontSize: 15,
    },
    heading: {
        color: "#454154",
        fontSize: 16,
    },
    button: {
        color: "#711F9B",
        fontSize: 14,
        textTransform: "capitalize",
        borderColor: "white",
        padding: 0,
        textDecoration: "underline",
    },
});

class CompanyTable extends PureComponent {
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
            const openPositions = this.props.companys.filter(c => c.applied.toLowerCase() !== "n")
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
        const { companys, classes } = this.props
        return (
            <div id="companyTableWrapper">
                <Paper className={classes.root}>

                    <div className={classes.table}>
                        <Table >
                            <TableHead >
                                <TableRow >

                                    <TableCell className={classes.header}>#</TableCell>
                                    <TableCell className={classes.header}>Name</TableCell>
                                    <TableCell className={classes.header}>
                                        <Button className={classes.button} onClick={this.filterLanguage}>{this.state.filterLanguageActive ? <Visibility /> : ""}Language </Button>
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
                                                <TableCell className={classes.cell}> <button onClick={() => this.props.removeCompany(company.id)}> X </button></TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Paper >
            </div >
        )
    }
}


const mapStateToProps = function (state) {
    return {
        // currentUser: state.currentUser,
        companys: state.companys.present
    }
}

export default combine(
    withStyles(styles),
    connect(mapStateToProps, { fetchAllCompanys, createCompany, removeCompany, filterByLanguage, filterByPosition })
)(CompanyTable)