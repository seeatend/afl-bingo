import React from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

// Images
import MatchesImg from '../../../assets/images/matches.png'
import WelcomeImg from '../../../assets/images/welcom_bingo.png'

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    }
  }

  render() {
    return (
      <div className="page-content matches">
        <img className="page-img" src={MatchesImg} alt="" />
        <button onClick={() => this.setState({ isOpenModal: true })}>Play Bingo</button>

        <Modal
          key="welcome-bingo"
          className="welcome-bingo-modal"
          isOpen={this.state.isOpenModal}
          onRequestClose={() => this.setState({ isOpenModal: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="welcome-bingo-content">
            <img className="welcome-img" src={WelcomeImg} alt="" />
            <button className="close" onClick={() => this.setState({ isOpenModal: false })}>close</button>
            <Link to="/ready">
              <button className="game-on">GAME ON</button>
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Matches;
