import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCompany, updateCompany} from '../actions/company'
import { Link } from 'react-router-dom'
import CompanyForm from './CompanyForm'
import * as combine from "lodash/fp/compose"
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Domain from '@material-ui/icons/Domain'

const styles = {
  card: {
    maxWidth: 345,
    margin: '3%',
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
    color: "#B16F9B",
    paddingTop: "5%",
    marginLeft: "35%",
    marginRight: "35%",
    height: "100px",
    width: "30%",
  },
};

// function CompanyDetails(props) {
  class CompanyDetails extends React.Component {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  updateCompany = (Company) => {
    this.props.updateCompany(this.props.match.params.id, Company)
    this.toggleEdit()
  }

  componentWillMount(props) {
    this.props.fetchCompany(this.props.match.params.id)
  }


  render() {
    const { company,classes } = this.props
    if (!company) return null

  return (
    <div>      {/* In edit mode display: */}
      <Link to="/Companys">Back </Link>
      {
        this.state.edit &&
        <CompanyForm initialValues={company} onSubmit={this.updateCompany} />
      }
      {
        !this.state.edit && company &&
        <Card className={classes.card}>
          <CardMedia>
            <Domain className={classes.icon}/>
            </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
                {company.name}
            </Typography>
            <Typography component="p">
            <p>Deals with: <b>{company.market}</b></p>
                <p>Focusses on: {company.focus}</p>
                <p>Interesting? {company.score} /10 </p>
                <p><i> {company.comments} </i></p>
              <a href={company.link}>Website</a>
            </Typography>
          </CardContent>
            <div className={classes.button}>
              <Button className={classes.button} onClick={this.toggleEdit}> Edit </Button>
          </div>
        </Card>
      }
    </div>
  );
}

//    propTypes = {
//   Company: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     description: PropTypes.string.isRequired
//   })).isRequired
// }

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
