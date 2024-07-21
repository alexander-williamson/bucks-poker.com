import Head from "next/head"
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Rules() {
  return (
    <div className="flex flex-col min-h-screen">
      {<Head>
        <title>Rules</title>
        <meta name="description" content="Bucks Poker Rules" />
        <link rel="icon" href="/favicon.ico" />
      </Head>}

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">Rules</h1>
        </div>

        <Breadcrumbs>Rules</Breadcrumbs>

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
                    Maximum number of rounds played is 5, or any round up
                    to 5 if the following round were to start after midnight
                  </li>
                  <li>
                    Poker is scheduled every last Friday of the month
                    <ol>
                      <li>
                        If someone cannot make it, they can – if given
                        enough warning – request to have the session brought
                        forward or pushed back. Needing a majority vote from
                        all members. Else forfeit their place for that
                        session.
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
                  <li>To be able to play the player must pay £10</li>
                  <li>
                    Food is either paid separately in the example of kebab,
                    or divided (e.g. Fish and Chips)
                    <ol>
                      <li>
                        £2 is also paid to Jon when dessert has been
                        brought to the session
                      </li>
                      <li>
                        Additional £2 can be paid for additional portions
                        (if there is any spare)
                      </li>
                      <li> Dinner is eaten before Poker starts, Dessert round
                        10pm (roughly between rounds 3 &amp; 4)
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
                    <table class="table-auto">
                      <thead>
                        <tr>
                          <th>Qty </th>
                          <th>Colour </th>
                          <th>Printed Value </th>
                          <th>Game Value </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>10 </td>
                          <td>Red </td>
                          <td>$50 </td>
                          <td>50 </td>
                        </tr>
                        <tr>
                          <td>10 </td>
                          <td>Black </td>
                          <td>$100 </td>
                          <td>100 </td>
                        </tr>
                        <tr>
                          <td>5 </td>
                          <td>Grey </td>
                          <td>$1 </td>
                          <td>200 </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>
                    Seats are randomly assigned to players every round
                    <ol>
                      <li>
                        May be worked out before using any method (e.g.
                        dice, phone app)
                      </li>
                      <li>Seat One is up to the Host.</li>
                    </ol>
                  </li>
                  <li>
                    Dealer is decided by dealing out the top X cards (where
                    X is the number of players) and the person with the
                    highest card is the dealer.
                    <ol>
                      <li>
                        On a tie, just deal out a card for those in the tie
                        and take the highest
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Game Play
                <ol>
                  <li>
                    Play is done to a timer, when the alarm sounds the
                    blinds increase for the next round.
                    <ol>
                      <li>Games starts with a 7 minute timer </li>
                      <li>
                        <p>Blinds go up in the following scale (Small Blind / Big Blind)</p>

                        <table class="table-auto">
                          <thead>
                            <tr>
                              <th>Rd No. </th>
                              <th>Chips </th>
                              <th>Minutes </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1 </td>
                              <td>50 / 100 </td>
                              <td>7 mins </td>
                            </tr>
                            <tr>
                              <td>2 </td>
                              <td>100 / 200 </td>
                              <td>7 mins </td>
                            </tr>
                            <tr>
                              <td>3 </td>
                              <td>200 / 400 </td>
                              <td>7 mins </td>
                            </tr>
                            <tr>
                              <td>4 </td>
                              <td>400 / 800 </td>
                              <td>7 mins </td>
                            </tr>
                            <tr>
                              <td>5 </td>
                              <td>800 / 1,600 </td>
                              <td>15 mins </td>
                            </tr>
                            <tr>
                              <td>6 </td>
                              <td>1,600 / 3,200 </td>
                              <td>15 mins </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    </ol>
                  </li>
                  <li>
                    For the round to qualify, both the small blind and the
                    big blind must be on the table before the clock reaches 0,
                    else the new blinds are used.
                  </li>
                  <li>
                    Players can only play if they can afford the initial
                    big blind. If unable to afford the initial big blind
                    (either through blinds going up or miscalculation of their
                    own chips) their chips are considered <i>Dead </i> and
                    they are considered <i>Out</i> (see point 1.5)
                  </li>
                  <li>
                    The following betting follows the following &qout;house
                    rule&qout; on the <span classname="italic">Half-Bet</span>
                    rule
                    <ol>
                      <li>
                        Players can check, call, raise or fold
                        <ol>
                          <li>
                            Checking = No bet is placed (can only be done
                            if no bet is currently on the table)
                          </li>
                          <li>Calling = Player matching the current bet</li>
                          <li>
                            Rasing = The player must at least match the big
                            blind
                          </li>
                          <li>
                            Fold = They put their hand in towards the
                            middle of the table and away from their play area
                          </li>
                          <li>
                            If the player goes All In and the bet is <i>less


                            </i>than the big blind then the following person
                            can either Call, Raise or Fold with the following
                            the rules below
                            <ol>
                              <li> Call = The player matches the <i>All In</i>
                                bet – even if they could afford the big blind
                              </li>
                              <li> Raise = The player must raise at least to
                                the big blind. Unless they themselves are
                                going <i>All In</i>. </li>
                              <li> Player who went All In are considered to
                                have <i> Called </i>in all further rounds of
                                betting even though they bet £0, side pots are
                                used to hold chips in theory they&apos;re playing
                                for. </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                End of Round
                <ol>
                  <li>
                    Once the round is finished the Winning Hand is recorded
                    (this being the best hand on the table, even if they were
                    <i>All In</i> and are in a sidepot)
                  </li>
                </ol>
              </li>
              <li>
                End Of Game
                <ol>
                  <li>
                    As per Point 4, the Winning Hand is recorded
                  </li>
                  <li>Also at the end of the round (see points 1.5 and 3.3)
                    the value of chips are calculated to work out 1st - 4th
                    placing (1st - 3rd if only playing down to 3 players) both
                    chips won and dead are used to confirm chip calculations
                    <ol>
                      <li>1st Place = 3 points</li>
                      <li>2nd Place = 2 points</li>
                      <li>3rd Place = 1</li>
                      <li>4th Place (for 8 players or more) = 0 points
                        <ol>
                          <li>Chip values are recorded to resolve ties</li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li> Standard Competition (Ranking) Method is used 1224 - In
                    case of a tie, players share the points.

                    Example

                    <table width="200" cellspacing="1" cellpadding="1" border="0" height="70">
                      <thead>
                        <tr>
                          <th>Player </th>
                          <th>Chips </th>
                          <th>Points </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 </td>
                          <td>1,000 </td>
                          <td>3 </td>
                        </tr>
                        <tr>
                          <td>2 </td>
                          <td>500 </td>
                          <td>2 </td>
                        </tr>
                        <tr>
                          <td>3 </td>
                          <td>500 </td>
                          <td>2 </td>
                        </tr>
                        <tr>
                          <td>4 </td>
                          <td>250 </td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li>A bonus point is awarded to the player who has the best
                    <i>Winning Hand</i> (if tied then it goes to the next hand
                    and so on until it is just a single player)
                  </li>
                </ol>
              </li>
              <li>
                End Of The Night
                <ol>
                  <li> At the end of the night, the winnings are as follows
                    <ol>
                      <li>3rd Place = £10</li>
                      <li>2nd Place = £20</li>
                      <li>1st Place = All remaining
                        <ol>
                          <li>
                            The Exception where multiple people tie for
                            points and chips then money is split accordingly.
                            Example (assuming the winning pot is £90)
                            <table class="table-auto">
                              <thead>
                                <tr>
                                  <th>Player </th>
                                  <th>Ranking </th>
                                  <th>Points </th>
                                  <th>Chips </th>
                                  <th>Money </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1 </td>
                                  <td>1 </td>
                                  <td>5 </td>
                                  <td>100 </td>
                                  <td>£40 </td>
                                </tr>
                                <tr>
                                  <td>2 </td>
                                  <td>1 </td>
                                  <td>5 </td>
                                  <td>100 </td>
                                  <td>£40 </td>
                                </tr>
                                <tr>
                                  <td>3 </td>
                                  <td>3 </td>
                                  <td>3 </td>
                                  <td>50 </td>
                                  <td>£10 </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    It is the winner&#39;s responsibility to organise the trophy
                    for the next year
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
