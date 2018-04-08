import React from "react";
import moment from "moment";
import axios from "axios";

import wallet from "./../models/wallet";

export default class Balance extends React.Component {
  componentDidMount() {}

  onSendClick = () => {
    if (this.props.onSend) {
      this.props.onSend();
    }
  };

  // transactions() {
  //   const history = golos.history.slice().reverse();

  //   return history.map(([key, trans], idx) => {
  //     return (
  //       <tr key={idx}>
  //         <td>{moment(trans.timestamp).format()}</td>
  //         <td>
  //           <div>{trans.op[0]}</div>
  //           <div>
  //             {trans.op[1].from} -> {trans.op[1].to}
  //           </div>
  //         </td>
  //         <td>{trans.op[1].amount}</td>
  //         <td>{trans.op[1].memo}</td>
  //       </tr>
  //     );
  //   });
  // }

  render() {
    return (
      <div className="balance">
        <header className="balance__header" />
        <main className="balance__content">
          <div className="balance__logo">
            <span>B</span>
          </div>
          <div className="balance__data">
            <div className="balance__address">
              1DMCGx8KScwVeeDbLiAR8WdJfA6gChKkY7
            </div>
            <div className="balance__value">
              <span className="value">0.0333303032</span>
              <span className="sign">BTC</span>
            </div>
          </div>
        </main>
        <div className="balance__actions">
          <div className="btn" onClick={this.onSendClick}>
            send
          </div>
        </div>
      </div>
    );
  }
}
