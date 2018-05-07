import React, {PureComponent} from 'react'
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
	},
	formControlPicker: {
		margin: theme.spacing.unit,
		width: "100px",
	},
	button: {
		color: "#711F9B",
		backgroundColor: "white",
	},
});

class CompanyForm extends React.Component {
	state = {
		language:"NL",
		score: "",
		};

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
		const initialValues = this.props.initialValues || ''

		return (
			<div className={classes.container}>
				<form onSubmit={this.handleSubmit}>
				<div>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-title">Name</InputLabel>
						<Input id="company-title" name="name" value={this.state.name || initialValues.name || ''} onChange={this.handleChange} />
					</FormControl>

						<FormControl className={classes.formControlPicker}>
							<InputLabel htmlFor="language">Language</InputLabel>
						<Select
							value={this.state.language}
							onChange={this.handleChange}
							inputProps={{
								name: 'language',
								id: 'language',
							}}
						>
							<MenuItem value={"NL"}>NL</MenuItem>
							<MenuItem value={"INT"}>INT</MenuItem>
						</Select>
						</FormControl>

						<FormControl className={classes.formControlPicker}>
							<InputLabel htmlFor="score">Score</InputLabel>
							<Select
							className={classes.formControl}
							value={this.state.score}
							onChange={this.handleChange}
							inputProps={{
								name: 'score',
								id: 'score',
							}}
						>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
							<MenuItem value={4}>4</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={6}>6</MenuItem>
							<MenuItem value={7}>7</MenuItem>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={9}>9</MenuItem>
							<MenuItem value={10}>10</MenuItem>
						</Select>
						</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-applied">Open Positions? y/n</InputLabel>
						<Input id="company-applied" name="applied" value={this.state.applied || initialValues.applied || ''} onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-market">Market</InputLabel>
						<Input id="company-market" name="market" value={this.state.market || initialValues.market ||  ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-focus">Focus</InputLabel>
						<Input id="company-focus" name="focus" value={this.state.focus || initialValues.focus || ''} onChange={this.handleChange} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="company-link"> Link</InputLabel>
						<Input id="company-link" name="link" value={this.state.link || ''} onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<Button variant="raised" size="medium" type="submit" className={classes.button}>
						Save
					</Button>
				</div>
				</form>
			</div>
		);
	}
}


export default withStyles(styles)(CompanyForm);



