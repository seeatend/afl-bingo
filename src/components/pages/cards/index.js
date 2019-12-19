import React from 'react'
import Modal from 'react-modal'
import ReactPlayer from 'react-player'
import { clone } from 'lodash'

import MatchGame from '../../../assets/images/match.mp4'
// Images
import BingoCardsGradient from '../../../assets/images/bingo_card_gradient.png'
import BingoCards from '../../../assets/images/bingo_card.png'
import Header from '../../../assets/images/cards_header.png'
import InfoTabContent from '../../../assets/images/info_tab.png'
import PrizesTabContent from '../../../assets/images/prizes_tab.png'
import RulesTabContent from '../../../assets/images/rules_tab.png'
import PlayerImg from '../../../assets/images/player1-bg.png'
import BingoBall from '../../../assets/images/bingo-ball-cell.svg'
import FinalModal from '../../../assets/images/final_modal.jpg'

const eventSorts = ['marks', 'inside 50', 'handballs', 'kicks']

const cardInfos = [
  { 
    value: 1,
    team: 1,
    event: 1,
  },
  { 
    value: 11,
    team: 1,
    event: 2,
  },
  { 
    value: 23,
    team: 2,
    event: 1,
  },
  { 
    value: 3,
    team: 1,
    event: 1,
  },
  { 
    value: 16,
    team: 2,
    event: 2,
  },
  { 
    value: 17,
    team: 1,
    event: 3,
  },
  { 
    value: 35,
    team: 2,
    event: 3,
  },
  { 
    value: 3,
    team: 1,
    event: 2,
  },
  { 
    value: 4,
    team: 1,
    event: 4,
  },
  { 
    value: 9,
    team: 1,
    event: 1,
  },
  { 
    value: 19,
    team: 1,
    event: 2,
  },
  { 
    value: 12,
    team: 1,
    event: 4,
  },
  { 
    value: 19,
    team: 1,
    event: 4,
  },
  { 
    value: 17,
    team: 1,
    event: 2,
  },
  { 
    value: 23,
    team: 2,
    event: 1,
  },
  { 
    value: 14,
    team: 1,
    event: 3,
  },
  { 
    value: 15,
    team: 1,
    event: 4,
  },
  { 
    value: 23,
    team: 2,
    event: 3,
  },
  { 
    value: 2,
    team: 1,
    event: 1,
  },
  { 
    value: 4,
    team: 1,
    event: 3,
  },
  { 
    value: 4,
    team: 1,
    event: 3,
  },
  { 
    value: 15,
    team: 2,
    event: 1,
  },
  { 
    value: 12,
    team: 2,
    event: 1,
  },
  { 
    value: 15,
    team: 1,
    event: 3,
  },
  { 
    value: 22,
    team: 1,
    event: 4,
  },
]

const events = [
  {
    time: 15,
    name: 'D.Martin',
    eventAction: 3,
    cardId: 20,
    letter: 'B'
  }, 
  {
    time: 20,
    name: 'B.Daniels',
    eventAction: 2,
    cardId: 4,
    letter: 'O'
  }, 
  {
    time: 32,
    name: 'J.Short',
    eventAction: 4,
    cardId: 16,
    letter: 'I'
  }, 
  {
    time: 51,
    name: 'T.Lynch',
    eventAction: 4,
    cardId: 12,
    letter: 'N'
  }, 
  {
    // time: 116,
    time: 60,
    name: 'D.Martin',
    eventAction: 4,
    cardId: 8,
    letter: 'G'
  },
]

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 1,
      tab: 'info',
      slideOpen: false,
      swapModalOpen: false,
      finalModalOpen: false,
      player: 1,
      cards: [...cardInfos],
      occuredEvents: [],
      bingoStatus: 'loading'
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ status: 2 }), 2000)
    setTimeout(() => this.setState({ status: 3 }), 4000)
  }

  componentWillUnmount() {
    clearInterval(this.clr)
  }

  bingoStart = () => {
    const that = this
    this.clr = setInterval(function () {
      if (that.player) {
        that.elapsedTime = Math.round(that.player.getCurrentTime())
        console.log(that.elapsedTime)
        events.forEach(e => {
          if (that.elapsedTime === e.time) {
            console.log('----')
            let occuredEvents = clone(that.state.occuredEvents)
            occuredEvents.push(e)
            console.log(occuredEvents)
            that.setState({ occuredEvents })
          }
        })
      }
    }, 1000) 
  }

  tapTile = (index) => {
    let cards = clone(this.state.cards)
    let occuredEvents = clone(this.state.occuredEvents)
    let card = cards[index]
    let event = occuredEvents.filter(e => e.cardId === index)
    if (!card.tapped && event.length !== 0) {
      cards[index].tapped = true
      occuredEvents.forEach(e => { if(e.cardId === index) e.checked = true })
      this.setState({ cards, occuredEvents })
      if (occuredEvents.length === 5 && occuredEvents.every((e) => e.checked)) {
        setTimeout(() => this.setState({ bingoStatus: 'done' }), 1000)
        setTimeout(() => this.setState({ finalModalOpen: true }), 2000)
      }
    } else if (index === 12 && !card.tapped) {
      this.setState({ swapModalOpen: true })
    }
  }

  render() {
    const { 
      status,
      tab,
      slideOpen,
      bingoStatus,
      occuredEvents,
      swapModalOpen,
      finalModalOpen,
      player,
      cards
    } = this.state

    const lastOccuredEvent = occuredEvents.length !== 0 ? occuredEvents[occuredEvents.length-1] : null

    return (
      <div className="page-content cards">
        { status === 1 && <img className="page-img" src={BingoCardsGradient} alt="" /> }
        { status === 2 && <img className="page-img" src={BingoCards} alt="" /> }
        { status === 3 && (
          <>
            <img className="page-img" src={Header} alt="" />
            <div className="cards-content">
              {
                cards.map((c, i) => {
                  let event = occuredEvents.filter(e => e.cardId === i)
                  return (
                    <>
                      {
                        (bingoStatus === 'done' && event.length !== 0 && event[0].cardId === i) ?
                          <div className="card-content" key={i}>
                            <div className="card done" >
                              {event[0].letter}
                            </div>
                          </div>
                          :
                          <div key={i} className={`card-content ${lastOccuredEvent !== null && lastOccuredEvent.cardId === i && !c.tapped ? 'active': ''}`}>
                            <div 
                              className={`card team${c.team} ${c.tapped ? 'tapped' : ''}`}
                              onClick={bingoStatus !== 'done' ? () => this.tapTile(i) : null}
                            >
                              {c.value}
                              <span>1+</span>
                              <span className="action">{eventSorts[c.event - 1]}</span>
                            </div>
                          </div>
                      }
                    </>
                  )
                })
              }
            </div>
            <div className={`bingo-status ${lastOccuredEvent !== null ? 'active' : ''}`}>
              { occuredEvents.length !== 5 && lastOccuredEvent === null && 'Tap a tile to see more information' }
              { occuredEvents.length !== 5 && lastOccuredEvent !== null  && !lastOccuredEvent.checked && 'Called Out! Claim the tile!' }
              { occuredEvents.length !== 5 && lastOccuredEvent !== null  && lastOccuredEvent.checked && 'Very well. Keep on!' }
              { occuredEvents.length === 5 && lastOccuredEvent !== null  && !lastOccuredEvent.checked && 'Called Out! Hit it!' }
              { bingoStatus !== 'done' && occuredEvents.length === 5 && occuredEvents.every((e) => e.checked) && 'Great job!' }
              { bingoStatus === 'done' && 'Bingo!!!' }
            </div>
            <div className="tabs">
              <div className={`tab ${tab === 'info' ? 'active' : ''}`} onClick={() => this.setState({ tab: 'info' })}>MATCH INFO</div>
              <div className={`tab ${tab === 'prizes' ? 'active' : ''}`} onClick={() => this.setState({ tab: 'prizes' })}>PRIZES</div>
              <div className={`tab ${tab === 'rules' ? 'active' : ''}`} onClick={() => this.setState({ tab: 'rules' })}>BINGO RULES</div>
            </div>
            <div className="tab-content">
              { tab === 'info' && <img className="page-img" src={InfoTabContent} alt="" /> }
              { tab === 'prizes' && <img className="page-img" src={PrizesTabContent} alt="" /> }
              { tab === 'rules' && <img className="page-img" src={RulesTabContent} alt="" /> }
            </div>
            <div className="sliding-pane">
              <div className={`pane-content ${slideOpen ? 'opened' : 'closed'}`}>
                <img className="page-img header" src={Header} alt="" />
                <div className="live-video">
                  <ReactPlayer
                    ref={(c) => { this.player = c }}
                    url={MatchGame}
                    playing={bingoStatus !== 'done'}
                    controls={slideOpen}
                    width="100%"
                    height="auto"
                    onStart={() => {
                      this.setState({ bingoStatus: 'started' })
                      this.bingoStart()
                    }}
                  />
                </div>
                <div className="match-status" onClick={() => this.setState({ slideOpen: true })}>
                  <div style={{color: '#0F2253', fontFamily: 'Titillium-SemiBold'}}>LIVE MATCH FEED</div>
                  <div className="status">
                    {
                      bingoStatus === 'started' 
                        ? lastOccuredEvent !== null
                            ? `${lastOccuredEvent.name} - ${eventSorts[lastOccuredEvent.eventAction-1]}!`
                            : 'Match started'
                        : 'Waiting for a start'
                    }
                  </div>
                  <div style={{color: '#aaa', fontSize: '13px', marginLeft: '15px'}}>{this.elapsedTime} seconds ago</div>
                </div>
                <div className="match-quarter">
                  <div className="match-feed bold" onClick={() => this.setState({ slideOpen: false })}>LIVE MATCH FEED</div>
                  <div className="current-quarter bold">Current quarter</div>
                  <div className="events">
                    {
                      clone(occuredEvents).reverse().map((e, i) => (
                        <div className="event" key={i}>
                          <img className="bingo-ball" src={BingoBall} alt="" />
                          <div>
                            <div className="info">{e.name} - {eventSorts[e.eventAction-1]}!</div>
                            <div style={{color: '#aaa', fontSize: '13px', marginLeft: '15px'}}>{this.elapsedTime - e.time} seconds ago</div>
                          </div>
                        </div>
                      ))
                    }
                    {
                      bingoStatus === 'started' && (
                        <div className="event">
                          <img className="bingo-ball" src={BingoBall} alt="" />
                          <div>
                            <div className="info">Match Started</div>
                            <div style={{color: '#aaa', fontSize: '13px', marginLeft: '15px'}}>{this.elapsedTime || 0} seconds ago</div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <Modal
          key="swap-tile"
          className="swap-modal"
          isOpen={swapModalOpen}
          onRequestClose={() => this.setState({ swapModalOpen: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="swap-modal-content">
            <div className="title">Swap or Keep</div>
            <div className="tiles">
              <div className={`tile ${player === 1 ? 'active' : ''}`} onClick={() => this.setState({player:1})}>
                <span className="bold">KEEP</span>
                <img src={PlayerImg} alt="" />
                <span className="bold">1+</span>
                <span className="bold">KICKS</span>
              </div>
              <div className={`tile ${player === 2 ? 'active' : ''}`} onClick={() => this.setState({player:2})}>
                <span className="bold">SWAP TO</span>
                <img src={PlayerImg} alt="" />
                <span className="bold">1+</span>
                <span className="bold">HANDBALLS</span>
              </div>
              <div className={`tile ${player === 3 ? 'active' : ''}`} onClick={() => this.setState({player:3})}>
                <span className="bold">SWAP TO</span>
                <img src={PlayerImg} alt="" />
                <span className="bold">1+</span>
                <span className="bold">MARKS</span>
              </div>
            </div>
            <span className="desc">
              You know your team better, take the best match for this tile, simply swap it with another!<br/>
              Just for $<span className="bold" style={{color: 'white'}}>0.99</span>
            </span>
            <div className="btns">
              <button className="keepBtn" onClick={() => this.setState({ swapModalOpen: false })}>KEEP</button>
              <button className="swapBtn" onClick={() => this.setState({ swapModalOpen: false })}>$0.99 SWAP</button>
            </div>
          </div>
        </Modal>

        <Modal
          key="final-tile"
          className="final-modal"
          isOpen={finalModalOpen}
          onRequestClose={() => this.setState({ finalModalOpen: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="final-modal-content">
            <img className="page-img" src={FinalModal} alt="" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Cards;
