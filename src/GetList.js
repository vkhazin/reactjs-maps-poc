import React from 'react';
import axios from 'axios';

export default class GetList extends React.Component {
  constructor() {
    super();
    this.state = {
    point: [],
    from:'1239065720835',
    to:'1870217733565',
    toplat:'44.56657',
    toplon:'-81.916815',
    bottomlat:'42.697970000000005',
    bottomlon:'-77.137755',
    precision: '5',
    timeoutMs:'30000'

    }
}
  

  handleChangeFrom =    event => { this.setState({ from: event.target.value})}
  handleChangeTo =      event => { this.setState({ to: event.target.value }) }
  handleChangeToplat =  event => { this.setState({ toplat: event.target.value})}
  handleChangeToplon =  event => { this.setState({ toplon: event.target.value})}
  handleChangeBlat =    event => { this.setState({ bottomlat: event.target.value})}
  handleChangeBlon =    event => { this.setState({bottomlon: event.target.value })}
  handleChangePrecision = event => { this.setState({ precision: event.target.value})}
  handleChangeTimeout = event => { this.setState({ timeoutMs: event.target.value})}

  handleSubmit = event => {
    event.preventDefault();

    axios.post(`https://gsqztydwpe.execute-api.us-east-1.amazonaws.com/latest/geoHash`, 
    {
      "timestampMs": {
        "from": this.state.from,
        "to": this.state.to
      },
      "boundary": {
        "topLeft": {
          "lat": this.state.toplat,
          "lon": this.state.toplon
        },
        "bottomRight": {
          "lat": this.state.bottomlat,
          "lon": this.state.bottomlon          
        }
      },
      "precision": this.state.precision,
      "timeoutMs": this.state.timeoutMs
    })
    //then(res => res.json())
  //   .then(data => {
  //     this.setState({ markers: data.photos });
  //    })
      .then(res => {
        console.log(res.data);
        this.setState({point:res.data})
        
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>timestampMs</p>
            From:
            <input type="text" name="from" onChange={this.handleChangeFrom} value={this.state.from}/>
            To:
            <input type="text" name="to" onChange={this.handleChangeTo} value={this.state.to}/>
            <p>boundary topLeft</p>
            Lat:
            <input type="text" name="toplat" onChange={this.handleChangeToplat} value={this.state.toplat}/>
            Lon:
            <input type="text" name="toplon" onChange={this.handleChangeToplon} value={this.state.toplon}/>

            <p>boundary bottomRight</p>
            Lat:
            <input type="text" name="bottomlat" onChange={this.handleChangeBlat} value={this.state.bottomlat} />
            Lon:
            <input type="text" name="bottomlon" onChange={this.handleChangeBlon} value={this.state.bottomlon}/>
            <div>
              precision:
              <input type="text" name="precision" onChange={this.handleChangePrecision} value={this.state.precision}/>
              timeoutMs:
              <input type="text" name="timeoutMs" onChange={this.handleChangeTimeout} value={this.state.timeoutMs}/>
            </div>
          </label>
          <button type="submit">Send</button>
          <p>{this.state.point.length}</p>
          <p>{typeof(this.state.point)}</p>
          <p>{this.state.point.geoPoint}</p> 
          {/* <p>{this.state.point[0].geoPoint}</p> */}
        </form>
      </div>
    )
  }
}