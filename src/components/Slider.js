import React from 'react'
import { connect } from 'react-redux'
import { filterByScore } from '../actions/filter'
import { fetchAllCompanys } from '../actions/company'

class Slider extends React.Component {

    state = {
        sliderValue: 0,
    }


    onSliderChange = (e) => {
        this.setState({ sliderValue: e.target.value });

        console.log("x: " + this.props.companys.past[1])

       const initialValue = this.props.companys.past[1]
        
        
        const selection = initialValue.filter(company => company.score >= e.target.value )
        //console.log("selection:   " + selection)

        this.props.filterByScore(selection)
    }

    render() {
       // console.log(this.props.companys)
        return (
            <div>
                <div>
                    <label for="score">Score ({this.state.sliderValue} - 10) </label>
                </div>
                <input id="score" className="range-slider__range" type="range" value={this.state.sliderValue} min="0" max="10" onChange={this.onSliderChange} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companys,    
})


export default connect(mapStateToProps, { filterByScore, fetchAllCompanys })(Slider)


