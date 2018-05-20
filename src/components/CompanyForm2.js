import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Typography from '@material-ui/core/Typography';
'material-ui/styles';


const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['', ''];
}


class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0,
    language: "NL",
    score: "",
    applied: "n",
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,

    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState(
      (name === "score")
        ? { score: Number(value) }
        : { [name]: value }
    )
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const initialValues = this.props.initialValues || ''

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {this.state.activeStep === 1 ? (

            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
         
        ) : (
<div>
              <form>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="company-title">Name</InputLabel>
                  <Input id="company-title" name="name" value={this.state.name || initialValues.name || ''} onChange={this.handleChange} />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="company-link"> Link</InputLabel>
                  <Input id="company-link" name="link" value={this.state.link || ''} onChange={this.handleChange} />
                </FormControl>
                </form>
               
               
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="raised" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}


        </div>

      </div>
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);