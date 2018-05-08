import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { filterByLanguage, filterByPosition} from '../actions/filter'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
});


class FilterBar extends PureComponent {

    state = {
        language: "All",
        openpos: "All",
    }

    filterLanguage = () => {
        if (this.state.language === "All") {
            this.setState({
                language: "INT"
            })
            const int =  this.props.companys.filter(c => c.language !== "NL")
            console.log(int)
            this.props.filterByLanguage(int)
            return int
        }
        if (this.state.language === "INT") {
            this.setState({
                language: "All"
            })
            const all = this.props.companys
            console.log(all)
            this.props.filterByLanguage(all)
            return all
        }
    }


    render(){
        const { companys, classes } = this.props
        return (
            <div>
                <button onClick={this.filterLanguage}>Filter 1</button>


                <button>Filter 2</button>
            </div>
        )
    }


}


const mapStateToProps = (state) => ({
        companys: state.companys
    })


export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByLanguage, filterByPosition  })
)(FilterBar)