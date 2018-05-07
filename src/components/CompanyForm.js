import React, {PureComponent} from 'react'
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
	},
});

class CompanyForm extends React.Component {
	state = {	};

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
		const { name, value } = event.target

		this.setState(
			(name === "score")
				? { score: Number(value) }
				: { [name]: value }
		)
	}

	render() {
		const { classes } = this.props
		const initialValues = this.props.initialValues || {}

		return (
			<div className={classes.container}>
				<form onSubmit={this.handleSubmit}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-title">Name:</InputLabel>
						<Input id="company-title" name="name" value={this.state.name || initialValues.name || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-market">Market</InputLabel>
						<Input id="company-market" name="market" value={this.state.market || initialValues.market || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-focus">Focus</InputLabel>
						<Input id="company-focus" name="focus" value={this.state.focus || initialValues.focus || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-score">Score</InputLabel>
						<Input id="company-score" name="score" value={this.state.score || initialValues.score || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-score">Applied? y/n</InputLabel>
						<Input id="company-applied" name="applied" value={this.state.applied || initialValues.applied || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-openpos">Open Positions? y/n</InputLabel>
						<Input id="company-openpos" name="openpos" value={this.state.openpos || initialValues.openpos || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-link">Link</InputLabel>
						<Input id="company-link" name="link" value={this.state.link || initialValues.link || ''} onChange={this.handleChange} />
					</FormControl>
					<button type="submit">Save</button>
				</form>
			</div>
		);
	}
}


export default withStyles(styles)(CompanyForm);



