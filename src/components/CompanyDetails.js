import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCompany, updateCompany} from '../actions/company'
import { Link } from 'react-router-dom'
import CompanyForm from './CompanyForm'
import * as combine from "lodash/fp/compose"
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Domain from '@material-ui/icons/Domain'

const styles = {
  card: {
    maxWidth: 345,
    margin: '3%',
    marginLeft: "35%",
    marginRight: "35%"
  },
  media: {
    height: 0,
    paddingTop: '36.25%', // 16:9
  },
  button: {
    color: "#711F9B",
    fontSize: 14,
    textAlign: "center",
  },
  headline: {
    textAlign: "center",
  },
  icon: {
    paddingTop: "5%",
    marginLeft: "35%",
    marginRight: "35%",
    height: "100px",
    width: "30%",
  },
  content: {
    textAlign: "center",
  }
};

// function CompanyDetails(props) {
  class CompanyDetails extends React.Component {

    static propTypes = {
      company: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        market: PropTypes.string,
        focus: PropTypes.string,
        score: PropTypes.number.isRequired,
        language: PropTypes.oneOf(['INT', 'NL']),
        applied: PropTypes.oneOf(['y', 'n']),
        link: PropTypes.string.isRequired,
        comments: PropTypes.string,
      }).isRequired,

      fetchCompany: PropTypes.func.isRequired,
      updateCompany: PropTypes.func.isRequired,

    }

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  updateCompany = (company) => {
    this.props.updateCompany(this.props.match.params.id, company)
    this.toggleEdit()
  }

  componentWillMount(props) {
    this.props.fetchCompany(this.props.match.params.id)
  }


  render() {
    const { company, classes } = this.props
    if (!company) return null

  return (
    <div>      {/* In edit mode display: */}
      {
        this.state.edit &&
        <CompanyForm initialValues={company} onSubmit={this.updateCompany} />
      }
      {
        !this.state.edit && company &&
        <Card className={classes.card}>
          <CardMedia>
            {/* <Domain className={classes.icon}/> */}
            <img className={classes.icon} src='/company.png' alt="CompanyLogo" />
            </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
                {company.name}
            </Typography>
            <Typography component="p" className={classes.content}>
             <b>{company.market}</b>
              <p>Focusses on: {company.focus}</p>
              <p>Comments<i> {company.comments} </i></p>
              <a href={company.link}>Website</a>
              <h3> {company.score} /10 </h3>
            </Typography>
          </CardContent>
          <div className={classes.button}>
            <Button className={classes.button} onClick={this.toggleEdit}> Edit </Button>
            <Button className={classes.button} onClick={this.toggleEdit}> <Link to="/Companys">Back </Link> </Button>
          </div>
        </Card>
      }
    </div>
  );
}

}


const mapStateToProps = function (state, props) {
  return {
    company: state.company
  }
}

export default combine(
  withStyles(styles),
  connect(mapStateToProps, { fetchCompany, updateCompany })
)(CompanyDetails)
