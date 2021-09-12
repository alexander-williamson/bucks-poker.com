import Head from "next/head";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Rules() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>Rules</title>
        <meta name="description" content="Bucks Poker Rules" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">Rules</h1>
        </div>

        <Breadcrumbs current="Rules" />

        <div className="rules py-10">
          <h2 className="text-4xl mb-10">The House Rules v3</h2>
          <div>
            <ol>
              <li>
                Session Information
                <ol>
                  <li>
                    The Maximum number of players is 10
                    <ol>
                      <li>Though this can be adjusted via a group vote</li>
                    </ol>
                  </li>
                  <li>
                    The Minimum number of players is 6
                    <ol>
                      <li>
                        If regular members are unable to make a session and
                        given enough warning, then members are able to bring
                        another person to the table (but only after getting
                        agreement from the host)
                      </li>
                    </ol>
                  </li>
                  <li>
                    Maximum number of rounds played is 5, or any round up to 5
                    if the following round were to start after midnight
                  </li>
                  <li>
                    Poker is scheduled every last Friday of the month
                    <ol>
                      <li>
                        If someone cannot make it, they can – if given enough
                        warning – request to have the session brought forward or
                        pushed back. Needing a majority vote from all members.
                        Else forfeit their place for that session.
                        <ol>
                          <li>Minimum notice needed is one week</li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Round ends depending on the number of players
                    <ol>
                      <li>8 or more = 4 Players remain</li>
                      <li>7 or fewer = 3 Players remain</li>
                    </ol>
                  </li>
                  <li>
                    To be able to play the player must pay £10
                    <ol>
                      <li>
                        Food is also paid for – either paying separately in the
                        example of Fish and Chips, or divided in the example of
                        Pizza
                        <ol>
                          <li>
                            If using the divided amount, everyone pays in to the
                            nearest pound and any change is put to one side
                            until the 12th game of the year (see point 5.2)
                          </li>
                        </ol>
                      </li>
                      <li>
                        Two pound is also paid to Jon when dessert has been
                        brought to the session
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Setup
                <ol>
                  <li>
                    Players are given $ 2,500
                    <ol>
                      <li>10x - Red $5 = $50</li>
                      <li>10x - Black $100 = $100</li>
                      <li>5x - Grey $1 = $200</li>
                    </ol>
                  </li>
                  <li>
                    Seats are randomly assigned to players every round
                    <ol>
                      <li>
                        Maybe worked out before using any method (e.g. dice,
                        phone app)
                      </li>
                      <li>Seat One is up to the Host.</li>
                    </ol>
                  </li>
                  <li>
                    Dealer is decided by dealing out the top X cards (where X is
                    the number of players) and the person with the highest card
                    is the dealer.
                    <ol>
                      <li>
                        On a tie, just deal out a card for those in the tie and
                        take the highest
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Game Play
                <ol>
                  <li>
                    Play is done to a timer, when the alarm sounds the blinds
                    increase for the next round.
                    <ol>
                      <li>Games starts with a 7 minute timer </li>
                      <li>
                        Blinds go up in the following scale (Small Blind / Big
                        Blind)
                        <ol>
                          <li>50/100</li>
                          <li>100/200</li>
                          <li>200/400</li>
                          <li>400/800</li>
                          <li>800/1600</li>
                          <li>
                            1600 / 3200
                            <ol>
                              <li>
                                Dinner is eaten before Poker starts, Dessert is
                                between round 3 and 4 (roughly 10pm)
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    In order for the round to qualify for the blinds currently
                    displayed, both the small blind and the big blind must be on
                    the table before the clock reaches 0, else the new blinds
                    are used.
                  </li>
                  <li>
                    Players can only play in the round where they can afford the
                    initial big blind. If they are unable to afford the first
                    round of bets in the next game (either through blinds going
                    up or miscalculation of their own chips) their chips are
                    considered Dead and they are considered Out (see point 1.5)
                  </li>
                  <li>
                    The following betting follows the following ‘house rule’ on
                    the <span className="italic">Half-Bet</span> rule
                    <ol>
                      <li>Players can fold, call or raise</li>
                      <li>
                        When raising users must initially go in with at least
                        the big blind
                        <ol>
                          <li>
                            If the user goes All In and the bet is less than the
                            big blind then the following person can either fold,
                            call or raise
                            <ol>
                              <li>
                                Fold = They put their hand in towards the middle
                                of the table and away from their play area, the
                                following player then takes up the choice
                              </li>
                              <li>
                                Call = The player matches the bet – even if they
                                could match the big blind
                              </li>
                              <li>
                                Raise = The player must raise at least to the
                                big blind. The player who went all in is
                                considered to have Called in all further rounds
                                of betting even though they bet £0
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Scoring
                <ol>
                  <li>
                    Once the round is finished (see points 1.5 and 3.3) the
                    value of chips is then calculated to work out 1st, 2nd and
                    3rd place (both chips won and those dead – to confirm each
                    players calculations)
                    <ol>
                      <li>1st Place = 3 points</li>
                      <li>2nd Place = 2 points</li>
                      <li>3rd Place = 1</li>
                      <li>
                        4th Place (for 8 players or more) = 0 points
                        <ol>
                          <li>
                            Chip values are recorded for end of night ties
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Standard Competition (Ranking) Method is used 1224 - In case
                    of a tie, players share the points. E.g. P1 (Player 1) has
                    1,000 chips and P2 and P3 both have 500 chips, P 4 has 250
                    chips. Points awarded are P1 = 3, P2 &amp; P3 = 2 and P4 = 0
                  </li>
                </ol>
              </li>
              <li>
                End Of The Night
                <ol>
                  <li>
                    At the end of the night, the winnings are as follows
                    <ol>
                      <li>3rd Place = £10</li>
                      <li>2nd Place = £20</li>
                      <li>
                        1st Place = All remaining
                        <ol>
                          <li>
                            The Exception where multiple people tie for points
                            then money is split accordingly E.g. There is a tie
                            for 1st place with two people, so there is 2x 1st
                            and 1x 3rd, so the money for 1st and 2nd is split
                            between the two players and 3rd place walks away
                            with £10
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    If this is the last game of the year, then the Year winner
                    takes home the change from the food money (see 1.6.1.1)
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}
