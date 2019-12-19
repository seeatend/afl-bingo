import React from 'react'
import { Link } from 'react-router-dom'

// Images
import ReadyLoading from '../../../assets/images/ready_loading.png'
import ReadyDone from '../../../assets/images/ready_done.png'

class Ready extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2000)
  }

  render() {
    return (
      <div className="page-content ready">
        {
          this.state.loading ?
            <img className="page-img" src={ReadyLoading} alt="" />
            :
            <>
              <img className="page-img" src={ReadyDone} alt="" />
              <Link to="/cards">
                <button className="enter-bingo">ENTER BINGO</button>
              </Link>
            </>
        }
      </div>
    );
  }
}

export default Ready;
