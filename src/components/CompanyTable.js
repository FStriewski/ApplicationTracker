
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllCompanys, removeCompany, createCompany } from '../actions/company'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import * as combine from "lodash/fp/compose"




const styles = theme => ({
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
    table: {
        // height: "40%",
    },
    tableBody: {
       
    },
});

class CompanyTable extends PureComponent {
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
        removeCompany: PropTypes.func.isRequired,
        createCompany: PropTypes.func.isRequired,
        filterByLanguage: PropTypes.func.isRequired,
        filterByPosition: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.props.fetchAllCompanys()
    }

    render() {
        const { companys, classes } = this.props
        return (
            <Paper className={classes.papcon}>
                <div className={classes.table}>
                    <Table >
                        <TableHead >
                            <TableRow >

                                <TableCell className={classes.header}>#</TableCell>
                                <TableCell className={classes.header}>Name</TableCell>
                                <TableCell className={classes.header}>
                                    Language
                                </TableCell>
                                <TableCell className={classes.header}>Score</TableCell>
                                <TableCell className={classes.header}>
                                    Jobs
                                </TableCell>
                                <TableCell className={classes.header}>Link </TableCell>
                                <TableCell className={classes.header}>Remove</TableCell>

                            </TableRow>
                        </TableHead>
                            <TableBody className={classes.tableBody}>
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
    connect(mapStateToProps, { fetchAllCompanys, createCompany, removeCompany, })
)(CompanyTable)