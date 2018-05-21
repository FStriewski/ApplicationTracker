import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Slider from './filter/Slider'
import Language from './filter/Language'
import Positions from './filter/Positions'
import Term from './filter/Term'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { FormControl } from 'material-ui/Form';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


const styles = theme => ({
    container: {
         display: 'flex',
         width: "100%",
        fontSize: 14,
    },
    slider: {
        marginLeft: 20,
        width: 200,
    },
    header: {
        borderColor: "#454154",
        backgroundColor: "white",
        color: "#454154",
        fontSize: 15,
    },
});


 class FilterBar extends PureComponent {
   
    render(){
        const { classes } = this.props
        return (
             <div className={classes.container}>
                 {/* <Term />

                <div className={classes.slider}>
                    <Slider />
                </div>
                <div className={classes.language}>
                    <Language />
                </div>
                <div className={classes.positions}>
                    <Positions />
                </div> */}




                 < Table >
                     <TableHead >
                         

                             <TableCell className={classes.header}>#</TableCell>
                             <TableCell className={classes.header}>Name</TableCell>
                             <TableCell className={classes.header}>
                                 Language
            </TableCell>
                             <TableCell className={classes.header}>Score</TableCell>
                             <TableCell className={classes.header}>
                                 Positions
            </TableCell>
                             <TableCell className={classes.header}>Link </TableCell>
                             <TableCell className={classes.header}>Remove</TableCell>

                         
                     </TableHead>
                 </Table >

             </div>
         )
     }
 }
        
                export default combine(
                withStyles(styles),
)(FilterBar)