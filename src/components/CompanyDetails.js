import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCompany} from '../actions/fetchCompany'
import { updateCompany } from '../actions/updateCompany'
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CompanyForm from './CompanyForm'
import * as combine from "lodash/fp/compose"
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: '3%',
  },
  media: {
    height: 0,
    paddingTop: '36.25%', // 16:9
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
    const { Company,classes } = this.props
    if (!Company) return null

    let image = null;
    if (Company.image) {
      image = <img alt="Companyimage" />
    }


  return (
    <div>      {/* In edit mode display: */}
      <Link to="/Companys">Back </Link>
      {
        this.state.edit &&
        <CompanyForm initialValues={Company} onSubmit={this.updateCompany} />
      }
      {
        !this.state.edit && Company &&
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image = {
              Company.imageurl
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
                {Company.title}
            </Typography>
            <Typography component="p">
            <p>A book by: <b>{Company.author}</b></p>
                <p>{Company.description}</p>
                <p>Now for just {Company.price}€ </p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Buy this Company!
            </Button>
          </CardActions>
        </Card>
      }
  
      <Button onClick={this.toggleEdit}> Edit </Button>
      
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
    Company: state.Company
  }
}

export default combine(
  withStyles(styles),
  connect(mapStateToProps, { fetchCompany, updateCompany })
)(CompanyDetails)








// class CompanyDetails extends PureComponent {
//   static propTypes = {
//     Company: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       description: PropTypes.string.isRequired
//     })).isRequired
//   }




// const mapStateToProps = function (state, props) {
//   return {
//    Company: state.Company
//   }
// }


// export default connect(mapStateToProps, { fetchCompany, updateCompany })(CompanyDetails)
