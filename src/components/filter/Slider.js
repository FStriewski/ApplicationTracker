import React from 'react'
import { connect } from 'react-redux'
import { filterByScore } from '../../actions/filter'
import { withStyles } from 'material-ui/styles';
import * as combine from "lodash/fp/compose"
import { fetchAllCompanys } from '../../actions/company'


const styles = theme => ({
    sliderContainer: {
        marginTop: 10,
        marginLeft: -50,
        width: "100%",
    },
});

class Slider extends React.Component {

    state = {
        sliderValue: 0,
    }


    onSliderChange = (e) => {

        this.setState({ 
            sliderValue: e.target.value 
        });

        const initialValue = this.props.companys.past[1]
        const selection = initialValue.filter(company => company.score >= e.target.value )

        return this.props.filterByScore(selection)
    }

    render() {
       const {classes} = this.props
        return (
            <div className={classes.sliderContainer }>
                <div>
                    <label for="score">Score ({this.state.sliderValue} - 10) </label>
                </div>
                <input id="score" className={classes.slider} type="range" value={this.state.sliderValue} min="0" max="10" onChange={this.onSliderChange} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companys,    
})

export default combine(
    withStyles(styles),
    connect(mapStateToProps, { filterByScore, fetchAllCompanys })
)(Slider)


