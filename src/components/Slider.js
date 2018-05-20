import React from 'react'
import { connect } from 'react-redux'
import { filterByScore } from '../actions/filter'

class Slider extends React.Component {

    state = {
        sliderValue: 0,
    }
    

    onSliderChange = (e) => {
        this.setState({ sliderValue: e.target.value });
        
        const selection = this.props.companys.present.filter(company => company.score >= e.target.value )
        console.log("selection:   " + selection)

       // this.filterByScore(selection)
    }

    render() {
        console.log(this.props.companys.present)
        return (
            <div>
                <span class="range-slider__value">{this.state.sliderValue}</span>

                <div><label for="score">Score</label></div>
                <input id="score" className="range-slider__range" type="range" value={this.state.sliderValue} min="0" max="10" onChange={this.onSliderChange} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    companys: state.companys
})


export default connect(mapStateToProps, { filterByScore })(Slider)


